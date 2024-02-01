import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  // State to hold username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., authentication)
    console.log("Submitted:", { username, password });
  };

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/signUp">Sign Up</Link>
      </p>
    </div>
  );
}
