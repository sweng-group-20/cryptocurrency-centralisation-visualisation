import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import ResponsiveLineCanvas from '../components/ResponsiveLineCanvas';

const GraphPage = () => {
  const [ethereum, setEthereum] = useState([]);
  const [bitcoin, setBitcoin] = useState([]);

  useEffect(() => {
    (async () => {
      const bitcoinResp = await fetch(
        'http://localhost:4000/api/v1/bitcoin/operational/storage-constraint',
        { method: 'GET' }
      );
      const bitcoinJson = await bitcoinResp.json();
      const { data: bitcoinData } = bitcoinJson;
      setBitcoin(bitcoinData);

      const ethereumResp = await fetch(
        'http://localhost:4000/api/v1/ethereum/operational/storage-constraint',
        { method: 'GET' }
      );
      const ethereumJson = await ethereumResp.json();
      const { data: ethereumData } = ethereumJson;
      setEthereum(ethereumData);
    })();
  }, [setBitcoin, setEthereum]);

  return (
    <div>
      <div className={classnames('w-screen', 'h-screen')}>
        <ResponsiveLineCanvas
          data={ethereum}
          xAxisLabel="Time"
          yAxisLabel="Ratio of Growth"
        />
      </div>
      <div className={classnames('w-screen', 'h-screen')}>
        <ResponsiveLineCanvas
          data={bitcoin}
          xAxisLabel="Time"
          yAxisLabel="Ratio of Growth"
        />
      </div>
    </div>
  );
};

export default GraphPage;
