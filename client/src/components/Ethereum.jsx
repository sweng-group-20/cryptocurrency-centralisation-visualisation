import React from 'react';

import CryptocurrencyData from './CryptocurrencyData';
import useFetch from './hooks/useFetch';
import '../App.css';

function Ethereum() {
  const fetchOptions = { method: 'GET' };
  const apiHost = process.env.REACT_APP_API_HOST;
  const { data: applicationLayer, loading: applicationLoading } = useFetch(
    `${apiHost}/api/v1/ethereum/application/reference-client-concentration`,
    fetchOptions,
    []
  );
  const { data: operationalLayer, loading: operationalLoading } = useFetch(
    `${apiHost}/api/v1/ethereum/operational/storage-constraint`,
    fetchOptions,
    []
  );
  const { data: incentiveLayer, loading: incentiveLoading } = useFetch(
    `${apiHost}/api/v1/ethereum/incentive/wealth-concentration`,
    fetchOptions,
    []
  );
  const { data: consensusLayer, loading: consensusLoading } = useFetch(
    `${apiHost}/api/v1/ethereum/consensus/power-distribution`,
    fetchOptions,
    []
  );
  const { data: networkLayer, loading: networkLoading } = useFetch(
    `${apiHost}/api/v1/ethereum/network/geographical-distribution`,
    fetchOptions,
    []
  );
  const { data: governanceLayer, loading: governanceLoading } = useFetch(
    `${apiHost}/api/v1/ethereum/governance/owner-control`,
    fetchOptions,
    []
  );

  return (
    <div className="graph-content-container">
      {/* pass in data as a prop to CryptocurrencyData component */}
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

export default Ethereum;
