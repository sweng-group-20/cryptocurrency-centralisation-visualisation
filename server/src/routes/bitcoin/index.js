const express = require('express');

const storageConstraint = require('./storage_constraint');

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

router.use('/storage-constraint', storageConstraint);

module.exports = router;
