
import React from "react";
import { Link } from "react-router-dom";
import { useUsername } from "../components/authWrapper/authContext.js";
import "./HomePage.css";

function HomePage() {
  const username = useUsername();

  return (
    <section className="home-hero">
      <div className="home-content">
        <h1>Welcome to Code Blog</h1>
        <p>
          A simple React blog where you can read posts and share your thoughts.
          {username && ` Glad to meet you, ${username}!`}
        </p>

        <div className="home-buttons">
          {!username && (
            <Link to="/login" className="home-btn primary">
              Login
            </Link>
          )}
          <Link to="/posts" className="home-btn secondary">
            Explore Blog
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
