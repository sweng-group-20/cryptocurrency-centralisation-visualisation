import React from 'react';

import CryptocurrencyData from './CryptocurrencyData';
import './Bitcoin.css';
import '../App.css';

function Bitcoin() {
  return (
    <div className="graph-content-container">
      <CryptocurrencyData name="Bitcoin" />
    </div>
  );
}

export default Bitcoin;
