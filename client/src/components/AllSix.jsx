import React from 'react';
import './AllSix.css';
import '../index.css';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

function AllSix({ name }) {
  const { path } = useRouteMatch();
  return (
    <section className="AllSix">
      <Link to={`${path}/Application`} name={name}>
        <div className="graph Application">
          Application
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${path}/Consensus`} name={name}>
        <div className="graph Consensus">
          Consensus
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${path}/Incentive`} name={name}>
        <div className="graph Incentive">
          Incentive
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${path}/Operational`} name={name}>
        <div className="graph Operational">
          Operational
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${path}/Network`} name={name}>
        <div className="graph Network">
          Network
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${path}/Governance`} name={name}>
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
