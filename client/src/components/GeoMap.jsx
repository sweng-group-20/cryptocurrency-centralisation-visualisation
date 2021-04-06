import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveChoropleth as NivoResponsiveChoropleth } from '@nivo/geo';

import countries from './world_countries.json';
import Spinner from './Spinner';

const ResponsiveChoropleth = ({ data, smallGraph, loading }) => {
  if (loading) {
    return <Spinner />;
  }

  return (
    <NivoResponsiveChoropleth
      data={data}
      features={countries.features}
      colors="nivo"
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionTranslation={[0.5, 0.5]}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#152538"
      domain={[0, 600]}
      legends={
        smallGraph
          ? []
          : [
              {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: '#444444',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000000',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
      }
    />
  );
};

ResponsiveChoropleth.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.number,
    })
  ),
  smallGraph: PropTypes.bool,
  loading: PropTypes.bool,
};

ResponsiveChoropleth.defaultProps = {
  data: [],
  smallGraph: false,
  loading: false,
};

export default ResponsiveChoropleth;
