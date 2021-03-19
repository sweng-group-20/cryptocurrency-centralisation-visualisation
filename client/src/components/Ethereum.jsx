import React from 'react';
import Cryptocurrency from './CryptocurrencyData'
import '../App.css';

function Ethereum() {
  return (
    <div className="graph-content-container">
    <Cryptocurrency name='Ethereum'/>
  </div>
  );
}

export default Ethereum;