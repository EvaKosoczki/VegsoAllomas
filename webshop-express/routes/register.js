const express = require('express');
const router = express.Router();
const DB = require('../modules/db');
const db = new DB();
let isHidden = true;

const {
  userValidationRules,
  validate
} = require('./../modules/validator.js')

const regexPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$"
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('register', {
    regexPattern: regexPattern,
    isHidden: isHidden
  });
});


router.post('/', userValidationRules(), validate, async (req, res, next) => {
  req.body.password = `SHA1('${req.body.password}')`;
  req.body.passwordagain = `SHA1('${req.body.passwordagain}')`;
  const newUser = await db.create({
    table: 'users',
    values: req.body,
  })
  res.redirect('/login')
  res.json(newUser);
});

module.exports = router;