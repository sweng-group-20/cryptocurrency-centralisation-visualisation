const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * @swagger
 * /api/v1/bitcoin/operational/:
 *  get:
 *      description: Basic message for bitcoin operational endpoint
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
 * /api/v1/bitcoin/operational/storage-constraint:
 *  get:
 *      description: Returns plot points for the storage constraint factor in the operational layer for Bitcoin - TEST EXECUTION MAY BE SLOW
 *      responses:
 *          200:
 *              description: Successful response
 */
router.get('/storage-constraint', async (_req, res) => {
  const resp = await fetch(
    'https://api.blockchair.com/bitcoin/blocks?a=date,sum(size)',
    { method: 'GET' }
  );
  const respJSON = await resp.json();
  const respData = respJSON.data;
  const compareInterval = 14; // days
  const data = [{ id: 'Bitcoin', data: [] }];
  for (let i = compareInterval; i < respData.length; i += 1) {
    const sizeNow = parseInt(respData[i]['sum(size)'], 10);
    const sizeBefore = parseInt(respData[i - compareInterval]['sum(size)'], 10);
    data[0].data.push({
      x: respData[i].date,
      y: sizeNow / sizeBefore,
    });
  }
  res.status(200);
  res.json({
    data,
  });
});

module.exports = router;
