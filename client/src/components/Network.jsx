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
      <div className="section-top">
        <h1 className="section-title">Network Layer</h1>
        <button
          className="back-button"
          type="button"
          onClick={() => {
            history.goBack();
          }}
        >
          <div className="circle">
            <div className="small-circle">
              <div className="x-one" />
              <div className="x-two" />
            </div>
          </div>
        </button>
      </div>
      <div className="map">
        <ResponsiveChoropleth data={data} />
      </div>
    </div>
  );
}

Network.propTypes = { data: geoMapDataType };
Network.defaultProps = { data: [] };

export default Network;
