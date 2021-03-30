const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const router = express.Router();

/**
 * @openapi
 *
 * /ethereum/consensus:
 *   get:
 *     description: Basic message for ethereum consensus layer endpoint
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
 * /ethereum/consensus/data:
 *   get:
 *     description: Returns pie chart values for the consensus power distribution factor in the consensus layer for Ethereum - TEST EXECUTION MAY BE SLOW
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
router.get('/data', async (_req, res, next) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://miningpoolstats.stream/ethereum');

    const html = await page.content();
    const $ = cheerio.load(html);

    let total = 0;
    let stringTemp = '';

    total = $('#poolshash').text();
    total = total.substring(0, total.length - 5);
    total = parseFloat(total);

    const poolNames = [];
    const poolHashs = [];

    $('#pools')
      .children('tbody')
      .children('tr')
      .each((i, elem) => {
        // new line
        stringTemp = $(elem).children('td').eq(7).text();
        if (stringTemp.length === 0) {
          poolHashs[i] = '';
        } else if (
          stringTemp.substring(0, 1) === '0' ||
          stringTemp.substring(0, 1) === 'A'
        ) {
          return;
        } else if (
          stringTemp.substring(stringTemp.length - 4, stringTemp.length) ===
          'EH/s'
        ) {
          poolHashs[i] = stringTemp.substring(0, stringTemp.length - 5);
        } else if (
          stringTemp.substring(stringTemp.length - 4, stringTemp.length) ===
          'PH/s'
        ) {
          poolHashs[i] = (
            stringTemp.substring(0, stringTemp.length - 5) / 1000
          ).toString();
        } else if (
          stringTemp.substring(stringTemp.length - 4, stringTemp.length) ===
          'TH/s'
        ) {
          poolHashs[i] = (
            stringTemp.substring(0, stringTemp.length - 5) / 1000000
          ).toString();
        } else {
          return;
        }
        poolNames[i] = $(elem)
          .children('td')
          .eq(1)
          .children('div:first')
          .children('b')
          .text();
      });
    await browser.close();

    const pluginArrayArg = [];

    let accum = 0;

    poolNames.forEach((_, i) => {
      const jsonObj = {};
      jsonObj.id = poolNames[i];
      jsonObj.label = poolNames[i];
      jsonObj.value = poolHashs[i];

      accum += poolHashs[i];
      pluginArrayArg.push(jsonObj);
    });

    const leftOver = parseFloat(total) - parseFloat(accum);

    const jsonObj = {};
    jsonObj.id = 'independent';
    jsonObj.label = 'independent';
    jsonObj.value = leftOver.toFixed(2);
    pluginArrayArg.unshift(jsonObj);

    const data = JSON.parse(JSON.stringify(pluginArrayArg));

    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
