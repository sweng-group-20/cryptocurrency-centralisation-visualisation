const express = require('express');

const { getSatoshiIndex } = require('../../graph_data/satoshi_index');

const router = express.Router();

/**
 * @openapi
 *
 * /bitcoin/application:
 *   get:
 *     description: Basic message for bitcoin application layer endpoint
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
 *                   enum: ['application layer endpoint']
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'application layer endpoint',
  });
});

/**
 * @openapi
 *
 * /bitcoin/application/reference-client-concentration:
 *   get:
 *     description: Returns plot points for the reference client concentration factor in the application layer for Bitcoin - TEST EXECUTION MAY BE SLOW
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
 *                       data:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             x:
 *                               type: string
 *                               format: date
 *                             y:
 *                               type: number
 */
router.get('/reference-client-concentration', async (_req, res, next) => {
  try {
    const satoshiIndex = await getSatoshiIndex('bitcoin', 'bitcoin');
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
  } catch (err) {
    next(err);
  }
});

module.exports = router;
