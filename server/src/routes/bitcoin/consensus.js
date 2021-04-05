const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * @openapi
 *
 * /bitcoin/consensus:
 *   get:
 *     description: Basic message for bitcoin consensus layer endpoint
 *     tags:
 *       - bitcoin
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   enum: ['consensus layer endpoint']
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'consensus layer endpoint',
  });
});

/**
 * @openapi
 *
 * /bitcoin/consensus/data:
 *   get:
 *     description: Returns pie chart values for the consensus power distribution factor in the consensus layer for Bitcoin - TEST EXECUTION MAY BE SLOW
 *     tags:
 *       - bitcoin
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       label:
 *                         type: string
 *                       value:
 *                         type: integer
 */
router.get('/data', async (_req, res, next) => {
  try {
    const data = [];

    const time = await fetch('https://miningpoolstats.stream/data/time');
    const webDataRaw = await fetch(
      `https://data.miningpoolstats.stream/data/bitcoin.js?t=${await time.text()}`
    );

    const webData = await webDataRaw.json();
    const set = new Set();
    webData.data.forEach((_, i) => {
      const poolName = webData.data[i].pool_id;
      const poolHash = (webData.data[i].hashrate / 1e15).toFixed(2);

      const jsonObj = {};
      jsonObj.id = poolName;
      jsonObj.label = poolName;
      jsonObj.value = parseFloat(poolHash);
      if (poolName && !set.has(poolName)) {
        data.push(jsonObj);
      }
      set.add(poolName);
    });
    data.sort((a, b) => a.value - b.value);
    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
