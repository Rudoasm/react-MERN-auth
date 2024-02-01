import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  //  form data stored in state

  const [formdata, setformdata] = useState({});
  // initial value, an empty object

  const handleChange = (e) => {
    setformdata;
    ({ ...formdata, [e.target.id]: e.target.value});
    // the spread operator
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to a server)
    console.log("Submitted:", { username, email, password });
  };

  return (
    <div>
      <h1>Sign up page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={{ handleChange }}
            placeholder="username"
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={{ handleChange }}
            placeholder="email"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={{ handleChange }}
            placeholder="password"
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/signIn">Sign In</Link>
      </p>
    </div>
  );
}
