import React, { useEffect, useState } from "react";
import Mapper from "../components/Mapper";
import List from "../components/List";
import { getplacedata } from "./FrontendAPIs/RRApi";

import "./Map.css";

export default function Map() {
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);


  useEffect(() => {
    getplacedata().then((data) => {
      console.log(data);
      setPlaces(data);
    });
  }, []);
  return (
    <div className="container">
      <div className="list">
        <List />
      </div>
      <div className="mapper">
        <Mapper />
      </div>
    </div>
  );
}
