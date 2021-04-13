const express = require('express');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const countryDict = require('./country_codes.json');

const router = express.Router();

/**
 * @openapi
 *
 * /ethereum/network:
 *   get:
 *     description: Basic message for ethereum network layer endpoint
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
 * /ethereum/network/geographical-distribution:
 *   get:
 *     description: Returns values for the geographic distribuion factor in the network layer for Ethereum - TEST EXECUTION MAY BE SLOW
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
 *                       value:
 *                         type: integer
 */
router.get('/geographical-distribution', async (_req, res, next) => {
  try {
    const resp = await fetch('https://www.ethernodes.org/countries', {
      method: 'GET',
    });
    const body = await resp.text();

    const data = [];
    if (resp.status === 200) {
      const $ = cheerio.load(body);
      $('li').each((_, elem) => {
        const countryName = $(elem).find('a').text();
        const nodes = $(elem).find('span').eq(1).text().split(' ');
        if (countryDict[countryName]) {
          data.push({
            id: countryDict[countryName],
            value: parseInt(nodes[0], 10),
          });
        }
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
