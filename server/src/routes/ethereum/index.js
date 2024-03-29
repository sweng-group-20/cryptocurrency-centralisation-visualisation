const express = require('express');

const application = require('./application');
const operational = require('./operational');
const incentive = require('./incentive');
const consensus = require('./consensus');
const network = require('./network');
const governance = require('./governance');

const router = express.Router();

/**
 * Default response
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'ethereum endpoint',
  });
});

/**
 * Add routes
 */
router.use('/application', application);
router.use('/operational', operational);
router.use('/incentive', incentive);
router.use('/consensus', consensus);
router.use('/network', network);
router.use('/governance', governance);

module.exports = router;
