import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import DiningHalls from "./Dining Halls";
import Contact from "./Contacts";
// App.js

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/DiningHalls">DiningHalls</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/DiningHalls" element={<DiningHalls />} />
      <Route path="/contact" element={<Contact />} />
      </Routes>

    </Router>
  );
}

export default App;
