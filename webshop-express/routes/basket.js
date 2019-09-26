const express = require('express');

const router = express.Router();

const DB = require('./../modules/db');
const db = new DB();


router.get('/', async (req, res, next) => {
  res.render('basket', {
    title: 'My basket',
    basket: 'Basket Summary',
    user: req.user,
    counter:req.body.counter
  });
});

router.post('/', async (req, res, next) => {

  const basket = await db.get({
    select: {
      'basketId': 'basket'
    },
    from: 'users',
    join: {
      join: 'inner',
      table: 'baskets',
      'userId': 'user'
    },
    where: {
      'user': req.user.userId
    }
  })

  req.body.basket = basket[0].basket;
  delete req.body.user;
  delete req.body.counter;
  console.log(basket);
  const productDetails = await db.create({
    table: '`basket-details`',
    values: req.body,
  })
  const count = await db.get({
    select: {
      'count(basket)': 'orderItems'
    },
    from: '`basket-details`',
    where: {
      'basket': req.body.basket
    }
  })

  res.json(count[0].orderItems);
})

module.exports = router;