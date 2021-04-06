const express = require('express');

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
router.get('/owner-control', async (_req, res, next) => {
  try {
    res.json({
      data: [
        {
          id: 'owner',
          label: 'owner',
          value: 1814499,
        },
        {
          id: 'total',
          label: 'total',
          value: 18673250,
        },
      ],
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
