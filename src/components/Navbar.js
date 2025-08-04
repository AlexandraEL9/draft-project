import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Create this CSS file for styling

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">RoutineApp</Link>

      <button 
        className="hamburger" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {menuOpen && (
        <div className="menu">
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/routines" onClick={() => setMenuOpen(false)}>Routines</Link>
          <Link to="/team" onClick={() => setMenuOpen(false)}>Our Team</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

