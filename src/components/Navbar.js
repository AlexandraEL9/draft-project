import React from 'react';
import '../styles/Navbar.css'; // Make sure this path is correct

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Routine Builder</h2>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Routines</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
