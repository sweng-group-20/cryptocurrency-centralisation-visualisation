import React from 'react';
import { useHistory } from 'react-router-dom';

import ResponsiveChoropleth from './GeoMap';
import './Network.css';
import '../index.css';

function Network() {
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
        <ResponsiveChoropleth />
      </div>
    </div>
  );
}

export default Network;
