import React, { useState } from "react";
import "./Support.css"

export default function Support() {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
       // Open the user's email client with a new email pre-filled with the query
    window.location.href = `mailto:elrudoasm@gmail.com?subject=Support Query&body=${encodeURIComponent(query)}`;
    // To Clear the input field after submitting
    setQuery("");
  };

  return (
    <div>
      <h3>Write your queries to us</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="textarea"
          value={query}
          onChange={handleInputChange}
          placeholder="Type your query here..."
          rows="4"
          cols="50"
        ></textarea>
        <br />
        <button type="submit" className="content-btn btn">Submit</button>
      </form>
    </div>
  );
}
