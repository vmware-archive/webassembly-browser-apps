/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

// Runs the SSR
import render from "preact-render-to-string";
import App from "./App";

const renderer = props => {
  const content = render(<App url={props.url} />);

  console.log(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Wasm Labs | VMware OCTO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="module" crossorigin src="/assets/index.js"></script>
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
        <link rel="stylesheet" href="/assets/index.css">
      </head>
      <body>
        <div id="app">${content}</div>
      </body>
    </html>
    `);

  return `[${props.url}] Render page from Wasm`;
};

Shopify = {
  main: renderer
};