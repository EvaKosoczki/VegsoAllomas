const express = require('express');
const router = express.Router();
const DB = require('../modules/db');
const UserDB = require('../modules/user');

const db = new DB();
const userDb = new UserDB();
const app = express();

//GET login page:
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Express' });
});

// Generating token:
const getToken = (l = 20) => {
  let result = '';
  for (let i = 0; i < l; i++) {
    const index = Math.round(Math.random() * 25 + 65);
    result += String.fromCharCode(index);
  }
  return result;
};

//Redirection in case of successful login:
router.post('/', async (req, res, next) => {
  const result = await db.get({
    select: '*',
    from: 'users',
    where: { email: `${req.body.email}`, relation: 'and', password: `SHA1('${req.body.password}')` }
  })
  if (result.length === 1) {
    const token = getToken();
    res.cookie('uuid', token);
    await userDb.setUserToken(result[0].userId, token);
    return res.redirect('/products');
  }
  res.render('login', { title: 'Express' });
});

module.exports = router;
