
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import "./Header.css";
import { useAuth, useUsername} from "../authWrapper/authContext.js";

export default function Header() {
  const username = useUsername();
  const {logout} = useAuth();
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Code Blog</Link>
      </div>

      <div className="header-right">
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>
            {username ? (
              <p onClick={logout}>Hi {username}, Logout</p> 
            ): <Link to="/login">Login</Link>}</li>
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