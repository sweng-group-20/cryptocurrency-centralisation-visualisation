import React from 'react';

import CryptocurrencyData from './CryptocurrencyData';
import useFetch from './hooks/useFetch';
import '../App.css';

function Ethereum() {
  const fetchOptions = { method: 'GET' };
  const { data: applicationLayer } = useFetch(
    'http://localhost:4000/api/v1/ethereum/application/reference-client-concentration',
    fetchOptions,
    []
  );
  const { data: operationalLayer } = useFetch(
    'http://localhost:4000/api/v1/ethereum/operational/storage-constraint',
    fetchOptions,
    []
  );
  // const { data: incentiveLayer } = useFetch('', fetchOptions, []);
  const { data: consensusLayer } = useFetch(
    'http://localhost:4000/api/v1/ethereum/consensus/data',
    fetchOptions,
    []
  );
  const { data: networkLayer } = useFetch(
    'http://localhost:4000/api/v1/ethereum/network/geographical-distribution',
    fetchOptions,
    []
  );
  // const { data: governanceLayer } = useFetch('', fetchOptions, []);
  // const [governanceData, setGovernanceData] = useState([]);

  return (
    <div className="graph-content-container">
      {/* pass in data as a prop to CryptocurrencyData component */}
      <CryptocurrencyData
        applicationData={applicationLayer.data}
        operationalData={operationalLayer.data}
        // incentiveData={incentiveData}
        consensusData={consensusLayer.data}
        networkData={networkLayer.data}
        // governanceData={governanceData}
      />
    </div>
  );
}

export default Ethereum;
