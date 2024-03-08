import React, { useState, useEffect } from "react";
import "./ItineraryGenerated.css";
// ... other imports

export default function ItineraryGenerated() {
  const [itineraryContents, setItineraryContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItineraryData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const res = await fetch("/API/auth/itineraries"); // Adjust the base URL if needed

        if (!res.ok) {
          throw new Error("Failed to fetch itineraries");
        }

        const data = await res.json();
        setItineraryContents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItineraryData();
  }, []);

  return (
    <div className="content-body">
      <button className="content-btn btn">Edit Itinerary</button>
      <button className="content-btn btn">Share Itinerary</button>
      <button className="content-btn btn">Save Itinerary</button>

      <div className="sub-content">
        <h3>Your Itinerary</h3>
        <button className="content-btn btn">Re-generate</button>

        {isLoading && <p>Loading itinerary...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && itineraryContents && itineraryContents.length === 0 && (
          <p>No itineraries found.</p>
        )}
        {!isLoading && !error && itineraryContents && (
          <>
            {" "}
            {/* Use a fragment to avoid unnecessary DOM nodes */}
            {itineraryContents.length > 0 ? (
              <ul className="itinerary">
                {itineraryContents.map((content, index) => (
                  <li key={index}>
                    <h3>
                      {content && content.includes("Travel")
                        ? "Travel"
                        : `Day ${
                            content.split(" - ")[0].split("Day ")[1] ||
                            ""
                          }` // Handle potential undefined values
                      }
                    </h3>
                    <p>{content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No itineraries found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
