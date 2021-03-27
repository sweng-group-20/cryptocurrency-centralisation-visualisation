import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import '../App.css';
import './CryptocurrencyData.css';
import AllSix from './AllSix';
import Application from './Application';
import Consensus from './Consensus';
import Incentive from './Incentive';
import Operational from './Operational';
import Network from './Network';
import Governance from './Governance';

function CryptocurrencyData({ name }) {
  const { path } = useRouteMatch();
  return (
    <div className="graph-content-container">
      <div className="graph-container">
        <Switch>
          <Route exact path={path}>
            <AllSix name={name} />
          </Route>
          <Route exact path={`${path}/Application`} component={Application} />
          <Route exact path={`${path}/Consensus`} component={Consensus} />
          <Route exact path={`${path}/Incentive`} component={Incentive} />
          <Route exact path={`${path}/Operational`} component={Operational} />
          <Route exact path={`${path}/Network`} component={Network} />
          <Route exact path={`${path}/Governance`} component={Governance} />
        </Switch>
      </div>
    </div>
  );
}

CryptocurrencyData.propTypes = {
  name: PropTypes.string,
};
CryptocurrencyData.defaultProps = { name: '' };

export default CryptocurrencyData;
