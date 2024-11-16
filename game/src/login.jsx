import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Loginpg() {
  const navigate = useNavigate();

  const handleLogIn = (event) => {
    event.preventDefault();
    // Perform any sign-up logic here (e.g., form validation, API request)
    
    // After sign-up logic, navigate to the login page
    navigate("/mainpg");
  };

  return (
    <div className="container">
      <div className="home-login-box">
        <h1>Word Puzzle</h1>
        <h2>LOG IN</h2>
        <form onSubmit={handleLogIn}>
          <label>Email :</label>
          <input type="email" required />

          <label>Password :</label>
          <input type="password" required />

          <button type="submit">Log In</button>
        </form>
        <p>
        If you don't have an account <Link to="/">Sign Up</Link> here
        </p>
      </div>
    </div>
  );
}

export default Loginpg;
