/*
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import Router from "preact-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

// Styles
import "./App.css";

// Pages
import Index from "./pages/index.mdx";
import About from "./pages/about.mdx";
import Projects from "./pages/projects.mdx";

const App = ({ url }) => {
  return (
    <>
      <Header />
      <main>
        <Router url={url}>
          <Index path="/" />
          <About path="/about" />
          <Projects path="/projects" />
          <NotFound path="/:else*" />
        </Router>
      </main>
      <Footer />
    </>
  );
};

export default App;