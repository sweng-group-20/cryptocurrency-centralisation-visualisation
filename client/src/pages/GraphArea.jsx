import React from 'react';
import './GraphArea.css';
import '../index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Bitcoin from '../components/Bitcoin';
import Ethereum from '../components/Ethereum';
import CryptoNav from '../components/CryptoNav';

function GraphArea() {
  return (
    <section className="GraphArea">
      <Router>
        <CryptoNav />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/bitcoin" />;
            }}
          />
          <Route path="/bitcoin" component={Bitcoin} />
          <Route path="/ethereum" component={Ethereum} />
        </Switch>
      </Router>
    </section>
  );
}

export default GraphArea;
