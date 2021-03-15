/* eslint-disable prettier/prettier */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './GraphArea.css';
import '../index.css';
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
              return <Redirect to="/Bitcoin" />;
            }}
          />
          <Route exact path="/Bitcoin" component={Bitcoin} />
          <Route path="/Ethereum" component={Ethereum} />
        </Switch>
      </Router>
    </section>
  );
}

export default GraphArea;
