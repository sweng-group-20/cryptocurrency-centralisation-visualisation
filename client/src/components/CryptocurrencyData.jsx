import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AllSix from './AllSix';
import './CryptocurrencyData.css';
import '../App.css';

function CryptocurrencyData({ name }) {
  return (
    <div className="graph-content-container">
      <div className="graph-container">
        <AllSix name={name} />
        <Link to="/Application" name={name} />
        <Link to="/Consensus" name={name} />
        <Link to="/Incentive" name={name} />
        <Link to="/Operational" name={name} />
        <Link to="/Network" name={name} />
        <Link to="/Governance" name={name} />
      </div>
    </div>
  );
}

CryptocurrencyData.propTypes = { name: PropTypes.string };
CryptocurrencyData.defaultProps = { name: '' };

export default CryptocurrencyData;
