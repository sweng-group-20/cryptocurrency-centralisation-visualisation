const express = require('express');

const router = express.Router();

/**
 * @openapi
 *
 * /ethereum/governance:
 *   get:
 *     description: Basic message for ethereum governance layer endpoint
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
 *                   enum: ['governance layer endpoint']
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
 * /ethereum/governance/owner-control:
 *   get:
 *     description: |
 *       Returns pie chart values for the owner control factor in the governance layer for Bitcoin - TEST EXECUTION MAY BE SLOW
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
 *                       label:
 *                         type: string
 *                       value:
 *                         type: integer
 */
router.get('/owner-control', async (_req, res, next) => {
  try {
    res.json({
      data: [
        {
          id: 'owner',
          label: 'owner',
          value: 12000000,
        },
        {
          id: 'total',
          label: 'total',
          value: 106514407.78,
        },
      ],
      dataSource: 'https://api.github.com',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
