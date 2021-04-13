const express = require('express');

const { getSatoshiIndex } = require('../../graph_data/satoshi_index');

const router = express.Router();

/**
 * @openapi
 *
 * /ethereum/application:
 *   get:
 *     description: Basic message for ethereum application layer endpoint
 *     tags:
 *       - ethereum
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
 * /ethereum/application/reference-client-concentration:
 *   get:
 *     description: |
 *       Returns plot points for the reference client concentration factor in the application layer for Ethereum - TEST EXECUTION MAY BE SLOW
 *
 *       Attribution: https://api.github.com
 *     tags:
 *       - ethereum
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
      dataSource: 'https://api.github.com',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
