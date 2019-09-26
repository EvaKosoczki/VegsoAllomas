const express = require('express');

const router = express.Router();

const DB = require('../modules/db');

const db = new DB();

const regexPattern = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('register', {
    regexPattern: regexPattern
  });
});


router.post('/', async (req, res, next) => {
  req.body.password= `SHA1('${req.body.password}')`;
  const newUser = await db.create({
    table: 'users',
    values: req.body,
  })
  res.redirect('/login')
  res.json(newUser);
});

module.exports = router;