const express = require('express');

const router = express.Router();

const DB = require('./../modules/db');
const db = new DB();
let newArray = [];

//get all basket item and details
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
  let isHidden = true;

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
    counter: req.body.counter,
    isHidden: isHidden
  });
});


//counter when product added
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
  console.log('1: ' + basketStuff[0].snowboardId)
  console.log('2: ' + req.body.snowboardId)
  req.body.basket = basket[0].basket;
  delete req.body.user;
  delete req.body.counter;
  for (let i = 0; i < basketStuff.length; i += 1) {
    if (basketStuff[i].snowboardId == req.body.snowboardId) {
      console.log('stuff: ')
      let addedQuantity = basketStuff[i].quantity += 1;
      const updateQuantity = await db.update({
        table: '`basket-details`',
        set: {
          'quantity': `${addedQuantity}`
        },
        where: {
          snowboardId: `${basketStuff[i].snowboardId}`,
        }
      });
    } else {
      continue;
    }

  }
  const productDetails = await db.create({
    table: '`basket-details`',
    values: req.body,
  })


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
  /* if (newArray == [undefined]) {
     isHidden = false;
     res.redirect('/basket')
   }
   console.log(req.body)*/
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
  const deleteBasket = await db.del({
    table: '`basket-details`',
    where: {
      basket: basketNumber[0].basket
    }
  })
  res.redirect('/order')
})

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






module.exports = router;