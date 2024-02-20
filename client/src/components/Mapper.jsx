import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";

function SetViewOnClick({ coords }) {
  const map = useMap();

  useEffect(() => {
    map.setView(coords);
  }, [coords, map]);

  return null;
}

export default function Mapper({ coords, setCoords, setBounds }) {
  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => {
        setCoords(map.getCenter());
        setBounds(map.getBounds());
      },
    });
    return null;
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer center={coords} zoom={13}>
        <SetViewOnClick coords={coords} />
        <MapEvents />
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
