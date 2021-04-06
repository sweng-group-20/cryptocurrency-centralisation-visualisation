import React from 'react';
import { useHistory } from 'react-router-dom';

import LineGraph from './LineGraph';
import { lineGraphDataType } from './types';
import './Operational.css';
import '../index.css';

function Operational({ data }) {
  const history = useHistory();

  return (
    <div className="OperationalGraph">
      <div className="section-top">
        <h1 className="section-title">Operational Layer</h1>
        <button
          className="back-button"
          type="button"
          onClick={() => {
            history.goBack();
          }}
        >
          <div className="circle">
            <div className="small-circle">
              <div className="x-one" />
              <div className="x-two" />
            </div>
          </div>
        </button>
      </div>
      <div className="linegraph">
        <LineGraph data={data} yScaleType="linear" />
      </div>
      <div className="section-about">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt enim
        perferendis adipisci nostrum aliquid, expedita sapiente quis blanditiis
        porro recusandae quidem, earum quam eligendi eius? Ratione illum error
        natus non.
      </div>
    </div>
  );
}

Operational.propTypes = { data: lineGraphDataType };
Operational.defaultProps = { data: [] };

export default Operational;
