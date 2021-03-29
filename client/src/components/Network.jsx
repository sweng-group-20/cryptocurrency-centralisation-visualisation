import React from 'react';
import { useHistory } from 'react-router-dom';
import './Network.css';
import '../index.css';
import ResponsiveChoropleth from './GeoMap';

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
      <ResponsiveChoropleth />
    </div>
  );
}

export default Network;
