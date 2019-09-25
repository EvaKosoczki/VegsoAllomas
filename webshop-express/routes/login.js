const express = require('express');
const router = express.Router();
const DB = require('../modules/db');

const db = new DB();


//GET login page:
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Express' });
});

// Generating token:
const getToken = (l = 20) => {
  let result = '';
  for (let i = 0; i < l; i++) {
    const index = Math.round(Math.random() * 50 + 65);
    result += String.fromCharCode(index);
  }
  return result;
};

//Update database with the new token:
const setUserToken = async function (id, token) {
  const result = await db.update({
    table: 'users',
    set: { cookie: token },
    where: { userId: id }
  })
  return result;
};

//Redirection in case of successful login:
router.post('/', async (req, res, next) => {
  const result = await db.get({
    select: '*',
    from: 'users',
    where: { email: `${req.body.email}`, relation: 'and', password: `${req.body.password}` }
  })
  if (result.length === 1) {
    const token = getToken();
    res.cookie('uuid', token);
    await setUserToken(result[0].userId, token);
    return res.redirect('/products');
  }
  res.render('login', { title: 'Express' });
});

//Checking if user is logged in or not:
const checkLogin = async (req) => {
  if (!req.cookies.uuid) {
    return false;
  }
  const result = await db.get({
    select: '*',
    from: 'users',
    where: { cookie: `${req.cookies.uuid}` }
  })
  return result;
};


module.exports = router;
