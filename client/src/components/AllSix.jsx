import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import LineGraph from './graphs/LineGraph';
import PieChart from './graphs/PieChart';
import ResponsiveChoropleth from './graphs/GeoMap';
import { geoMapDataType, lineGraphDataType, pieChartDataType } from './types';
import './AllSix.css';
import '../index.css';

function AllSix({
  applicationData,
  operationalData,
  incentiveData,
  consensusData,
  networkData,
  governanceData,
  applicationLoading,
  operationalLoading,
  incentiveLoading,
  consensusLoading,
  networkLoading,
  governanceLoading,
}) {
  const { url } = useRouteMatch();
  return (
    <section className="AllSix">
      <Link to={`${url}/application`}>
        <div className="graph Application">
          <h3 className="link">Application</h3>
          <LineGraph
            data={applicationData}
            smallGraph
            yScaleType="linear"
            loading={applicationLoading}
          />
        </div>
      </Link>
      <Link to={`${url}/operational`}>
        <div className="graph Operational">
          <h3 className="link">Operational</h3>
          <LineGraph
            data={operationalData}
            smallGraph
            yScaleType="linear"
            loading={operationalLoading}
          />
        </div>
      </Link>
      <Link to={`${url}/incentive`}>
        <div className="graph Incentive">
          <h3 className="link">Incentive</h3>
          <LineGraph
            data={incentiveData}
            smallGraph
            yScaleType="linear"
            loading={incentiveLoading}
          />
        </div>
      </Link>
      <Link to={`${url}/consensus`}>
        <div className="graph Consensus">
          <h3 className="link">Consensus</h3>
          <PieChart
            data={consensusData}
            smallGraph
            loading={consensusLoading}
          />
        </div>
      </Link>
      <Link to={`${url}/network`}>
        <div className="graph Network">
          <h3 className="link">Network</h3>
          <div className="visual">
            <ResponsiveChoropleth
              data={networkData}
              smallGraph
              loading={networkLoading}
            />
          </div>
        </div>
      </Link>
      <Link to={`${url}/governance`}>
        <div className="graph Governance">
          <h3 className="link">Governance</h3>
          <PieChart
            data={governanceData}
            smallGraph
            loading={governanceLoading}
          />
        </div>
      </Link>
    </section>
  );
}

AllSix.propTypes = {
  applicationData: lineGraphDataType,
  operationalData: lineGraphDataType,
  incentiveData: pieChartDataType,
  consensusData: pieChartDataType,
  networkData: geoMapDataType,
  governanceData: pieChartDataType,
  applicationLoading: PropTypes.bool,
  operationalLoading: PropTypes.bool,
  incentiveLoading: PropTypes.bool,
  consensusLoading: PropTypes.bool,
  networkLoading: PropTypes.bool,
  governanceLoading: PropTypes.bool,
};
AllSix.defaultProps = {
  applicationData: [],
  operationalData: [],
  incentiveData: [],
  consensusData: [],
  networkData: [],
  governanceData: [],
  applicationLoading: false,
  operationalLoading: false,
  incentiveLoading: false,
  consensusLoading: false,
  networkLoading: false,
  governanceLoading: false,
};

export default AllSix;
