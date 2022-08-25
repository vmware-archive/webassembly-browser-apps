/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import Illustration from "./Illustration";

import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero" aria-label="The purpose of the experiment">
      <p>
        <span className="hero__top">The Modern Web</span>
        <span className="hero__anywhere">Anywhere</span>
        <span className="hero__wasm">With WebAssembly</span>
      </p>
      <div
        className="hero__illustration"
        aria-label="Raspberry Pi Zero W illustration"
      >
        <Illustration animate />
      </div>
    </section>
  );
};

export default Hero;