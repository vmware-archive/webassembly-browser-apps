/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import Illustration from "./Illustration";

import "./Diagram.css";

const Diagram = () => {
  return (
    <section className="diagram" aria-label="Project diagram">
      <div className="diagram__top">
        <img src="/assets/images/preact.png" alt="PreactJS logo" />
        <img
          className="diagram__top__mdx"
          src="/assets/images/mdx.png"
          alt="MDX logo"
        />
        <img src="/assets/images/vite.png" alt="ViteJS logo" />
      </div>
      <div className="diagram__wasm">WebAssembly + QuickJS (embedded)</div>
      <div className="diagram__handler">Go HTTP handler + Wazero</div>
      <div className="diagram__illustration">
        <Illustration perspective />
      </div>
    </section>
  );
};

export default Diagram;