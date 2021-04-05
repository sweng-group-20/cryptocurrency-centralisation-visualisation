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
      <PieChart data={data} smallGraph={false} />
    </div>
  );
}

Incentive.propTypes = { data: pieChartDataType };
Incentive.defaultProps = { data: [] };

export default Incentive;
