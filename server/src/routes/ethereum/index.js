const express = require('express');

const application = require('./application');
const operational = require('./operational');
const consensus = require('./consensus');

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
router.use('/consensus', consensus);

module.exports = router;
