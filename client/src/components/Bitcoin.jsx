import React, { useState, useEffect, useMemo } from 'react';

import CryptocurrencyData from './CryptocurrencyData';
import './Bitcoin.css';
import '../App.css';

// 6 props: 1 for each Graph layer thingy
// ^^ use useState() 6 times

// 1: on website load do something
// 2: fetch data (once only)
// 3: pass data to graphs

function Bitcoin() {
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
          'http://localhost:4000/api/v1/bitcoin/application/reference-client-concentration',
        setData: setApplicationData,
      },
      {
        url:
          'http://localhost:4000/api/v1/bitcoin/operational/storage-constraint',
        setData: setOperationalData,
      },
      // {
      //   url: '',
      //   setData: setIncentiveData,
      // },
      {
        url: 'http://localhost:4000/api/v1/bitcoin/consensus/data',
        setData: setConsensusData,
      },
      {
        url:
          'http://localhost:4000/api/v1/bitcoin/network/geographical-distribution',
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

export default Bitcoin;
