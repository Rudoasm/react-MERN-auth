import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  //  form data stored in state

  const [formdata, setformdata] = useState({});
  // initial value, an empty object
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
    // the spread operator
  };
  console.log(formdata);

  const handleSubmit = async (e) => {
    // should be asynchronous, cuz it should wait until data is passed. if fetch is used await is used so async is mandatory
    e.preventDefault();
    // prevents refreasing the page upon clicking submit button
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/API/auth/signUp", {
        // esssentail if fetch is used instead of axios 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
  
      const data = await res.json();
      console.log(data);
    
  
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
    
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
        <button type="submit" disabled={loading}> {loading ? 'creating profile...' : 'Sign Up'}</button>
      </form>

      <p>
        Dont have an account? <Link to="/signUp">Sign Up</Link>
      </p>
      <p className="error-msg">{error && 'Something went wrong!'}</p>
    </div>
  );
}
