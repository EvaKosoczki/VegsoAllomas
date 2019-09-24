const express = require('express');

const router = express.Router();


router.get('/', async (req, res, next) => {
  res.render('basket', { title: 'My basket', basket: 'Basket Summary' });
});

module.exports = router;
