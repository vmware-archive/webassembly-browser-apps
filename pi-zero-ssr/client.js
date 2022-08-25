/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { hydrate } from "preact";
import App from "./App";

hydrate(<App />, document.getElementById("app"));