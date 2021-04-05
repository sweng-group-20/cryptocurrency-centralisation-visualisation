import React from 'react';
import { useHistory } from 'react-router-dom';

import PieChart from './PieChart';
import { pieChartDataType } from './types';
import './Governance.css';
import '../index.css';

function Governance({ data }) {
  const history = useHistory();

  return (
    <div className="GovernanceGraph">
      <h1>Governance Layer</h1>
      <button
        type="button"
        onClick={() => {
          history.goBack();
        }}
      >
        Go back
      </button>
      <PieChart data={data} smallGraph={false} />
    </div>
  );
}

Governance.propTypes = { data: pieChartDataType };
Governance.defaultProps = { data: [] };

export default Governance;
