const express = require('express');
const jsdoc = require('swagger-jsdoc');
const ui = require('swagger-ui-express');

const router = express.Router();

const options = {
  definition: {
    info: {
      title: 'Querying API',
    },
    servers: ['http://localhost:4000'],
  },
  apis: [
    './src/app.js',
    './src/routes/bitcoin/operational.js',
    './src/routes/bitcoin/application.js',
    './src/routes/ethereum/operational.js',
    './src/routes/ethereum/application.js',
  ],
};

const docs = jsdoc(options);
router.use('/', ui.serve, ui.setup(docs));

module.exports = router;
