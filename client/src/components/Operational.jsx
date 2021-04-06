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
        <LineGraph
          data={data}
          yScaleType="linear"
          xAxisLabel="date"
          yAxisLabel="ratio of growth"
        />
      </div>
      <div className="section-about">
        The uncertainty of reward imposes a constraint on participation for
        rational investors. This reasoning is primarily basedon the cost of
        mining. A miner can earn rewards in the form of mining incentives and
        accumulated transactionfees from the mined block but to profitably mine
        on a Proof-of-Work blockchain, the difference between rewardsearned and
        the expenses of the mining operation should be positive. This is the
        ’operations’ we are referring to inthis ’operational’ layer. The
        expenses of mining operations include capital costs such as the
        acquisition of adequatehardware and other recurrent costs such as the
        cost of electricity.
      </div>
    </div>
  );
}

Operational.propTypes = { data: lineGraphDataType };
Operational.defaultProps = { data: [] };

export default Operational;
