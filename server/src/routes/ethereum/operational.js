const express = require('express');
const fetch = require('node-fetch');
const neatCsv = require('neat-csv');

const router = express.Router();

/**
 * Default response
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'operational layer endpoint',
  });
});

router.get('/storage-constraint', async (_req, res) => {
  const resp = await fetch(
    'https://etherscan.io/chartsync/chaindefault?output=csv',
    {
      method: 'GET',
    }
  );
  const respText = await resp.text();
  const respCsv = await neatCsv(respText);
  const mid = Math.floor(respCsv.length / 2);
  const gethBlockchainSizes = respCsv.slice(0, mid);
  const openEthereumBlockchainSizes = respCsv.slice(mid + 1, respCsv.length);

  const compareInterval = 14;
  const calculatePlotPoints = (
    { UnixTimeStamp: unixTimeStamp, Value: value },
    index,
    array
  ) => {
    if (index < compareInterval) {
      return {};
    }
    const x = new Date(unixTimeStamp * 1000).toISOString().split('T')[0];
    const y = value / array[index - compareInterval].Value;
    return { x, y };
  };

  const gethPlotPoints = gethBlockchainSizes
    .map(calculatePlotPoints)
    .slice(compareInterval);
  const openEthereumPlotPoints = openEthereumBlockchainSizes
    .map(calculatePlotPoints)
    .slice(compareInterval);

  res.status(200);
  res.json({
    data: [
      {
        id: 'GETH',
        data: gethPlotPoints,
      },
      {
        id: 'OpenEthereum',
        data: openEthereumPlotPoints,
      },
    ],
  });
});

module.exports = router;
