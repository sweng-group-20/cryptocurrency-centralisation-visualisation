import React from 'react';
import Cryptocurrency from './CryptocurrencyData';
import '../App.css';
import matchType from '../types/match';

function Ethereum({ match }) {
  return (
    <div className="graph-content-container">
      <Cryptocurrency name="Ethereum" match={match} />
    </div>
  );
}

Ethereum.propTypes = {
  match: matchType.isRequired,
};

export default Ethereum;
