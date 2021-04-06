import React from 'react';

import CryptocurrencyData from './CryptocurrencyData';
import useFetch from './hooks/useFetch';
import './Bitcoin.css';
import '../App.css';

// 6 props: 1 for each Graph layer thingy
// ^^ use useState() 6 times

// 1: on website load do something
// 2: fetch data (once only)
// 3: pass data to graphs

function Bitcoin() {
  const fetchOptions = { method: 'GET' };
  const { data: applicationLayer, loading: applicationLoading } = useFetch(
    'http://localhost:4000/api/v1/bitcoin/application/reference-client-concentration',
    fetchOptions,
    []
  );
  const { data: operationalLayer, loading: operationalLoading } = useFetch(
    'http://localhost:4000/api/v1/bitcoin/operational/storage-constraint',
    fetchOptions,
    []
  );
  const { data: incentiveLayer, loading: incentiveLoading } = useFetch(
    'http://localhost:4000/api/v1/bitcoin/incentive/wealth-concentration',
    fetchOptions,
    []
  );
  const { data: consensusLayer, loading: consensusLoading } = useFetch(
    'http://localhost:4000/api/v1/bitcoin/consensus/data',
    fetchOptions,
    []
  );
  const { data: networkLayer, loading: networkLoading } = useFetch(
    'http://localhost:4000/api/v1/bitcoin/network/geographical-distribution',
    fetchOptions,
    []
  );
  // const { data: governanceLayer, loading: governanceLoading } = useFetch(
  //   '',
  //   fetchOptions,
  //   []
  // );

  return (
    <div className="graph-content-container">
      {/* pass in data as a prop to CryptocurrencyData component */}
      <CryptocurrencyData
        applicationData={applicationLayer.data}
        operationalData={operationalLayer.data}
        incentiveData={incentiveLayer.data}
        consensusData={consensusLayer.data}
        networkData={networkLayer.data}
        // governanceData={governanceData}
        applicationLoading={applicationLoading}
        operationalLoading={operationalLoading}
        incentiveLoading={incentiveLoading}
        consensusLoading={consensusLoading}
        networkLoading={networkLoading}
        // governanceLoading={governanceLoading}
      />
    </div>
  );
}

export default Bitcoin;
