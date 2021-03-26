const express = require('express');

const fetch = require('node-fetch');

const router = express.Router();
/**
 * Default response
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'network layer endpoint',
  });
});

router.get('/geographical-distribution', async (_req, res) => {
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
    /*
    {
    id: "AFG",
    value: 336354
    },
    */
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
    res.json({
      data,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
