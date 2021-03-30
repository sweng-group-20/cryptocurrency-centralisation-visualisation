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
          Application
          <LineGraph data={lineData} smallGraph />
        </div>
      </Link>
      <Link to={`${url}/Consensus`}>
        <div className="graph Consensus">
          Consensus
          <PieChart data={pieData} smallGraph />
        </div>
      </Link>
      <Link to={`${url}/Incentive`}>
        <div className="graph Incentive">
          Incentive
          <PieChart data={pieData} smallGraph />
        </div>
      </Link>
      <Link to={`${url}/Operational`}>
        <div className="graph Operational">
          Operational
          <LineGraph data={lineData} smallGraph />
        </div>
      </Link>
      <Link to={`${url}/Network`}>
        <div className="graph Network">
          Network
          <ResponsiveChoropleth />
        </div>
      </Link>
      <Link to={`${url}/Governance`}>
        <div className="graph Governance">
          Governance
          <PieChart data={pieData} smallGraph />
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
