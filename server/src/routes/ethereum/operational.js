const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * @openapi
 *
 * /ethereum/operational:
 *   get:
 *     description: Basic message for ethereum operational layer endpoint
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
 *                   enum: ['operational layer endpoint']
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'operational layer endpoint',
  });
});

/**
 * @openapi
 *
 * /ethereum/operational/storage-constraint:
 *   get:
 *     description: |
 *       Returns plot points for the storage constraint factor in the operational layer for Ethereum - TEST EXECUTION MAY BE SLOW
 *
 *       Attribution: https://blockchair.com
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
router.get('/storage-constraint', async (_req, res, next) => {
  try {
    const resp = await fetch(
      'https://api.blockchair.com/ethereum/blocks?a=date,sum(size)',
      { method: 'GET' }
    );

    const respText = await resp.json();
    const points = respText.data;
    const compareInterval = 14;
    const calculatePlotPoints = (
      { date, 'sum(size)': blockChainSize },
      index,
      array
    ) => {
      if (index < compareInterval) {
        return {};
      }
      return {
        x: date,
        y: blockChainSize / array[index - compareInterval]['sum(size)'],
      };
    };

    const ethereumPlotPoints = points
      .map(calculatePlotPoints)
      .slice(compareInterval);

    res.status(200);
    res.json({
      data: [
        {
          id: 'Ethereum',
          data: ethereumPlotPoints,
        },
      ],
      dataSource: 'https://blockchair.com',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
