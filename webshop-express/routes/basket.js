const express = require('express');

const router = express.Router();

const db = require('./../modules/db');
let basketDetails = [];
isHidden = true;

//get all basket item and details
router.get('/', async (req, res, next) => {
  basketDetails = await db.get({
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

  res.render('basket', {
    title: 'My basket',
    basket: 'Basket Summary',
    basketTotalPrice: totalPriceCounter(basketDetails),
    basketDetails: basketDetails,
    user: req.user,
    counter: req.body.counter,
    isHidden: isHidden
  });
  isHidden = true;
});


//new product added + counter 
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
  });

  const basketStuff = await db.get({
    select: '*',
    from: '`basket-details`',
    join: {
      join: 'inner',
      table: 'baskets',
      'basketId': 'basket'
    },
    where: {
      'basket': basket[0].basket
    }
  })
  let productIdsInBasket = []
  basketStuff.map(item => {
    productIdsInBasket.push(item.snowboardId)
  })
  req.body.basket = basket[0].basket;
  delete req.body.user;
  delete req.body.counter;

  if (productIdsInBasket.indexOf(req.body.snowboardId) > -1) {

    for (let i = 0; i < basketStuff.length; i += 1) {
      if (basketStuff[i].snowboardId == req.body.snowboardId) {
        let addedQuantity = basketStuff[i].quantity += req.body.quantity;
        const updateQuantity = await db.update({
          table: '`basket-details`',
          set: {
            'quantity': `${addedQuantity}`
          },
          where: {
            snowboardId: `${basketStuff[i].snowboardId}`,
          }
        });
      }
    }
  } else {
    const productDetails = await db.create({
      table: '`basket-details`',
      values: req.body,
    })

  }

  const count = await db.get({
    select: {
      'sum(quantity)': 'orderItems'
    },
    from: '`basket-details`',
    where: {
      'basket': req.body.basket
    }
  })
  console.log(count[0].orderItems)
  res.json({
    count: count[0].orderItems
  });
})

//place an order
router.post('/orders', async (req, res, next) => {
  if (basketDetails.length == 0) {
    isHidden = false;
    res.redirect('/basket')
  }
  const newOrder = await db.create({
    table: 'orders',
    values: {
      'userId': `${req.user.userId}`,
    }
  })
  console.log('neworder ', newOrder)
  
  /*const orderId = await db.get({
    select: {
      'orderId': 'order'
    },
    from: 'orders',
    where: {
      'userId': `${req.user.userId}`,
    }
  })*/
  let orderDetails = [];
  basketDetails.map(item => {
    orderDetails.push({
      '`order`': newOrder.insertId,
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
  const deleteBasket = await db.del({
    table: '`basket-details`',
    where: {
      basket: basketNumber[0].basket
    }
  })

  delete req.body.phone;
  delete req.body.counter;
  const updateUserData = await db.update({
    table: 'users',
    set: req.body,
    where: {
      userId: `${req.user.userId}`
    },
  });
  res.redirect('/orders')
})

//Delete the whole basket
router.get('/delete', async (req, res, next) => {
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
  });

  console.log('deleteBasket ' + basketNumber[0].basket)
  const deleteBasket = await db.del({
    table: '`basket-details`',
    where: {
      basket: basketNumber[0].basket,
    }
  });

  res.redirect('/basket')

});

//Delete a snowboard from basket
router.get('/:address', async (req, res, next) => {
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
  });
  const SnowboardId = await db.get({
    select: {
      'ID': 'ID'
    },
    from: 'snowboards',
    where: {
      postfix: `${req.params.address}`
    },
  });

  const Quantity = await db.get({
    select: {
      'quantity': 'quantity'
    },
    from: '`basket-details`',
    where: {
      basket: basketNumber[0].basket,
      relation: 'and',
      snowboardId: SnowboardId[0].ID,
    }
  });
  let substractedQuantity = Quantity[0].quantity - 1
  const deleteOneProduct = await db.update({
    table: '`basket-details`',
    set: {
      'quantity': substractedQuantity
    },
    where: {
      basket: basketNumber[0].basket,
      relation: 'and',
      snowboardId: SnowboardId[0].ID,
    }
  });
  if (substractedQuantity == 0) {
    const deleteRow = await db.del({
      table: '`basket-details`',
      where: {
        basket: basketNumber[0].basket,
        relation: 'and',
        snowboardId: SnowboardId[0].ID,
      }
    });
  }

  res.redirect('/basket')
})


// add one snowboard
router.get('/add/:address', async (req, res, next) => {
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
  });
  const SnowboardId = await db.get({
    select: {
      'ID': 'ID'
    },
    from: 'snowboards',
    where: {
      postfix: `${req.params.address}`
    },
  });

  const Quantity = await db.get({
    select: {
      'quantity': 'quantity'
    },
    from: '`basket-details`',
    where: {
      basket: basketNumber[0].basket,
      relation: 'and',
      snowboardId: SnowboardId[0].ID,
    }
  });
  let addedQuantity = Quantity[0].quantity + 1
  const addOneProduct = await db.update({
    table: '`basket-details`',
    set: {
      'quantity': addedQuantity
    },
    where: {
      basket: basketNumber[0].basket,
      relation: 'and',
      snowboardId: SnowboardId[0].ID,
    }
  });
  res.redirect('/basket')
})







module.exports = router;