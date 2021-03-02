const express = require('express');

const router = express.Router();

/**
 * Default response
 */
router.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'etherium endpoint',
  });
});

module.exports = router;
