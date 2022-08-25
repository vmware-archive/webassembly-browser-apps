/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import "./Header.css";

const Header = () => {
  return (
    <div>
      <header className="header">
        <h1 className="header__home">
          <a href="/">Wasm Labs @ VMware OCTO</a>
        </h1>
        <nav className="header__nav">
          <ul>
            <li>
              <a href="https://wasmlabs.dev">Wasm Labs</a>
            </li>
            <li>
              <a rel="noopener" href="https://twitter.com/vmwwasm">
                Follow us on @vmwwasm
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;