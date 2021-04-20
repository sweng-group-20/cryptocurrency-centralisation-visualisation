import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, GeoJSON } from 'react-leaflet';

import SetCountryData from './entities/SetCountries';
import Spinner from '../Spinner';
import 'leaflet/dist/leaflet.css';
import './GeoMap.css';

const ResponsiveChoropleth = ({ data, smallGraph, loading }) => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const countryData = new SetCountryData(data);
    setSortedData(countryData.sortData());
  }, [data]);

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
    if (numNodes != null) {
      layer.bindPopup(`${name}: ${numNodes} nodes`);
    } else {
      layer.bindPopup(`${name}: No data`);
    }
  };
  return (
    <div>
      <MapContainer
        style={{ height: smallGraph ? '30vh' : '70vh' }}
        zoom={smallGraph ? 1 : 2}
        zoomControl={!smallGraph}
        doubleClickZoom={!smallGraph}
        zoomSnap={!smallGraph}
        zoomDelta={!smallGraph}
        trackResize={!smallGraph}
        scrollWheelZoom={!smallGraph}
        touchZoom={!smallGraph}
        attributionControl={false}
        dragging={!smallGraph}
        center={smallGraph ? [15, 0] : [40, 0]}
      >
        <GeoJSON
          style={mapStyle}
          data={sortedData}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
    </div>
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
