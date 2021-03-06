const express = require('express');
const fetch = require('node-fetch');

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
    'https://charts.bitcoin.com/btc/api/chart/blockchain-size',
    { method: 'GET' }
  );
  const respJSON = await resp.json();
  const compareInterval = 14; // days
  const data = [{ id: 'Bitcoin', data: [] }];
  for (let i = compareInterval; i < respJSON.length; i += 1) {
    const millis = 1000 * respJSON[i][0];
    const sizeNow = parseInt(respJSON[i][1], 10);
    const sizeBefore = parseInt(respJSON[i - compareInterval][1], 10);
    data[0].data.push({
      x: new Date(millis).toISOString().split('T')[0],
      y: sizeNow / sizeBefore,
    });
  }
  res.status(200);
  res.json({
    data,
  });
});

module.exports = router;
