import React from 'react';
import PropTypes from 'prop-types';
import AllSix from './AllSix';
import './CryptocurrencyData.css';
import '../App.css';

function CryptocurrencyData({ name }) {
  return (
    <div className="graph-content-container">
      <div className="graph-container">
        <AllSix name={name} />
      </div>
    </div>
  );
}

CryptocurrencyData.propTypes = {
  name: PropTypes.string,
};
CryptocurrencyData.defaultProps = { name: '' };

export default CryptocurrencyData;
