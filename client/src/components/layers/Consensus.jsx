import React from 'react';
import { useHistory } from 'react-router-dom';
import { string } from 'prop-types';

import PieChart from '../graphs/PieChart';
import { pieChartDataType } from '../types';
import DataSource from './DataSource';
import './Consensus.css';
import '../../index.css';

function Consensus({ data, dataSource }) {
  const history = useHistory();

  return (
    <div className="ConsensusGraph">
      <div className="section-top">
        <h1 className="section-title">
          Consensus Layer (Consensus Power Distribution)
        </h1>
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
        The consensus layer describes the agreement on a single state of the
        data in the public blockchain. In the case of Proof of Work, consensus
        is attained by inducing a race to solve a mathematical problem. The
        first person to solve and propagate receives a monetary reward as an
        incentive. The likelihood of finding the solution to the mathematical
        problem depends on the computational power devoted to the solution. Thus
        a high concentration of computational power is a direct signifier of
        centralization in the blockchain.
      </div>
      <br />
      <DataSource dataSource={dataSource} />
    </div>
  );
}

Consensus.propTypes = { data: pieChartDataType, dataSource: string };
Consensus.defaultProps = { data: [], dataSource: '' };

export default Consensus;
