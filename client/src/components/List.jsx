import React, { useState } from 'react';

const List = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  return (
    <div className="container">
      <h4>Food & Dining around you</h4>
      {/* Render your loading indicator here */}
      <div>
        <label htmlFor="type">Type</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="restaurants">Restaurants</option>
          <option value="hotels">Hotels</option>
          <option value="attractions">Attractions</option>
        </select>
      </div>
      <div>
        <label htmlFor="rating">Rating</label>
        <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">All</option>
          <option value="3">Above 3.0</option>
          <option value="4">Above 4.0</option>
          <option value="4.5">Above 4.5</option>
        </select>
      </div>
      {/* Render your list of items here */}
    </div>
  );
};

export default List;
