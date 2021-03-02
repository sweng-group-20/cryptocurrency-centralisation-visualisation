const express = require('express');

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

module.exports = router;
