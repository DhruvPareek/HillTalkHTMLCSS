// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Dorms from "./Dorms";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">Dorms</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Dorms />} />
      <Route path="/contact" element={<Contact />} />
      </Routes>

    </Router>
  );
}

export default App;