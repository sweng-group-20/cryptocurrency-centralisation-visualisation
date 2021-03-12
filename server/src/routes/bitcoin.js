const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * Default response
 */
router.get('/', async (_req, res) => {
  const resp = await fetch(
    'https://charts.bitcoin.com/btc/api/chart/blockchain-size',
    { method: 'GET' }
  );
  const respJSON = await resp.json();
  const compareInterval = 14; // days
  const data = [{ id: 'Storage Constraint Rate Of Grwoth', data: [] }];
  for (let i = compareInterval; i < respJSON.length; i += 1) {
    const millis = 1000 * respJSON[i][0];
    const sizeNow = parseInt(respJSON[i][1], 10);
    const sizeBefore = parseInt(respJSON[i - compareInterval][1], 10);
    data[0].data.push({ x: new Date(millis), y: sizeNow / sizeBefore });
  }
  res.status(200);
  res.json({
    message: data,
  });
});

module.exports = router;
