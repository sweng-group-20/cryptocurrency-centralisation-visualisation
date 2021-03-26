const express = require('express');
const jsdoc = require('swagger-jsdoc');
const ui = require('swagger-ui-express');

const packageJson = require('../../package.json');

const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: packageJson.name,
      description: packageJson.description,
      version: packageJson.version,
    },
    servers: [
      {
        url: 'http://localhost:4000/api/v1',
      },
    ],
  },
  apis: [
    './src/app.js',
    './src/routes/bitcoin/*.js',
    './src/routes/ethereum/*.js',
  ],
};

const docs = jsdoc(options);
router.use('/', ui.serve, ui.setup(docs));

module.exports = router;
