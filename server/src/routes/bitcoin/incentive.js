const express = require('express');

const wealthConcentration = require('./wealth_concentration.json');

const router = express.Router();

/**
 * @openapi
 *
 * /bitcoin/incentive:
 *   get:
 *     description: Basic message for bitcoin incentive layer endpoint
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
 *                   enum: ['incentive layer endpoint']
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'incentive layer endpoint',
  });
});

/**
 * @openapi
 *
 * /bitcoin/incentive/wealth-concentration:
 *   get:
 *     description: |
 *       Returns plot points for the wealth concentration factor in the incentive layer for Bitcoin - TEST EXECUTION MAY BE SLOW
 *
 *       Attribution: Google BigQuery
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
router.get('/wealth-concentration', async (_req, res) => {
  const data = wealthConcentration.map(({ date, gini }) => ({
    x: date,
    y: parseFloat(gini),
  }));
  data.sort((a, b) => new Date(a.x) - new Date(b.x));

  res.status(200);
  res.json({
    data: [
      {
        id: 'Bitcoin',
        data,
      },
    ],
    dataSource: 'Google BigQuery',
  });
});

module.exports = router;
