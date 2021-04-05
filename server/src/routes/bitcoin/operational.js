const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * @openapi
 *
 * /bitcoin/operational:
 *   get:
 *     description: Basic message for bitcoin operational layer endpoint
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
 * /bitcoin/operational/storage-constraint:
 *   get:
 *     description: Returns plot points for the storage constraint factor in the operational layer for Bitcoin - TEST EXECUTION MAY BE SLOW
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
router.get('/storage-constraint', async (_req, res, next) => {
  try {
    const resp = await fetch(
      'https://api.blockchair.com/bitcoin/blocks?a=date,sum(size)',
      { method: 'GET' }
    );
    const respJSON = await resp.json();
    const respData = respJSON.data;
    const compareInterval = 14; // days
    const data = [{ id: 'Bitcoin', data: [] }];
    for (let i = compareInterval; i < respData.length; i += 1) {
      const sizeNow = respData[i]['sum(size)'];
      const sizeBefore = respData[i - compareInterval]['sum(size)'];
      data[0].data.push({
        x: respData[i].date,
        y: sizeNow / sizeBefore,
      });
    }
    res.status(200);
    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
