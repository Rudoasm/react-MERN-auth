import React from 'react';
import "./PlaceDetails.css"

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="card">
      <img
        className="card-img"
        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        alt={place.name}
      />
      <div className="card-content">
        <h5 className="card-title">{place.name}</h5>
      </div>
    </div>
  );
};

export default PlaceDetails;
