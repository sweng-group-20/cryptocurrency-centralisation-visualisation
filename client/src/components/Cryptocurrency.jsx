/* eslint-disable prettier/prettier */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
import '../App.css';

function Cryptocurrency(props) {
  return (
    <div className="graph-content-container">
      <div className="graph-container bitcoin">

        <div className="graph Application">{props.name}</div>
        <div className="graph Consensus">{props.name}</div>
        <div className="graph Incentive">{props.name}</div>
        <div className="graph Operational">{props.name}</div>
        <div className="graph Network">{props.name}</div>
        <div className="graph Governance">{props.name}</div>
      </div>
    </div>
  );
}

export default Cryptocurrency;
