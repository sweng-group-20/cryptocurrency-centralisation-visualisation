import React from 'react';
import { useHistory } from 'react-router-dom';

import { lineGraphDataType } from './types';
import './Incentive.css';
import '../index.css';
import LineGraph from './LineGraph';

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
        majority i.e. the network has at least higherthan 50% non-malicious
        participants. Blockchain systems use incentive engineering to ensure
        that the majority of5 the network is honest. This incentive is often in
        the form of a block reward which is assigned to the node
        thatsuccessfully adds a new block to the blockchain. The incentive layer
        describes the mechanism used for issuance ofreward and the distribution
        of reward. This layer acts as an interface between the user-facing
        layers and the technicalimplementation layers.2.2.5 Contract Lay
      </div>
    </div>
  );
}

Incentive.propTypes = { data: lineGraphDataType };
Incentive.defaultProps = { data: [] };

export default Incentive;
