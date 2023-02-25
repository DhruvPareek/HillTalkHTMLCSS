<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import DiningHalls from "./Dining Halls";
import Contact from "./Contacts";
=======
// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Dorms from "./Dorms";
import Contact from "./Contact";
>>>>>>> 5754dddb4601a1755539119adbf60ae0aec6deca

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
<<<<<<< HEAD
            <Link to="/DiningHalls">DiningHalls</Link>
=======
            <Link to="/about">Dorms</Link>
>>>>>>> 5754dddb4601a1755539119adbf60ae0aec6deca
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Routes>
      <Route path="/" element={<Home />} />
<<<<<<< HEAD
      <Route path="/DiningHalls" element={<DiningHalls />} />
=======
      <Route path="/about" element={<Dorms />} />
>>>>>>> 5754dddb4601a1755539119adbf60ae0aec6deca
      <Route path="/contact" element={<Contact />} />
      </Routes>

    </Router>
  );
}

export default App;