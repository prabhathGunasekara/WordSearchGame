import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

function HomePGX() {
  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    // Perform any sign-up logic here (e.g., form validation, API request)
    
    // After sign-up logic, navigate to the login page
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="home-signup-box">
        <h1>Word Puzzle</h1>
        <h2>SIGN UP</h2>
        <form onSubmit={handleSignIn}>
          <label>Name :</label>
          <input type="text" required />

          <label>Email :</label>
          <input type="email" required />

          <label>Password :</label>
          <input type="password" required />

          <button type="submit">Sign Up</button>
        </form>
        <p>
        If you already have an account <Link to="/login">Log In</Link> here
        </p>
      </div>
    </div>
  );
}

export default HomePGX;
