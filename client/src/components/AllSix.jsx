import React from 'react';
import './AllSix.css';
import '../index.css';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

function AllSix({ name }) {
  const { url } = useRouteMatch();
  return (
    <section className="AllSix">
      <Link to={`${url}/Application`}>
        <div className="graph Application">
          Application
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${url}/Consensus`}>
        <div className="graph Consensus">
          Consensus
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${url}/Incentive`}>
        <div className="graph Incentive">
          Incentive
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${url}/Operational`}>
        <div className="graph Operational">
          Operational
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${url}/Network`}>
        <div className="graph Network">
          Network
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${url}/Governance`}>
        <div className="graph Governance">
          Governance
          <br />
          {name}
        </div>
      </Link>
    </section>
  );
}

AllSix.propTypes = {
  name: PropTypes.string,
};
AllSix.defaultProps = { name: '' };

export default AllSix;
