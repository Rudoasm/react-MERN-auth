import { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Questionairre.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/User/userSlice';




function Questionnaire() {
  const { currentUser, loading, error } = useSelector((state) => state.user);// Assuming you have useSelector imported from 
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    location: currentUser.questionnaire.location || "",
    estimatedBudget: currentUser.questionnaire.estimatedBudget || "",
    fromDate: currentUser.questionnaire.fromDate || new Date(),
    toDate: currentUser.questionnaire.toDate || new Date(),
    timeFrame: currentUser.questionnaire.timeFrame || "",
    travelingCount: currentUser.questionnaire.travelingCount || "",
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      navigate("/SignIn"); // Assuming you have navigate imported from '@reach/router'
    } catch (error) {
      dispatch(updateUserFailure(error));
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
