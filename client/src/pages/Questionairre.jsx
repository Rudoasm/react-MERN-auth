import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import "./Questionairre.css";
// import axios from 'axios';

function Questionnaire() {
  const [formData, setFormData] = useState({
    userLocation: "",
    location: "",
    estimatedBudget: "",
    TypeofTrip: "",
    fromDate: "",
    toDate: "",
    travelingCount: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === "fromDate" || e.target.id === "toDate") {
      setFormData({ ...formData, [e.target.id]: new Date(e.target.value) });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/API/auth/saveItinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data saved successfully");
        // You can add more actions here like redirecting the user to another page
        navigate("/ItineraryGenerated"); 
      } else {
        console.log("Error saving data");
      }
    } catch (error) {
      console.error("An error occurred while saving the data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userLocation">Your Location:</label>
        <input
          type="text"
          id="userLocation"
          name="userLocation"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="estimatedBudget">Estimated Budget:</label>
        <input
          type="number"
          id="estimatedBudget"
          name="estimatedBudget"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="TypeofTrip">Type of Trip</label>
        <select id="TypeofTrip" name="TypeofTrip" onChange={handleChange}>
          <option value="cultural">Cultural</option>
          <option value="religious">Religious</option>
          <option value="family">Family</option>
          <option value="Educational">Educational</option>
          <option value="shopping">Shopping</option>
        </select>
      </div>
      <div className="dates">
        <div>
          <label htmlFor="fromDate">From:</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="toDate">To:</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
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
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="content-btn btn">
        Submit
      </button>
    </form>
  );
}

export default Questionnaire;
