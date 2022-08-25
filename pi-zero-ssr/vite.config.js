/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact(), mdx()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});