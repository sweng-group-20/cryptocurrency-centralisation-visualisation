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
      <div className="section-about">
        The network layer acts as the information dissemination mechanism for
        the blockchain instance. As the decentralizednetwork cannot have
        centralized nodes that act as relay points to transmit messages between
        the participants, thenetwork is largely a peer-to-peer system. The
        network layer acts as the information dissemination mechanism for
        theblockchain instance. As the decentralized network cannot have
        centralized nodes that act as relay points to transmitmessages between
        the participants, the network is largely a peer-to-peer system.
      </div>
    </div>
  );
}

Network.propTypes = { data: geoMapDataType };
Network.defaultProps = { data: [] };

export default Network;
