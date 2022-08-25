/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import "./Illustration.css";

const Illustration = ({ animate, perspective }) => {
  // Inline SVG illustration
  const css = `illustration ${animate && "illustration--animate"} ${
    perspective && "illustration--perspective"
  }`;

  return <img src="/assets/images/illustration.svg" className={css} />;
};

export default Illustration;