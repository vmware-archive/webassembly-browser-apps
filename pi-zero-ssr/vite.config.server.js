/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact(), mdx()],
  esbuild: {
    keepNames: true
  },
  build: {
    target: "es2020",
    outDir: "dist-ssr",
    lib: {
      name: "wasm-ssr",
      entry: "server.js"
    }
  },
  rollupOutputOptions: {
    assetFileNames: `[name].[ext]`
  }
});