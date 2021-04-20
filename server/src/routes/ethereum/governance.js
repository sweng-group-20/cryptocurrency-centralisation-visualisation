const express = require('express');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

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
 *                 data_source:
 *                   type: string
 */
router.get('/owner-control', async (_req, res, next) => {
  try {
    const resp = await fetch('https://eips.ethereum.org/all', {
      method: 'GET',
    });
    const body = await resp.text();
    const $ = cheerio.load(body);

    const tempData = new Map();
    $('.eiptable')
      .eq(1)
      .find('tbody')
      .find('tr')
      .each((_, elem) => {
        const str = $(elem).find('.author').text();
        const chars = str.split(', ');
        chars.forEach((element) => {
          if (tempData.has(element)) {
            const temp = tempData.get(element);
            tempData.set(element, { value: temp.value + 1 });
          } else {
            tempData.set(element, { value: 1 });
          }
          return element;
        });
      });
    const data = [];
    tempData.forEach((k, v) => {
      const jsonObj = {};
      jsonObj.id = k;
      jsonObj.label = k;
      jsonObj.value = v.value;
      data.push(jsonObj);
    });
    data.sort((a, b) => a.value - b.value);
    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
