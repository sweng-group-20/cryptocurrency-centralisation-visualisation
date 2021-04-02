import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import '../App.css';
import './CryptocurrencyData.css';
// import AllSix from './AllSix';
// import Application from './Application';
import Consensus from './Consensus';
// import Incentive from './Incentive';
import Operational from './Operational';
import Network from './Network';
// import Governance from './Governance';

function CryptocurrencyData({ consensusData, networkData, operationalData }) {
  const { path } = useRouteMatch();
  return (
    <div className="graph-content-container">
      <div className="graph-container">
        <Switch>
          {/* <Route exact path={path}>
            <AllSix applicationData={applicationData} />
          </Route> */}

          {/* <Route exact path={`${path}/Application`}>
            <Application data={applicationData} />
          </Route> */}

          <Route exact path={`${path}/Consensus`}>
            <Consensus data={consensusData} />
          </Route>

          {/* <Route exact path={`${path}/Incentive`}>
            <Incentive data={pieData} />
          </Route> */}

          <Route exact path={`${path}/Operational`}>
            <Operational data={operationalData} />
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
  // applicationData: PropTypes.string,
  // applicationData: PropTypes.string,
  // applicationData: PropTypes.string,
  consensusData: PropTypes.string,
  networkData: PropTypes.string,
  operationalData: PropTypes.string,
};
CryptocurrencyData.defaultProps = {
  // applicationData: '',
  // applicationData: '',
  // applicationData: '',
  consensusData: '',
  networkData: '',
  operationalData: '',
};

export default CryptocurrencyData;
