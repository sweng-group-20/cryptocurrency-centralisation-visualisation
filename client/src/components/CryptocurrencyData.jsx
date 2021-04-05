import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import AllSix from './AllSix';
import { geoMapDataType, lineGraphDataType, pieChartDataType } from './types';
import Application from './Application';
import Operational from './Operational';
// import Incentive from './Incentive';
import Consensus from './Consensus';
import Network from './Network';
// import Governance from './Governance';
import '../App.css';
import './CryptocurrencyData.css';

function CryptocurrencyData({
  applicationData,
  operationalData,
  // incentiveData,
  consensusData,
  networkData,
  // governanceData,
}) {
  const { path } = useRouteMatch();
  return (
    <div className="graph-content-container">
      <div className="graph-container">
        <Switch>
          <Route exact path={path}>
            <AllSix
              applicationData={applicationData}
              operationalData={operationalData}
              // incentiveData={incentiveData}
              consensusData={consensusData}
              networkData={networkData}
              // governanceData={governanceData}
            />
          </Route>

          <Route exact path={`${path}/Application`}>
            <Application data={applicationData} />
          </Route>

          <Route exact path={`${path}/Operational`}>
            <Operational data={operationalData} />
          </Route>

          {/* <Route exact path={`${path}/Incentive`}>
            <Incentive data={pieData} />
          </Route> */}

          <Route exact path={`${path}/Consensus`}>
            <Consensus data={consensusData} />
          </Route>

          <Route exact path={`${path}/Network`}>
            <Network data={networkData} />
          </Route>

          {/* <Route exact path={`${path}/Governance`}>
            <Governance data={pieData} />
          </Route> */}
        </Switch>
      </div>
    </div>
  );
}

CryptocurrencyData.propTypes = {
  applicationData: lineGraphDataType,
  operationalData: lineGraphDataType,
  // incentiveData: pieChartDataType,
  consensusData: pieChartDataType,
  networkData: geoMapDataType,
  // governanceData: pieChartDataType,
};
CryptocurrencyData.defaultProps = {
  applicationData: [],
  operationalData: [],
  // incentiveData: [],
  consensusData: [],
  networkData: [],
  // governanceData: [],
};

export default CryptocurrencyData;
