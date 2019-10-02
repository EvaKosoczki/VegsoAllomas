const express = require('express');
const router = express.Router();
const db = require('../modules/db');

/* GET home page. */
router.get('/', async (req, res, next) => {
  
  res.render('how-to-choose', {
    user: req.user,
    counter: req.body.counter,
  });
});

module.exports = router;