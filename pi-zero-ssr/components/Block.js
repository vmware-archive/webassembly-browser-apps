/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import "./Block.css";

const Block = ({ children, action, inverse, title, id }) => {
  const css = `block ${action && "block--action"} ${
    inverse && "block--inverse"
  }`;

  return (
    <section className={css} aria-labelledby={`${id}-title`}>
      <div className="section">
        <h2 id={`${id}-title`} className="block__title">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Block;