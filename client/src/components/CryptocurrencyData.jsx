import React from "react";
import { Switch, Route } from "react-router-dom";
import Application from './Application'
import Consensus from './Consensus'
import Incentive from './Incentive'
import Operational from './Operational'
import Network from './Network'
import Governance from './Governance'
import AllSix from './AllSix'
import './CryptocurrencyData.css'
import "../App.css";

function CryptocurrencyData(props) {
  const name = props.name;

  return (
    <div className="graph-content-container">
      <div className="graph-container">
      <AllSix name={name} />
      <Application />
        <Switch>
          <Route exact path="/">
            <AllSix />
          </Route>
          <Route path="/Application" component={Application} name={name} />
          <Route path="/Consensus" component={Consensus} name={name} />
          <Route path="/Incentive" component={Incentive} name={name} />
          <Route path="/Operational" component={Operational} name={name} />
          <Route path="/Network" component={Network} name={name} />
          <Route path="/Governance" component={Governance} name={name} />
        </Switch>
      </div>
    </div>
  );
}

export default CryptocurrencyData;
