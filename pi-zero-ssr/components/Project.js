/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import "./Project.css";

const Project = ({ children }) => <div className="project">{children}</div>;

export const ProjectItem = ({ children }) => (
  <div className="project__item">{children}</div>
);

export default Project;
