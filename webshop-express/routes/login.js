const express = require('express');

const router = express.Router();


/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('login', { title: 'Login' });
});

module.exports = router;
