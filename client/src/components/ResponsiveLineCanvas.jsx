import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLineCanvas as NivoResponsiveLineCanvas } from '@nivo/line';
import { BasicTooltip } from '@nivo/tooltip';

const ResponsiveLineCanvas = ({ data, xAxisLabel, yAxisLabel }) => (
  <NivoResponsiveLineCanvas
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
    data={data}
    margin={{ top: 60, right: 200, bottom: 130, left: 100 }}
    xScale={{
      type: 'time',
      precision: 'day',
      useUTC: false,
      format: '%Y-%m-%d',
    }}
    xFormat="time:%Y-%m-%d"
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: false,
    }}
    yFormat=" >-.4f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -41,
      legend: xAxisLabel,
      legendOffset: 90,
      legendPosition: 'middle',
      format: '%Y-%m-%d',
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: yAxisLabel,
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    enableGridY
    lineWidth={1}
    pointSize={3}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={1}
    pointBorderColor={{ from: 'serieColor' }}
    colors={{ scheme: 'set2' }}
    legends={[
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
    ]}
  />
);

ResponsiveLineCanvas.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.string,
          y: PropTypes.number,
        })
      ),
    })
  ),
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
};

ResponsiveLineCanvas.defaultProps = {
  data: [],
  xAxisLabel: '',
  yAxisLabel: '',
};

export default ResponsiveLineCanvas;
