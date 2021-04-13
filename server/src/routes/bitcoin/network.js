const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * @openapi
 *
 * /bitcoin/network:
 *   get:
 *     description: Basic message for ethereum network layer endpoint
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
 *                   enum: ['network layer endpoint']
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'network layer endpoint',
  });
});

/**
 * @openapi
 *
 * /bitcoin/network/geographical-distribution:
 *   get:
 *     description: |
 *       Returns values for the geographic distribuion factor in the network layer for Bitcoin - TEST EXECUTION MAY BE SLOW
 *
 *       Attribution: https://bitnodes.io
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
 *                       value:
 *                         type: integer
 *                 data_source:
 *                   type: string
 */
router.get('/geographical-distribution', async (_req, res, next) => {
  try {
    const resp = await fetch('https://bitnodes.io/api/v1/snapshots/latest/', {
      method: 'GET',
    });
    const countryDict = await (
      await fetch('http://country.io/iso3.json', {
        method: 'GET',
      })
    ).json();
    const respJSON = await resp.json();
    const data = [];
    const nodeKeys = Object.keys(respJSON.nodes);
    let i;
    let j;

    // Searching through JSON response, for each node with a matching country code (CC), increment value for that CC

    for (i = 0; i < nodeKeys.length; i += 1) {
      const node = respJSON.nodes[nodeKeys[i]];
      if (node[7] !== null && node[7] !== 'null') {
        let found = false;
        const countryCode = node[7];
        for (j = 0; j < data.length; j += 1) {
          if (data[j].id === countryDict[countryCode]) {
            data[j].value += 1;
            found = true;
            break;
          }
        }
        // If CC not found, add new CC to data & set value to 1

        if (!found) {
          data.push({
            id: countryDict[countryCode],
            value: 1,
          });
        }
      }
    }
    res.status(200);
    res.json({
      data,
      data_source: 'https://bitnodes.io',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
