/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import "./Footer.css";

/**
 * Display a footer with all the information, links and logo
 */
const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div class="footer__logo">
          <img src="/assets/images/vmw-logo-grey.svg" />
        </div>
        <p>
          &copy; 2022 <a href="https://vmware.com">VMware</a>
        </p>
        <p>
          <a href="https://www.vmware.com/help/legal.html">Terms</a>
        </p>
        <p>
          <a href="https://www.vmware.com/help/privacy.html">Privacy</a>
        </p>
        <p>
          <a href="https://www.vmware.com/help/privacy/california-privacy-rights.html">
            Your California Rights
          </a>
        </p>
        <p class="footer__social">
          Follow us on
          <a href="https://twitter.com/intent/user?screen_name=vmwwasm">
            Twitter
          </a>
          <a href="https://github.com/vmware-labs">GitHub</a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;