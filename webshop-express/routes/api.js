const express = require('express');
const router = express.Router();
const db = require('../modules/db');

router.get('/products', async (req, res, next) => {
  const productDetails = await db.get({
    select: '*',
    from: 'snowboards',
  })

  res.json(productDetails);
});

router.get('/products/:id', async (req, res, next) => {
  const productDetails = await db.get({
    select: '*',
    from: 'snowboards',
    where: {
      ID: `${req.params.id}`
    }
  })
  res.json(productDetails);
});

router.delete('/products/:id', async (req, res, next) => {
  console.log(req.body)
  const productDetails = await db.del({
    table: 'snowboards',
    where: {
      ID: `${req.params.id}`
    }
  })
  res.json(productDetails);
});

router.post('/products', async (req, res, next) => {
  delete req.body.ID;
  const productDetails = await db.create({
    table: 'snowboards',
    values: req.body,
  })

  res.json(productDetails);
});

router.put('/products/:id', async (req, res, next) => {
  delete req.body.id;
  const productDetails = await db.update({
    table: "snowboards",
    set: req.body,
    where: {
      ID: `${req.params.id}`
    }
  })
  res.json(productDetails);
})

router.put('/products', async (req, res, next) => {
  const productDetails = await db.update({
    table: "snowboards",
    set: {
      'snowboards.postfix': req.body.postfix
    },
    where: {
      ID: req.body.ID
    }
  })
  res.json(productDetails);
})



// orders

router.get('/orders', async (req, res, next) => {
  const orders = [];
  const ordersByCust = await db.get({
    select: '*',
    from: 'orders',
    join: {
      join: 'inner',
      table: 'users',
      'orders.userId': 'users.userId'
    },
    orderby: {
      orderDate: 'desc'
    }
  });

  const orderDetails = await db.get({
    select: '*',
    from: 'orders',
    join: {
      join1: 'inner',
      table1: '`order-details`',
      'orders.orderId': '`order-details`.order',
      join2: 'inner',
      table2: 'snowboards',
      '`order-details`.snowboardId': 'snowboards.ID'
    }
  })

  const totalPrice = await db.get({
    select: {
      'sum(unitPrice*quantity)': 'totalPrice',
      '`order`': 'order'
    },
    from: '`order-details`',
    groupby: '`order`'
  })

  const productQuantity = await db.get({
    select: {
      'sum(quantity)': 'productQuantity'
    },
    from: '`order-details`',
    groupby: '`order-details`.order'
  })

  orders.push(ordersByCust);
  orders.push(orderDetails);
  orders.push(totalPrice);
  orders.push(productQuantity);
  res.json(orders);
});


router.delete('/orders/:id', async (req, res, next) => {
  const orderDetails = await db.del({
    table: '`order-details`',
    where: {
      orderDetailsId: `${req.params.id}`
    }
  })
  res.json(orderDetails);
});


router.put('/orders', async (req, res, next) => {
  console.log("Req Body: ", req.body);
  const orderDetails = await db.update({
    table: "orders",
    set: {
      'orders.status': req.body.status
    },
    where: {
      orderId: req.body.orderId
    }
  })
  res.json(orderDetails);
})


// users

router.get('/users', async (req, res, next) => {
  const userDetails = await db.get({
    select: '*',
    from: 'users'
  })

  res.json(userDetails);
});

router.get('/users/:id', async (req, res, next) => {
  const userDetails = await db.get({
    select: '*',
    from: 'users',
    where: {
      userId: `${req.params.id}`
    },
  })

  res.json(userDetails);
});


router.put('/users/:id', async (req, res, next) => {

  const users = [];
  const userDetails = await db.update({
    table: "users",
    set: req.body,
    where: {
      userId: `${req.params.id}`
    }
  })
  const basket = await db.del({
    table: 'baskets',
    where: {
      user: `${req.params.id}`
    }
  })
  const basketDets = await db.del({
    table: '`basket-details`',
    join: {
      join: 'inner',
      table: 'baskets',
      '`basket-details`.basket': 'baskets.basketId'
    },
    where: {
      'baskets.user': `${req.params.id}`
    }
  })
  users.push(userDetails);
  users.push(basket);
  users.push(basketDets);
  res.json(users);
})

router.put('/users', async (req, res, next) => {
  const userDetails = await db.update({
    table: "users",
    set: req.body,
    where: {
      userId: `${req.body.userId}`
    }
  })
  res.json(userDetails);
})



// baskets


router.get('/baskets', async (req, res, next) => {
  const baskets = [];
  const basketsByCust = await db.get({
    select: '*',
    from: 'users',
    join: {
      join: 'inner',
      table: 'baskets',
      'users.userId': 'baskets.user',
      join1: 'inner',
      table1: '`basket-details`',
      'baskets.basketId': '`basket-details`.basket'
    },
    groupby: 'basketId'
  });

  const basketDetails = await db.get({
    select: '*',
    from: 'baskets',
    join: {
      join1: 'inner',
      table1: '`basket-details`',
      'baskets.basketId': '`basket-details`.basket',
      join2: 'inner',
      table2: 'snowboards',
      '`basket-details`.snowboardId': 'snowboards.ID'
    }
  })

  const totalPrice = await db.get({
    select: {
      'sum(price*quantity)': 'totalPrice',
      '`basket`': 'basket'
    },
    from: '`basket-details`',
    join: {
      join: 'inner',
      table: 'snowboards',
      snowboardId: 'ID'
    },
    groupby: '`basket`'
  })

  const productQuantity = await db.get({
    select: {
      'sum(quantity)': 'productQuantity'
    },
    from: '`basket-details`',
    groupby: '`basket-details`.basket'
  })

  console.log(basketsByCust);
  console.log(basketDetails);
  console.log(totalPrice);
  console.log(productQuantity);

  baskets.push(basketsByCust);
  baskets.push(basketDetails);
  baskets.push(totalPrice);
  baskets.push(productQuantity);
  res.json(baskets);
});


router.delete('/baskets/:id', async (req, res, next) => {
  const basketDetails = await db.del({
    table: '`basket-details`',
    where: {
      basket: `${req.params.id}`
    }
  })
  res.json(basketDetails);
});

router.put('/baskets', async (req, res, next) => {
  console.log("REQBODY:", req.body);
  const piece = req.body.quantity;
  let basketDetails = [];
  if (piece == 1) {
    let basketDetails = await db.del({
      table: '`basket-details`',
      where: {
        basketDetailsId: `${req.body.basketDetailsId}`
      }
    })
  } else {
    const minPiece = piece - 1;
    let basketDetails = await db.update({
      table: "`basket-details`",
      set: {
        quantity: `${minPiece}`
      },
      where: {
        basketDetailsId: `${req.body.basketDetailsId}`
      }
    })
  }
  res.json(basketDetails);
})

module.exports = router;