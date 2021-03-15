/* eslint-disable prettier/prettier */
import React from 'react';
import Cryptocurrency from './Cryptocurrency'
import '../App.css';

function Ethereum() {
  return (
    <div className="graph-content-container">
    <Cryptocurrency name='Ethereum'/>
  </div>
  );
}

export default Ethereum;