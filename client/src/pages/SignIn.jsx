import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formdata, setformdata] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/API/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }

      // Set isSignedIn to true in localStorage when sign in is successful
      localStorage.setItem("isSignedIn", "true");

      navigate("/Home");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div>
      <h1>Sign In page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            onChange={handleChange}
            placeholder="email"
            id="email"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            onChange={handleChange}
            placeholder="password"
            id="password"
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {" "}
          {loading ? "Signing in" : "Sign in"}
        </button>
      </form>

      <p>
        Dont have an account? <Link to="/signUp">Sign Up</Link>
      </p>
      <p className="error-msg">{error && "Something went wrong!"}</p>
    </div>
  );
}
