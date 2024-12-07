import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

function HomePGX() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User registered successfully!");
        navigate("/login");  
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="container">
      <div className="home-signup-box">
        <h1>Word Puzzle</h1>
        <h2>SIGN UP</h2>
        <form onSubmit={handleSignIn}>
          <label>Name :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

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
