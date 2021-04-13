import React from 'react';
import { useHistory } from 'react-router-dom';
import Linkify from 'react-linkify';
import { string } from 'prop-types';

import PieChart from '../graphs/PieChart';
import { pieChartDataType } from '../types';
import './Governance.css';
import '../../index.css';

function Governance({ data, dataSource }) {
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
      <div className="piechart">
        <PieChart data={data} />
      </div>
      <div className="section-about">
        The consensus layer establishes an agreement on a single state of the
        data in the public blockchain. In the case of Proof of Work, it is
        attained by inducing a race to solve a mathematical problem. The
        firstperson to solve and propagate receives a monetary reward as an
        incentive. The likelihood of finding the solution tothe mathematical
        problem depends on the computational power devoted to the solution. Thus
        a high concentrationof computational power is a direct signifier of
        centralization in the blockchain.
      </div>
      <br />
      <br />
      <Linkify>
        <div className="text" align="center">
          Data source: {dataSource}
        </div>
      </Linkify>
    </div>
  );
}

Governance.propTypes = { data: pieChartDataType, dataSource: string };
Governance.defaultProps = { data: [], dataSource: '' };

export default Governance;
