import React from 'react';
import './AllSix.css';
import '../index.css';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import LineGraph from './LineGraph';
import PieChart from './PieChart';
import ResponsiveChoropleth from './GeoMap';
// import NetworkSmallGraph from './NetworkSmallGraph';

function AllSix({ lineData, pieData }) {
  const { url } = useRouteMatch();
  return (
    <section className="AllSix">
      <Link to={`${url}/Application`}>
        <div className="graph Application">
          <LineGraph data={lineData} smallGraph />
          Application
          <br />
        </div>
      </Link>
      <Link to={`${url}/Consensus`}>
        <div className="graph Consensus">
          <PieChart data={pieData} smallGraph />
          Consensus
          <br />
        </div>
      </Link>
      <Link to={`${url}/Incentive`}>
        <div className="graph Incentive">
          <PieChart data={pieData} smallGraph />
          Incentive
          <br />
        </div>
      </Link>
      <Link to={`${url}/Operational`}>
        <div className="graph Operational">
          <LineGraph data={lineData} smallGraph />
          Operational
          <br />
        </div>
      </Link>
      <Link to={`${url}/Network`}>
        <div className="graph Network">
          <ResponsiveChoropleth />
          Network
          <br />
        </div>
      </Link>
      <Link to={`${url}/Governance`}>
        <div className="graph Governance">
          <PieChart data={pieData} smallGraph />
          Governance
          <br />
        </div>
      </Link>
    </section>
  );
}

AllSix.propTypes = {
  lineData: PropTypes.string,
  pieData: PropTypes.string,
};
AllSix.defaultProps = { lineData: '', pieData: '' };

export default AllSix;
