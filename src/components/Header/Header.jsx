// src/components/Header/Header.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import "./Header.css";

export default function Header() {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      {/* 1. Add a logo or site title */}
      <div className="logo">
        <Link to="/">Code Blog</Link>
      </div>

      {/* 2. Create a wrapper for the right side elements */}
      <div className="header-right">
        <nav>
          {/* 3. CRITICAL: Add className="nav-links" to the <ul> tag */}
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="theme-toggle">
          <button onClick={toggleTheme} className="theme-toggle-button">
            {themeName === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          </button>
        </div>
      </div>
    </header>
  );
}