import React from 'react';

import CryptocurrencyData from './CryptocurrencyData';
import useFetch from './hooks/useFetch';
import './Bitcoin.css';
import '../App.css';

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
    'http://localhost:4000/api/v1/bitcoin/consensus/power-distribution',
    fetchOptions,
    []
  );
  const { data: networkLayer, loading: networkLoading } = useFetch(
    'http://localhost:4000/api/v1/bitcoin/network/geographical-distribution',
    fetchOptions,
    []
  );
  const { data: governanceLayer, loading: governanceLoading } = useFetch(
    'http://localhost:4000/api/v1/bitcoin/governance/owner-control',
    fetchOptions,
    []
  );

  return (
    <div className="graph-content-container">
      <CryptocurrencyData
        applicationData={applicationLayer}
        operationalData={operationalLayer}
        incentiveData={incentiveLayer}
        consensusData={consensusLayer}
        networkData={networkLayer}
        governanceData={governanceLayer}
        applicationLoading={applicationLoading}
        operationalLoading={operationalLoading}
        incentiveLoading={incentiveLoading}
        consensusLoading={consensusLoading}
        networkLoading={networkLoading}
        governanceLoading={governanceLoading}
      />
    </div>
  );
}

export default Bitcoin;
