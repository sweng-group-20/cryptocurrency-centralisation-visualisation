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
      <h1>Consensus Layer</h1>
      <button
        type="button"
        onClick={() => {
          history.goBack();
        }}
      >
        Go back
      </button>
      <div className="piechart">
        <PieChart data={data} smallGraph={false} />
      </div>
    </div>
  );
}

Consensus.propTypes = { data: pieChartDataType };
Consensus.defaultProps = { data: [] };

export default Consensus;
