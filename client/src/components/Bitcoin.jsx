import React from 'react';
import Cryptocurrency from './Cryptocurrency';
import '../App.css';

function Bitcoin() {
  return (
    <div className="graph-content-container">
      <Cryptocurrency name="Bitcoin" />
    </div>
  );
}

export default Bitcoin;
