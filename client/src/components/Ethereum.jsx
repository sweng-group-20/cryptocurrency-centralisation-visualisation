import React, { useState, useEffect, useMemo } from 'react';
import CryptocurrencyData from './CryptocurrencyData';
import '../App.css';

function Ethereum() {
  const [applicationData, setApplicationData] = useState([]);
  const [operationalData, setOperationalData] = useState([]);
  // const [incentiveData, setIncentiveData] = useState([]);
  const [consensusData, setConsensusData] = useState([]);
  const [networkData, setNetworkData] = useState([]);
  // const [governanceData, setGovernanceData] = useState([]);

  const apiDataUrls = useMemo(
    () => [
      {
        url:
          'http://localhost:4000/api/v1/ethereum/application/reference-client-concentration',
        setData: setApplicationData,
      },
      {
        url:
          'http://localhost:4000/api/v1/ethereum/operational/storage-constraint',
        setData: setOperationalData,
      },
      // {
      //   url: '',
      //   setData: setIncentiveData,
      // },
      {
        url: 'http://localhost:4000/api/v1/ethereum/consensus/data',
        setData: setConsensusData,
      },
      {
        url:
          'http://localhost:4000/api/v1/ethereum/network/geographical-distribution',
        setData: setNetworkData,
      },
      // {
      //   url: '',
      //   setData: setGovernanceData,
      // },
    ],
    []
  );

  const fetchAPIData = async (url, setData) => {
    const data = await fetch(url, { method: 'GET' });
    const dataJson = await data.json();
    setData(dataJson.data);
  };

  useEffect(() => {
    const dataSets = apiDataUrls.map(async ({ url, setData }) =>
      fetchAPIData(url, setData)
    );
    Promise.all(dataSets); // fetch data at same time
  }, [apiDataUrls]);

  return (
    <div className="graph-content-container">
      {/* pass in data as a prop to CryptocurrencyData component */}
      <CryptocurrencyData
        applicationData={applicationData}
        operationalData={operationalData}
        // incentiveData={incentiveData}
        consensusData={consensusData}
        networkData={networkData}
        // governanceData={governanceData}
      />
    </div>
  );
}

export default Ethereum;
