const express = require('express');

const calculateSatoshiIndex = require('../../graph_data/satoshi_index');

const router = express.Router();

/**
 * Default response
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'application layer endpoint',
  });
});

router.get('/reference-client-concentration', async (_req, res) => {
  const satoshiIndex = await calculateSatoshiIndex('bitcoin', 'bitcoin');
  const satoshiIndexPlotPoints = Object.entries(
    satoshiIndex
  ).map(([date, index]) => ({ x: date, y: index }));

  res.status(200);
  res.json({
    data: [
      {
        id: 'Bitcoin',
        data: satoshiIndexPlotPoints,
      },
    ],
  });
});

module.exports = router;
