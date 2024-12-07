import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Loginpg() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();  
         
        sessionStorage.setItem("userId", user.id);
        sessionStorage.setItem("userName", user.name);
        alert("Login successful!");
        navigate("/mainpg");  
      } else {
        const errorMessage = await response.text();
        alert(`Login failed: ${errorMessage}`);  
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while connecting to the server.");
    }
  };

  return (
    <div className="container">
      <div className="home-login-box">
        <h1>Word Puzzle</h1>
        <h2>LOG IN</h2>
        <form onSubmit={handleLogIn}>
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
