import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLineCanvas } from '@nivo/line';
import { BasicTooltip } from '@nivo/tooltip';

import { lineGraphDataType } from '../types';
import './LineGraph.css';
import Spinner from '../Spinner';

function LineGraph({
  data,
  smallGraph,
  yScaleType,
  xAxisLabel,
  yAxisLabel,
  yAxisMax,
  loading,
}) {
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="lineGraph">
      <ResponsiveLineCanvas
        tooltip={({ point }) => (
          <BasicTooltip
            id={
              <span>
                {point.serieId}
                <br />
                x: <strong>{point.data.xFormatted}</strong>, y:{' '}
                <strong>{point.data.yFormatted}</strong>
              </span>
            }
            enableChip
            color={point.serieColor}
          />
        )}
        curve="monotoneX"
        isInteractive
        data={
          smallGraph
            ? data.map(({ id, data: plotPoints }) => ({
                id,
                data: plotPoints.slice(-25, -1),
              }))
            : data
        }
        margin={{
          top: 60,
          right: 160,
          bottom: 160,
          left: 100,
          ...(smallGraph && { top: 40, right: 40, bottom: 40, left: 40 }),
        }}
        xScale={{
          type: 'time',
          precision: 'day',
          useUTC: false,
          format: '%Y-%m-%d',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: yScaleType,
          min: 'auto',
          max: yAxisMax,
          stacked: false,
        }}
        yFormat=" >-.4f"
        axisTop={null}
        axisRight={null}
        axisBottom={
          smallGraph
            ? null
            : {
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -41,
                legend: xAxisLabel,
                legendOffset: 90,
                legendPosition: 'middle',
                format: '%Y-%m-%d',
              }
        }
        axisLeft={
          smallGraph
            ? null
            : {
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: yAxisLabel,
                legendOffset: -60,
                legendPosition: 'middle',
              }
        }
        enableGridX={!smallGraph}
        enableGridY={!smallGraph}
        lineWidth={1}
        pointSize={4}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'serieColor' }}
        colors={{ scheme: 'dark2' }}
        legends={
          smallGraph
            ? []
            : [
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]
        }
      />
    </div>
  );
}

LineGraph.propTypes = {
  data: lineGraphDataType,
  smallGraph: PropTypes.bool,
  yScaleType: PropTypes.oneOf(['linear', 'log']),
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  yAxisMax: PropTypes.oneOf([PropTypes.number, 'auto']),
  loading: PropTypes.bool,
};
LineGraph.defaultProps = {
  data: [],
  smallGraph: false,
  yScaleType: 'linear',
  xAxisLabel: '',
  yAxisLabel: '',
  yAxisMax: 'auto',
  loading: false,
};

export default LineGraph;
