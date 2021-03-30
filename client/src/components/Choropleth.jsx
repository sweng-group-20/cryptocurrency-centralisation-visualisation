import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';

import './LineGraph.css';

function Chloropleth({ data, smallGraph }) {
  return (
    <div className="lineGraph">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: smallGraph ? 60 : 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        // axisBottom={{
        //   orient: 'bottom',
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        // }}
        axisLeft={null}
        // axisLeft={{
        //   orient: 'left',
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        // }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh
        // legends={[
        //   {
        //     anchor: 'bottom-right',
        //     direction: 'column',
        //     justify: false,
        //     translateX: 100,
        //     translateY: 0,
        //     itemsSpacing: 0,
        //     itemDirection: 'left-to-right',
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemOpacity: 0.75,
        //     symbolSize: 12,
        //     symbolShape: 'circle',
        //     symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemBackground: 'rgba(0, 0, 0, .03)',
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
      )
    </div>
  );
}

Chloropleth.propTypes = {
  data: PropTypes.string,
  smallGraph: PropTypes.bool,
};

Chloropleth.defaultProps = {
  data: '',
  smallGraph: false,
};

export default Chloropleth;
