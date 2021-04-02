import React, { useState, useEffect, useMemo } from 'react';

import CryptocurrencyData from './CryptocurrencyData';
import './Bitcoin.css';
import '../App.css';
// import GraphPage from '../Pages/GraphPage';

// 6 props: 1 for each Graph layer thingy
// ^^ use useState() 6 times

// 1: on website load do something
// 2: fetch data (once only)
// 3: pass data to graphs

function Bitcoin() {
  // const [data, setData] = useState([]);
  // const [applicationData, setApplicationData] = useState([]);
  const [consensusData, setConsensusData] = useState([]);
  // const [governanceData, setGovernanceData] = useState([]);
  // const [incentiveData, setIncentiveData] = useState([]);
  const [networkData, setNetworkData] = useState([]);
  const [operationalData, setOperationalData] = useState([]);

  const apiDataUrls = useMemo(
    () => [
      // {
      //   url:
      //     'http://localhost:4000/api/v1/bitcoin/application/reference-client-concentration',
      //   setData: setApplicationData,
      // },
      {
        url: 'http://localhost:4000/api/v1/bitcoin/consensus/data',
        setData: setConsensusData,
      },
      // {
      //   url: '',
      //   setData: setGovernanceData,
      // },
      // {
      //   url: '',
      //   setData: setIncentiveData,
      // },
      {
        url:
          'http://localhost:4000/api/v1/bitcoin/network/geographical-distribution',
        setData: setNetworkData,
      },
      {
        url:
          'http://localhost:4000/api/v1/bitcoin/operational/storage-constraint',
        setData: setOperationalData,
      },
    ],
    []
  );

  const fetchAPIData = async (url, setData) => {
    console.log(url, setData);
    const data = await fetch(url, { method: 'GET' });
    const dataJson = await data.json();
    setData(dataJson);
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
        // applicationData={applicationData}
        consensusData={consensusData}
        // governanceData={governanceData}
        // incentiveData={incentiveData}
        networkData={networkData}
        operationalData={operationalData}
      />
    </div>
  );
}

export default Bitcoin;
