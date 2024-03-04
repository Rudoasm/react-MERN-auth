import React, { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

function SetViewOnClick({ coords }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords);
  }, [coords, map]);
  return null;
}

function UpdateBounds({ setBounds }) {
  const map = useMap();
  useEffect(() => {
    map.on("moveend", () => {
      const bounds = map.getBounds();
      setBounds({
        ne: bounds.getNorthEast(),
        sw: bounds.getSouthWest(),
      });
    });
  }, [map, setBounds]);
  return null;
}

export default function Mapper({
  coords,
  setCoords,
  setBounds,
  places,
  childClicked,
  setChildClicked,
  weatherData,
}) {
  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => {
        setCoords(map.getCenter());
        setBounds(map.getBounds());
      },
    });
    return null;
  };

  function MarkerCluster({ places }) {
    const map = useMap();

    useEffect(() => {
      const markerClusterGroup = L.markerClusterGroup();
      places.forEach((place, i) => {
        if (place.latitude && place.longitude) {
          const marker = L.marker([place.latitude, place.longitude]).bindPopup(
            place.name
          );
          markerClusterGroup.addLayer(marker);
        }
      });
      map.addLayer(markerClusterGroup);

      return () => {
        map.removeLayer(markerClusterGroup);
      };
    }, [map, places]);

    return null;
  }
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer center={coords} zoom={13}>
        <SetViewOnClick coords={coords} />
        <MapEvents />
        <UpdateBounds setBounds={setBounds} />
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place, i) =>
          place.latitude && place.longitude ? (
            <Marker
              key={i}
              position={[place.latitude, place.longitude]}
              eventHandlers={{ click: () => setChildClicked(i) }}
            >
              <Popup>{place.name}</Popup>
            </Marker>
          ) : null
        )}
        <MarkerCluster places={places} />
     
        {weatherData?.list?.length && weatherData.list.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
