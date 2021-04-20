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
        Blockchain, like any other information system, is subject to
        evolutionary changes that are governed by a governance structure. These
        evolutionary changes may include security patches, scalability
        provisions, and improvement proposals. It is theorizesd that the
        relationship between the value proposition of blockchain and the
        governance structure in place. They reason that the core value
        proposition of blockchain is rooted in decentralization. This property
        of decentralization is considered valuable by investors.
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
