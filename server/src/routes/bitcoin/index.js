const express = require('express');

const operational = require('./operational');

const router = express.Router();

/**
 * Default response
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'bitcoin endpoint',
  });
});

router.use('/operational', operational);

module.exports = router;
