const express = require('express');
const fetch = require('node-fetch');

const logger = require('../../logger');

const router = express.Router();
/**
 * Default response
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'consensus layer endpoint',
  });
});

router.get('/data', async (_req, res) => {
  try {
    const poolNames = [];
    const poolHashs = [];
    const pluginArrayArg = [];

    const time = await fetch('https://miningpoolstats.stream/data/time');
    const webDataRaw = await fetch(
      `https://data.miningpoolstats.stream/data/ethereum.js?t=${await time.text()}`
    );

    const webData = await webDataRaw.json();
    webData.data.forEach((_, i) => {
      poolNames[i] = webData.data[i].pool_id;
      poolHashs[i] = (webData.data[i].hashrate / 1e15).toFixed(2);

      const jsonObj = {};
      jsonObj.id = poolNames[i];
      jsonObj.label = poolNames[i];
      jsonObj.value = poolHashs[i];
      pluginArrayArg.push(jsonObj);
    });
    pluginArrayArg.sort((a, b) => a.value - b.value);
    const data = JSON.parse(JSON.stringify(pluginArrayArg));
    res.json({
      data,
    });
  } catch (err) {
    logger.error({ err }, 'con fetch network error');
    res.sendStatus(500);
  }
});

module.exports = router;
