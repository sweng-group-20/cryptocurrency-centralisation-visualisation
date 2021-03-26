const express = require('express');

const { getSatoshiIndex } = require('../../graph_data/satoshi_index');

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

router.get('/reference-client-concentration', async (_req, res, next) => {
  try {
    const satoshiIndex = await getSatoshiIndex('ethereum', 'go-ethereum');
    const satoshiIndexPlotPoints = Object.entries(
      satoshiIndex
    ).map(([date, index]) => ({ x: date, y: index }));

    res.status(200);
    res.json({
      data: [
        {
          id: 'Ethereum',
          data: satoshiIndexPlotPoints,
        },
      ],
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
