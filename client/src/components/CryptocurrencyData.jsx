import React from 'react';
import PropTypes from 'prop-types';
import AllSix from './AllSix';
import './CryptocurrencyData.css';
import '../App.css';
import matchType from '../types/match';

function CryptocurrencyData({ name, match }) {
  return (
    <div className="graph-content-container">
      <div className="graph-container">
        <AllSix name={name} match={match} />
      </div>
    </div>
  );
}

CryptocurrencyData.propTypes = {
  name: PropTypes.string,
  match: matchType.isRequired,
};
CryptocurrencyData.defaultProps = { name: '' };

export default CryptocurrencyData;
