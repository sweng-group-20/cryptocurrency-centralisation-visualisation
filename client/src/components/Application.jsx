import React from 'react';
import { useHistory } from 'react-router-dom';

import LineGraph from './LineGraph';
import './Application.css';
import '../index.css';
import { lineGraphDataType } from './types';

function Application({ data }) {
  const history = useHistory();

  return (
    <div className="ApplicationGraph">
      <div className="section-top">
        <h1 className="section-title">Application Layer</h1>
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
        <LineGraph
          data={data}
          yScaleType="linear"
          xAxisLabel="date"
          yAxisLabel="satoshi index"
        />
      </div>
    </div>
  );
}

Application.propTypes = { data: lineGraphDataType };
Application.defaultProps = { data: [] };

export default Application;
