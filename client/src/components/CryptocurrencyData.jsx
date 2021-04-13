import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import AllSix from './AllSix';
import { geoMapDataType, lineGraphDataType, pieChartDataType } from './types';
import Application from './layers/Application';
import Operational from './layers/Operational';
import Incentive from './layers/Incentive';
import Consensus from './layers/Consensus';
import Network from './layers/Network';
import Governance from './layers/Governance';
import '../App.css';
import './CryptocurrencyData.css';

function CryptocurrencyData({
  applicationData,
  operationalData,
  incentiveData,
  consensusData,
  networkData,
  governanceData,
  applicationLoading,
  operationalLoading,
  incentiveLoading,
  consensusLoading,
  networkLoading,
  governanceLoading,
}) {
  const { path } = useRouteMatch();
  return (
    <div className="graph-content-container">
      <div className="graph-container">
        <Switch>
          <Route exact path={path}>
            <AllSix
              applicationData={applicationData.data}
              operationalData={operationalData.data}
              incentiveData={incentiveData.data}
              consensusData={consensusData.data}
              networkData={networkData.data}
              governanceData={governanceData.data}
              applicationLoading={applicationLoading}
              operationalLoading={operationalLoading}
              incentiveLoading={incentiveLoading}
              consensusLoading={consensusLoading}
              networkLoading={networkLoading}
              governanceLoading={governanceLoading}
            />
          </Route>

          <Route exact path={`${path}/application`}>
            <Application
              data={applicationData.data}
              dataSource={applicationData.dataSource}
            />
          </Route>

          <Route exact path={`${path}/operational`}>
            <Operational
              data={operationalData.data}
              dataSource={operationalData.dataSource}
            />
          </Route>

          <Route exact path={`${path}/incentive`}>
            <Incentive
              data={incentiveData.data}
              dataSource={incentiveData.dataSource}
            />
          </Route>

          <Route exact path={`${path}/consensus`}>
            <Consensus
              data={consensusData.data}
              dataSource={consensusData.dataSource}
            />
          </Route>

          <Route exact path={`${path}/network`}>
            <Network
              data={networkData.data}
              dataSource={networkData.dataSource}
            />
          </Route>

          <Route exact path={`${path}/governance`}>
            <Governance
              data={governanceData.data}
              dataSource={governanceData.dataSource}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

CryptocurrencyData.propTypes = {
  applicationData: lineGraphDataType,
  operationalData: lineGraphDataType,
  incentiveData: pieChartDataType,
  consensusData: pieChartDataType,
  networkData: geoMapDataType,
  governanceData: pieChartDataType,
  applicationLoading: PropTypes.bool,
  operationalLoading: PropTypes.bool,
  incentiveLoading: PropTypes.bool,
  consensusLoading: PropTypes.bool,
  networkLoading: PropTypes.bool,
  governanceLoading: PropTypes.bool,
};
CryptocurrencyData.defaultProps = {
  applicationData: [],
  operationalData: [],
  incentiveData: [],
  consensusData: [],
  networkData: [],
  governanceData: [],
  applicationLoading: false,
  operationalLoading: false,
  incentiveLoading: false,
  consensusLoading: false,
  networkLoading: false,
  governanceLoading: false,
};

export default CryptocurrencyData;
