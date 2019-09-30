const express = require('express');

const router = express.Router();

const db = require('./../modules/db');
let newArray = [];


router.get('/', async (req, res, next) => {
  const basketDetails = await db.get({
    select: '*',
    from: 'baskets',
    where: {
      user: `${req.user.userId}`
    },
    join: {
      join: 'inner',
      table: '`basket-details`',
      'baskets.basketId': '`basket-details`.basket',
      join1: 'inner',
      table1: '`snowboards`',
      'snowboards.ID': '`basket-details`.snowboardId'
    },

  })

  function totalPriceCounter(array) {
    let basketTotalPrice = 0;
    basketTotalPrice = array.map(item => item.price * item.quantity)
      .reduce((a, b) => {
        return a + b
      }, 0)
    return basketTotalPrice;
  }

  function repeatCheck(array) {
    newArray = [];
    let names = [];
    array.map(item => {
      if ((names.indexOf(item.name)) > -1) {
        newArray.map(newitem => {
          if (newitem.name == item.name) {
            newitem.quantity += item.quantity
          }
        })
      } else {
        newArray.push(item);
        names.push(item.name);
      }
    })
    return newArray
  }
  res.render('basket', {
    title: 'My basket',
    basket: 'Basket Summary',
    basketTotalPrice: totalPriceCounter(basketDetails),
    basketDetails: repeatCheck(basketDetails),
    user: req.user,
    counter: req.body.counter
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


router.post('/orders', async (req, res, next) => {
  const newOrder = await db.create({
    table: 'orders',
    values: {
      'userId': `${req.user.userId}`,
    }
  })
  const orderId = await db.get({
    select: {
      'orderId': 'order'
    },
    from: 'orders',
    where: {
      'userId': `${req.user.userId}`,
    }
  })
  let orderDetails = [];
  newArray.map(item => {
    orderDetails.push({
      '`order`': orderId[0].order,
      'snowboardId': item.snowboardId,
      'unitPrice': item.price,
      'quantity': item.quantity
    })
  })
  for (let i = 0; i < orderDetails.length; i += 1) {
    let newOrderDetails = await db.create({
      table: '`order-details`',
      values: orderDetails[i]
    })
  }
  const basketNumber = await db.get({
    select: {
      'basket': 'basket'
    },
    from: 'baskets',
    where: {
      user: `${req.user.userId}`
    },
    join: {
      join: 'inner',
      table: '`basket-details`',
      'baskets.basketId': '`basket-details`.basket',
    }
  })
  console.log("basket: " + basketNumber[0].basket)
  const deleteBasket = await db.del({
    table: '`basket-details`',
    where: {
      basket: basketNumber[0].basket
    }
  })
  res.redirect('/basket')
})

module.exports = router;