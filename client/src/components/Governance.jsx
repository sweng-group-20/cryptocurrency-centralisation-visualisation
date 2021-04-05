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
      <div className="section-top">
        <h1 className="section-title">Governance Layer</h1>
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

Governance.propTypes = { data: pieChartDataType };
Governance.defaultProps = { data: [] };

export default Governance;
