import React from "react";
import "./PlaceDetails.css";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="card">
      <img
        className="card-img"
        src={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        alt={place.name}
      />
      <div className="card-content">
        <h5 className="card-title">{place.name}</h5>
        <div className="card-rating">{place.rating}</div>
        <div className="card-reviews">
          {place.num_reviews} review{place.num_reviews > 1 && "s"}
        </div>
        <div className="card-price">Price: {place.price_level}</div>
        <div className="card-ranking">Ranking: {place.ranking}</div>
        {place?.awards?.map((award) => (
          <div className="card-award">
            <img src={award.images.small} alt={award.display_name} />
            <span>{award.display_name}</span>
          </div>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <span className="card-cuisine">{name}</span>
        ))}
        {place.address && <div className="card-address">{place.address}</div>}
        {place.phone && <div className="card-phone">{place.phone}</div>}
        <div className="card-actions">
          <a href={place.web_url} target="_blank" rel="noopener noreferrer">
            learn more...
          </a>
          <a href={place.website} target="_blank" rel="noopener noreferrer">
            Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
