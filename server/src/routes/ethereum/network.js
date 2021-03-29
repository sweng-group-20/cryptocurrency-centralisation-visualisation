const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const countryDict = require('./CountryCodes.json');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'network layer endpoint',
  });
});

router.get('/geographical-distribution', async (_req, res) => {
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
        console.log(data);
        res.status(200);
        res.json({
          data,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
