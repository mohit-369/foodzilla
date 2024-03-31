import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/Register">Register</Link>
        </li>
        {/* <li>
          <Link to="/Restorent">Restaurent</Link>
        </li> */}
      </ul>
    </nav>
  );
};
export default Navbar;
