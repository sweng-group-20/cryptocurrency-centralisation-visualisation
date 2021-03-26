import React from 'react';
import CryptocurrencyData from './CryptocurrencyData';
import './Bitcoin.css';
import '../App.css';
import matchType from '../types/match';

function Bitcoin({ match }) {
  return (
    <div className="graph-content-container">
      <CryptocurrencyData name="Bitcoin" match={match} />
    </div>
  );
}

Bitcoin.propTypes = {
  match: matchType.isRequired,
};

export default Bitcoin;
