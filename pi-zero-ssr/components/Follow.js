/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import "./Follow.css";

/**
 * Component to display a section to follow us on twitter.
 */
const Follow = () => (
  <section class="follow" aria-labelledby="follow-us">
    <h2 id="follow-us">
      Do you want to stay up to date with WebAssembly and our projects?
    </h2>
    <a
      class="follow__button"
      href="https://twitter.com/intent/user?screen_name=vmwwasm"
    >
      Follow us on Twitter
    </a>
  </section>
);

export default Follow;