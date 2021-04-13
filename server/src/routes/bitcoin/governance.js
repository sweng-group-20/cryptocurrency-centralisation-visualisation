const express = require('express');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * @openapi
 *
 * /bitcoin/governance:
 *   get:
 *     description: Basic message for bitcoin governance layer endpoint
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
 *                   enum: ['governance layer endpoint']
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'governance layer endpoint',
  });
});

/**
 * @openapi
 *
 * /bitcoin/governance/owner-control:
 *   get:
 *     description: Returns pie chart values for the owner control factor in the governance layer for Bitcoin - TEST EXECUTION MAY BE SLOW
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
    const resp = await fetch('https://github.com/bitcoin/bips', {
      method: 'GET',
    });
    const body = await resp.text();
    const $ = cheerio.load(body);

    const tempData = new Map();
    $('tbody')
      .find('tr')
      .each((_, elem) => {
        if ($(elem).find('td').eq(5).text().includes('Final')) {
          const str = $(elem).find('td').eq(3).text();
          let chars = str.split(',');
          chars = chars.map((element) => {
            if (element[0] === ' ') {
              element = element.substring(1);
            }
            element = element.replace(/(\r\n|\n|\r)/gm, '');
            if (tempData.has(element)) {
              const temp = tempData.get(element);
              tempData.set(element, { value: temp.value + 1 });
            } else {
              tempData.set(element, { value: 1 });
            }
            return element;
          });
        }
      });
    const data = [];
    for (const [k, v] of tempData) {
      const jsonObj = {};
      jsonObj.id = k;
      jsonObj.label = k;
      jsonObj.value = v.value;
      data.push(jsonObj);
    }
    data.sort((a, b) => a.value - b.value);
    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
