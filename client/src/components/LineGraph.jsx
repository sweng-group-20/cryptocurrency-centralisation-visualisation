import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLineCanvas } from '@nivo/line';
import { BasicTooltip } from '@nivo/tooltip';

import { lineGraphDataType } from './types';
import './LineGraph.css';

function LineGraph({ data, smallGraph, yScaleType }) {
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
          bottom: 70,
          left: 100,
          ...(smallGraph && { right: 60, bottom: 60, left: 60 }),
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
          max: 'auto',
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
                legend: '',
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
                legend: '',
                legendOffset: -40,
                legendPosition: 'middle',
              }
        }
        enableGridY
        lineWidth={1}
        pointSize={4}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'serieColor' }}
        colors={{ scheme: 'spectral' }}
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
};
LineGraph.defaultProps = {
  data: [],
  smallGraph: false,
  yScaleType: 'linear',
};

export default LineGraph;
