const express = require('express');
const bitcoin = require('./bitcoin');
const ethereum = require('./ethereum');

const router = express.Router();

/**
 * Add endpoints
 */
router.use('/bitcoin', bitcoin);
router.use('/ethereum', ethereum);

module.exports = router;
