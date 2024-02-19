import React from 'react';
import Mapper from '../components/Mapper';
import List from '../components/List';
 
import "./Map.css";

export default function Map() {
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
