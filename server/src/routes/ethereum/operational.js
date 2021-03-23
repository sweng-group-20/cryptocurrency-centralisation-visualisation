const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * Default response
 * @swagger
 * /api/v1/bitcoin/operational/:
 *  get:
 *      description: Basic message for Ethereum operational endpoint
 *      responses:
 *          200:
 *              description: Successful response
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'operational layer endpoint',
  });
});

/**
 * @swagger
 * /api/v1/ethereum/operational/storage-constraint:
 *  get:
 *      description: Returns plot points for the storage constraint factor in the operational layer for Ethereum - TEST EXECUTION MAY BE SLOW
 *      responses:
 *          200:
 *              description: Successful response
 */

router.get('/storage-constraint', async (_req, res) => {
  const resp = await fetch(
    'https://api.blockchair.com/ethereum/blocks?a=date,sum(size)',
    {
      method: 'GET',
    }
  );

  const respText = await resp.json();
  const points = respText.data;
  const compareInterval = 14;
  const calculatePlotPoints = ({ date, 'sum(size)': blockChainSize }, index, array) => {
    if (index < compareInterval) {
      return {};
    }
    return {
      x: date,
      y: blockChainSize / array[index - compareInterval]['sum(size)'],
    };
  };

  const ethereumPlotPoints = points
    .map(calculatePlotPoints)
    .slice(compareInterval);

  res.status(200);
  res.json({
    data: [
      {
        id: 'Ethereum',
        data: EthereumPlotPoints,
      },
    ],
  });
});

module.exports = router;
