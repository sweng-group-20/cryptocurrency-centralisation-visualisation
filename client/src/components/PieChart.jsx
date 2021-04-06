import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import PropTypes from 'prop-types';

import { pieChartDataType } from './types';
import Spinner from './Spinner';
import './PieChart.css';

function PieChart({ data, smallGraph, loading }) {
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pieChart">
      <ResponsivePie
        data={smallGraph ? data.slice(-10, -1) : data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        enableSliceLabels={!smallGraph}
        enableRadialLabels={!smallGraph}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
      />
    </div>
  );
}

PieChart.propTypes = {
  data: pieChartDataType,
  smallGraph: PropTypes.bool,
  loading: PropTypes.bool,
};
PieChart.defaultProps = {
  data: [],
  smallGraph: false,
  loading: false,
};

export default PieChart;
