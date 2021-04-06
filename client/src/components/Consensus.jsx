import React from 'react';
import { useHistory } from 'react-router-dom';

import PieChart from './PieChart';
import './Consensus.css';
import '../index.css';
import { pieChartDataType } from './types';

function Consensus({ data }) {
  const history = useHistory();

  return (
    <div className="ConsensusGraph">
      <div className="section-top">
        <h1 className="section-title">Consensus Layer</h1>
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
      <div className="piechart">
        <PieChart data={data} />
      </div>
    </div>
  );
}

Consensus.propTypes = { data: pieChartDataType };
Consensus.defaultProps = { data: [] };

export default Consensus;
