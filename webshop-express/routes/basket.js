const express = require('express');

const router = express.Router();

const DB = require('./../modules/db');
const db = new DB();


router.get('/', async (req, res, next) => {
  res.render('basket', { title: 'My basket', basket: 'Basket Summary', user: req.user });
});

router.post('/', async (req, res, next) => {
  
  const basket = await db.get({
    select: {'basketId': 'basket'},
    from: 'users',
    join: {
      join: 'inner',
      table: 'baskets',
      'userId': 'user'
    },
    where: {'user' : req.body.user}
  })
  delete req.body.user;
  console.log(basket);
  req.body.basket = basket[0].basket;
  const productDetails = await db.create({
    table: '`basket-details`',
    values: req.body,
  })
})

module.exports = router;
