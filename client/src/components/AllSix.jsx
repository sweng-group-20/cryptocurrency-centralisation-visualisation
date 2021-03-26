import React from 'react';
import './AllSix.css';
import '../index.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function AllSix({ name }) {
  return (
    <section className="AllSix">
      <Link to="/Application" name={name}>
        <div className="graph Application">
          Application
          <br />
          {name}
        </div>
      </Link>
      <Link to="/Consensus" name={name}>
        <div className="graph Consensus">
          Consensus
          <br />
          {name}
        </div>
      </Link>
      <Link to="/Incentive" name={name}>
        <div className="graph Incentive">
          Incentive
          <br />
          {name}
        </div>
      </Link>
      <Link to="/Operational" name={name}>
        <div className="graph Operational">
          Operational
          <br />
          {name}
        </div>
      </Link>
      <Link to="/Network" name={name}>
        <div className="graph Network">
          Network
          <br />
          {name}
        </div>
      </Link>
      <Link to="/Governance" name={name}>
        <div className="graph Governance">
          Governance
          <br />
          {name}
        </div>
      </Link>
    </section>
  );
}

AllSix.propTypes = { name: PropTypes.string };
AllSix.defaultProps = { name: '' };

export default AllSix;
