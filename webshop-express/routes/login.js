const express = require('express');

const router = express.Router();

const getToken = (l = 20) => {
  let result = '';
  for (let i = 0; i < l; i++) {
    const index = Math.round(Math.random() * 50 + 65);
    result += String.fromCharCode(index);
  }
  return result;
};

/* GET login page. */
router.get('/', async (req, res, next) => {
  res.render('login', { title: 'Login' });
});

module.exports = router;
