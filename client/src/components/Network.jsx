import React from 'react';
import { useHistory } from 'react-router-dom';

import ResponsiveChoropleth from './GeoMap';
import { geoMapDataType } from './types';
import './Network.css';
import '../index.css';

function Network({ data }) {
  const history = useHistory();

  return (
    <div className="NetworkGraph">
      <h1>Network Layer</h1>
      <button
        type="button"
        onClick={() => {
          history.goBack();
        }}
      >
        Go back
      </button>
      <div className="map">
        <ResponsiveChoropleth data={data} />
      </div>
    </div>
  );
}

Network.propTypes = { data: geoMapDataType };
Network.defaultProps = { data: [] };

export default Network;
