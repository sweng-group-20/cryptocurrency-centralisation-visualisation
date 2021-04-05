import React from 'react';
import { useHistory } from 'react-router-dom';

import PieChart from './PieChart';
import { pieChartDataType } from './types';
import './Incentive.css';
import '../index.css';

function Incentive({ data }) {
  const history = useHistory();

  return (
    <div className="IncentiveGraph">
      <h1>Incentive Layer</h1>
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

Incentive.propTypes = { data: pieChartDataType };
Incentive.defaultProps = { data: [] };

export default Incentive;
