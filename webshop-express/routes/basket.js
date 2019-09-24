const express = require('express');

const router = express.Router();


router.get('/', async (req, res, next) => {
  res.render('basket', { title: 'My basket' });
});

module.exports = router;
