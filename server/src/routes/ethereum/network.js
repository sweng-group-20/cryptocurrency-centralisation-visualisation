const express = require('express');
const cheerio = require('cheerio');
const request = require('request');

const countryDict = require('./CountryCodes.json');

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
    const data = [];
    request('https://www.ethernodes.org/countries', (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(body);
        $('li').each((_, elem) => {
          const countryName = $(elem).find('a').text();
          const nodes = $(elem).find('span').eq(1).text().split(' ');
          if (countryDict[countryName]) {
            data.push({
              id: countryDict[countryName],
              value: nodes[0],
            });
          }
        });
        res.status(200);
        res.json({
          data,
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
