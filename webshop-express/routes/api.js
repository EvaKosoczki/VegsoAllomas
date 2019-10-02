const express = require('express');
const router = express.Router();
const db = require('../modules/db');


// products

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
router.get('/brands', async (req, res, next) => {
  const result = await db.get({
    select: '*',
    from: 'brands'
  });
  console.log(result);
  res.json(result);
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

  const firstReport = await db.get({
    select: {
      'orders.orderDate': 'period',
      'orders.status': 'status',
      'count(distinct orders.orderId)': 'numberOfOrders',
      'sum(unitPrice*quantity)': 'orderValue'
    },
    from: 'orders',
    join: {
      join: 'inner',
      table: '`order-details`',
      'orders.orderId': '`order-details`.order'
    },
    groupby: {
      groupby1: 'month(orders.orderDate)',
      groupby2: 'orders.status'
    }
  })

  const secondReport = await db.get({
    select: {
      'orders.orderDate': 'period',
      'snowboards.name': 'snowboardName',
      '`order-details`.quantity': 'quantity',
      '`order-details`.unitPrice': 'price',
      'sum(unitPrice*quantity)': 'orderValue'
    },
    from: 'orders',
    join: {
      join1: 'inner',
      table1: '`order-details`',
      'orders.orderId': '`order-details`.order',
      join2: 'inner',
      table2: 'snowboards',
      '`order-details`.snowboardId': 'snowboards.ID'
    },
    where: {
      status: 'delivered'
    },
    groupby: {
      groupby1: 'month(orders.orderDate)',
      groupby2: '`order-details`.snowboardId'
    }
  })

  orders.push(ordersByCust);
  orders.push(orderDetails);
  orders.push(totalPrice);
  orders.push(productQuantity);
  orders.push(firstReport);
  orders.push(secondReport);

  res.json(orders);
});

router.get('/orders/:id', async (req, res, next) => {
  const orderDetails = await db.get({
    select: '*',
    from: 'users',
    join: {
      join: 'inner',
      table: 'orders',
      'users.userId': 'orders.userId',
      join1: 'inner',
      table1: '`order-details`',
      'orders.orderId': '`order-details`.order',
      join2: 'inner',
      table2: 'snowboards',
      '`order-details`.snowboardId': 'snowboards.ID',
    },
    where: {
      orderId: `${req.params.id}`
    }
  })

  res.json(orderDetails);
});

router.get('/orders', async (req, res, next) => {

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

router.post('/orders', async (req, res, next) => {
  delete req.body.ID;
  const orderDetails = await db.create({
    table: 'orders',
    values: req.body,
    join: {
      join: 'inner',
      table: 'order-details',
      'orders.orderId': '`order-details`.order'
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

router.delete('/users/:id', async (req, res, next) => {

  const userDetails = await db.del({
    table: 'users',
    where: {
      userId: `${req.params.id}`
    }
  })
  res.json(userDetails);
});

router.post('/users', async (req, res, next) => {
  delete req.body.ID;
  const userDetails = await db.create({
    table: 'users',
    values: req.body
  })

  res.json(userDetails);
});

router.put('/users/:id', async (req, res, next) => {
  console.log("REQBODY:", req.body);
  const userDetails = await db.update({
    table: "users",
    set: req.body,
    where: {
      userId: `${req.params.id}`
    }
  })
  res.json(userDetails);
})

router.put('/users', async (req, res, next) => {
  console.log("REQBODY:", req.body);
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
    from: 'baskets',
    join: {
      join: 'inner',
      table: 'users',
      'baskets.user': 'users.userId'
    }
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

  baskets.push(basketsByCust);
  baskets.push(basketDetails);
  baskets.push(totalPrice);
  baskets.push(productQuantity);
  console.log(basketsByCust);
  console.log(basketDetails);
  //console.log(totalPrice);
  //console.log(productQuantity);
  //console.log(baskets);
  res.json(baskets);
});

router.get('/orders/:id', async (req, res, next) => {
  const orderDetails = await db.get({
    select: '*',
    from: 'users',
    join: {
      join: 'inner',
      table: 'orders',
      'users.userId': 'orders.userId',
      join1: 'inner',
      table1: '`order-details`',
      'orders.orderId': '`order-details`.order',
      join2: 'inner',
      table2: 'snowboards',
      '`order-details`.snowboardId': 'snowboards.ID',
    },
    where: {
      orderId: `${req.params.id}`
    }
  })

  res.json(orderDetails);
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

router.post('/orders', async (req, res, next) => {
  delete req.body.ID;
  const orderDetails = await db.create({
    table: 'orders',
    values: req.body,
    join: {
      join: 'inner',
      table: 'order-details',
      'orders.orderId': '`order-details`.order'
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



module.exports = router;