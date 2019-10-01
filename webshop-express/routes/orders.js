const express = require('express');

const router = express.Router();

const db = require('./../modules/db');
isHidden = true;

//get all basket item and details
router.get('/', async (req, res, next) => {
  const ordersByCust = await db.get({
    select: {
      'OrderId': 'OrderId'
    },
    from: 'orders',
    join: {
      join: 'inner',
      table: 'users',
      'orders.userId': 'users.userId'
    },
  });
  console.log(ordersByCust)
  let Orders = []
  for (let i = 0; i < ordersByCust.length; i += 1) {
    let orderDetails = await db.get({
      select: '*',
      from: 'orders',
      where: {
        userId: `${req.user.userId}`,
        relation: 'and',
        OrderId: ordersByCust[i].OrderId
      },
      join: {
        join: 'inner',
        table: '`order-details`',
        'orders.orderId': '`order-details`.order',
        join1: 'inner',
        table1: '`snowboards`',
        'snowboards.ID': '`order-details`.snowboardId'
      },
    });
    Orders.push(orderDetails);
  }
  console.log(Orders)




  function totalPriceCounter(array) {
    let orderTotalPrice = 0;
    orderTotalPrice = array.map(item => item.price * item.quantity)
      .reduce((a, b) => {
        return a + b
      }, 0)
    return orderTotalPrice;
  }

  res.render('orders', {
    title: 'My orders',
    basket: 'Basket Summary',
    orderTotalPrice: totalPriceCounter(Orders),
    Orders: Orders,
    user: req.user,
    counter: req.body.counter,
    ordersByCust: ordersByCust,
  });

});
module.exports = router;