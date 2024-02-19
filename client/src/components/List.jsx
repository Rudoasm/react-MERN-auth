import React, { useState } from 'react';
import PlaceDetails from './PlaceDetails';
import "./List.css";

const List = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const places = [
    { name: "Cool place" },
    { name: "Best beer" },
    { name: "Best steak" },
    { name: "Cool place" },
    { name: "Best beer" },
    { name: "Best steak" },
    { name: "Cool place" },
    { name: "Best beer" },
    { name: "Best steak" }
  ];

  return (
    <div className="container">
      <h4>Food & Dining around you</h4>
      <div>
        <label htmlFor="type">Type</label>
        <select id="type" className = "type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="restaurants">Restaurants</option>
          <option value="hotels">Hotels</option>
          <option value="attractions">Attractions</option>
        </select>
      </div>
      <div>
        <label htmlFor="rating">Rating</label>
        <select id="rating" className='rating' value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">All</option>
          <option value="3">Above 3.0</option>
          <option value="4">Above 4.0</option>
          <option value="4.5">Above 4.5</option>
        </select>
      </div>
      
      <div className="list">
        {places.map((place, i) => (
          <div key={i} className="item">
            <PlaceDetails place={place} />
          </div>
        ))}
      </div>
    </div>
  
  );
};

export default List;
