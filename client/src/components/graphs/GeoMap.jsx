import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, GeoJSON } from 'react-leaflet';
import countries from './world_countries.json';
import Spinner from '../Spinner';
import Legend from './entities/Legend';
import legendItems from './entities/LegendItems';
import 'leaflet/dist/leaflet.css';
import './GeoMap.css';

const ResponsiveChoropleth = ({ loading }) => {
  if (loading) {
    return <Spinner />;
  }
  const mapStyle = {
    fillColor: 'white',
    weight: 1,
    color: 'black',
    fillOpacity: 1,
  };
  const onEachCountry = (country, layer) => {
    // eslint-disable-next-line no-param-reassign
    layer.options.fillColor = country.properties.colour;
    const { name } = country.properties;
    const { numNodes } = country.properties;
    layer.bindPopup(`${name} ${numNodes}`);
  };
  const legendItemsInOrder = [...legendItems].reverse();

  return (
    <div>
      <MapContainer style={{ height: '90vh' }} zoom={2} center={[20, 100]} />
      <GeoJSON
        style={mapStyle}
        data={countries.features}
        onEachFeature={onEachCountry}
      />
      <Legend legendItems={legendItemsInOrder} />
    </div>
  );
};

ResponsiveChoropleth.propTypes = {
  // data: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string,
  //     value: PropTypes.number,
  //   })
  // ),
  //  smallGraph: PropTypes.bool,
  loading: PropTypes.bool,
};

ResponsiveChoropleth.defaultProps = {
  //  data: [],
  //  smallGraph: false,
  loading: false,
};

export default ResponsiveChoropleth;
