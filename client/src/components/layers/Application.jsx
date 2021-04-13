import React from 'react';
import { useHistory } from 'react-router-dom';
import Linkify from 'react-linkify';
import { string } from 'prop-types';

import LineGraph from '../graphs/LineGraph';
import { lineGraphDataType } from '../types';
import './Application.css';
import '../../index.css';

function Application({ data, dataSource }) {
  const history = useHistory();

  return (
    <div className="ApplicationGraph">
      <div className="section-top">
        <h1 className="section-title">Application Layer</h1>
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
          yAxisLabel="satoshi index"
          yAxisMax={0.03}
        />
      </div>
      <div className="section-about">
        Users often rely on third-party applications to facilitate user
        interaction with the blockchain. These third-partyapplications include
        reference implementations, wallets, and exchanges. As a result of our
        review, we report oncentralization on these three application layer
        entities. We also suggest that a monopoly in the user end applications
        fora blockchain instance is a contributor to the centralization of the
        blockchain
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

Application.propTypes = { data: lineGraphDataType, dataSource: string };
Application.defaultProps = { data: [], dataSource: [] };

export default Application;
