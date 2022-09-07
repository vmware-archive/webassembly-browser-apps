// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: BSD-2-Clause

package main

import (
  "context"
  "fmt"
  "log"
  "os"
  "strings"
  "net/http"

  "github.com/tetratelabs/wazero"
  "github.com/tetratelabs/wazero/imports/wasi_snapshot_preview1"
)

type wasmHandler struct {
  ctx context.Context
  runtime wazero.Runtime
  compiled wazero.CompiledModule
}

func main() {
  argsWithoutProg := os.Args[1:]
  wasmPath := argsWithoutProg[0]
  staticPath := argsWithoutProg[1]

  // Set the context
  ctx := context.Background()

  // Read the wasm file from the path
  wasm, err := os.ReadFile(wasmPath)
  if err != nil {
    log.Panicln(err)
  }

  // Init a new WebAssembly Runtime.
  r := wazero.NewRuntime(ctx)
  defer r.Close(ctx)

  // Instantiate WASI
  if _, err = wasi_snapshot_preview1.Instantiate(ctx, r); err != nil {
    log.Panicln(err)
  }

  // Compile module for run boost!
  compiled, err := r.CompileModule(ctx, wasm, wazero.NewCompileConfig())
  if err != nil {
    log.Panicln(err)
  }

  // Define the handler
  fmt.Println("Listening on 0.0.0.0:8080")

  fs := http.FileServer(http.Dir(staticPath))
  http.Handle("/assets/", fs)
  http.Handle("/", &wasmHandler{ctx: ctx, compiled: compiled, runtime: r })

  if err := http.ListenAndServe(":8080", nil); err != nil {
    log.Panicln(err)
  }
}

func (h *wasmHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
  config := wazero.NewModuleConfig().
  // By default, I/O streams are discarded and there's no file system.
  // NOTE: Send response to Stderr as it's properly interpreted by Go HTTP handlers
  WithStdout(os.Stdout).WithStderr(w)

  input := strings.NewReader(fmt.Sprintf(`{ "url": "%s" }`, r.URL))
  err := runModule(h.ctx, h.runtime, h.compiled, config.WithStdin(input)) // Set stdin
  if err != nil {
    log.Panicln(err)
  }

  // Add an empty line after calling it
  fmt.Println("")
}

// Run the given Wasm Module. It will render the SSR
func runModule(ctx context.Context, r wazero.Runtime, compiled wazero.CompiledModule, config wazero.ModuleConfig) error {
  if mod, err := r.InstantiateModule(ctx, compiled, config); err != nil {
    return err
    } else {
      return mod.Close(ctx)
    }
  }
