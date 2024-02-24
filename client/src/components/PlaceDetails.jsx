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
            : "https://img.freepik.com/free-vector/neon-icon-dish_1262-15632.jpg?w=740&t=st=1708764919~exp=1708765519~hmac=801be7948fa81ea3fd10049f3d8b9364a626211b7212d677c6da6286d144567b" // if no image posted at hotel/restraunt
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
        {place?.cuisine?.map(({ name }, index, self) => {
          let newName = name.replace(/([A-Z][a-z]+)/g, ", $1").trim();
          if (newName.startsWith(',')) {
            newName = newName.slice(1).trim();
          }
          return (
            <span className="card-cuisine" key={index}>
              Cuisines: {newName}{index !== self.length - 1 ? ', ' : ''}
            </span>
          );
        })}

        {place.address && <div className="card-address">Address: {place.address}</div>}
        {place.phone && <div className="card-phone">Contact: {place.phone}</div>}
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
