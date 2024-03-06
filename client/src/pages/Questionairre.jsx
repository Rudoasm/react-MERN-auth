import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Questionairre.css"

function Questionnaire() {
  const [formData, setFormData] = useState({
    location: "",
    estimatedBudget: "",
    ageCategory: "",
    timeFrame: "",
    travelingCount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/API/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, questionnaire: formData }),
      });
  
      const data = await res.json();
      console.log(data);
  
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/SignIn");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="estimatedBudget">Estimated Budget:</label>
        <input
          type="number"
          id="estimatedBudget"
          name="estimatedBudget"
          value={formData.estimatedBudget}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="TypeofTrip">Type of Trip</label>
        <select
          id="TypeofTrip"
          name="TypeofTrip"
          value={formData.ageCategory}
          onChange={handleChange}
        >
          <option value="Fun and Friends">Fun and Friends</option>
          <option value="Religious">Religious</option>
          <option value="Family">Family</option>

          <option value="Educational">Educational</option>
          <option value="Leisure">Leisure</option>
        </select>
      </div>
      <div className="dates">
        <div>
          <label htmlFor="fromDate">From:</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="toDate">To:</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="travelingCount">Traveling Count:</label>
        <input
          type="number"
          id="travelingCount"
          name="travelingCount"
          value={formData.travelingCount}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="content-btn btn">
        <Link to="/Itineraygenerated">Submit</Link>
      </button>
    </form>
  );
}

export default Questionnaire;
