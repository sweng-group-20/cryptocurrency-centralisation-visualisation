import React from 'react';
import { useHistory } from 'react-router-dom';

import { lineGraphDataType } from './types';
import './Incentive.css';
import '../index.css';
import LineGraph from './LineGraph';

function Incentive({ data }) {
  const history = useHistory();

  return (
    <div className="IncentiveGraph">
      <div className="section-top">
        <h1 className="section-title">Incentive Layer</h1>
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
          yAxisLabel="gini coefficient &amp; percentage value"
        />
      </div>
    </div>
  );
}

Incentive.propTypes = { data: lineGraphDataType };
Incentive.defaultProps = { data: [] };

export default Incentive;
