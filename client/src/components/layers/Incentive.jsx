import React from 'react';
import { useHistory } from 'react-router-dom';
import { string } from 'prop-types';

import DataSource from './DataSource';
import { lineGraphDataType } from '../types';
import LineGraph from '../graphs/LineGraph';
import './Incentive.css';
import '../../index.css';

function Incentive({ data, dataSource }) {
  const history = useHistory();

  return (
    <div className="IncentiveGraph">
      <div className="section-top">
        <h1 className="section-title">
          Incentive Layer (Wealth Concentration)
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
      <div className="linegraph">
        <LineGraph
          data={data}
          yScaleType="linear"
          xAxisLabel="date"
          yAxisLabel="gini coefficient &amp; percentage value"
        />
      </div>
      <div className="section-about">
        This deterministic assurance is based on the assumption of an honest
        majority i.e. the network has at least higher than 50% non-malicious
        participants. Blockchain systems use incentive engineering to ensure
        that the majority of the network is honest. This incentive is often in
        the form of a block reward which is assigned to the node that
        successfully adds a new block to the blockchain. The incentive layer
        describes the mechanism used for issuance of reward and the distribution
        of reward. This layer acts as an interface between the user-facing
        layers and the technical implementation layers.
      </div>
      <br />
      <DataSource dataSource={dataSource} />
    </div>
  );
}

Incentive.propTypes = { data: lineGraphDataType, dataSource: string };
Incentive.defaultProps = { data: [], dataSource: '' };

export default Incentive;
