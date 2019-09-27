const express = require('express');
const router = express.Router();
const DB = require('../modules/db');

const db = new DB();

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



// orders

router.get('/orders', async (req, res, next) => {
  const orderDetails = await db.get({
    select: '*',
    from: 'orders',
    join: {
      join: 'inner',
      table: '`order-details`',
      'orders.orderId': '`order-details`.order',
      join1: 'inner',
      table1: '`users`',
      'orders.userId': 'users.userId'
    }
  })

  res.json(orderDetails);
});

router.get('/orders/:id', async (req, res, next) => {
  const orderDetails = await db.get({
    select: '*',
    from: 'orders',
    where: {
      ID: `${req.params.id}`
    },
    join: {
      join: 'inner',
      table: 'order-details',
      'orders.orderId': 'order-details.orderId'
    }
  })

  res.json(orderDetails);
});

router.delete('/orders/:id', async (req, res, next) => {
  console.log(req.body)
  const orderDetails = await db.del({
    table: 'orders',
    where: {
      ID: `${req.params.id}`
    },
    join: {
      join: 'inner',
      table: 'order-details',
      'orders.orderId': 'order-details.orderId'
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
      'orders.orderId': 'order-details.orderId'
    }
  })

  res.json(orderDetails);
});

router.put('/orders/:id', async (req, res, next) => {
  delete req.body.id;
  const orderDetails = await db.update({
    table: "orders",
    set: req.body,
    where: {
      ID: `${req.params.id}`
    },
    join: {
      join: 'inner',
      table: 'order-details',
      'orders.orderId': 'order-details.orderId'
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
      ID: `${req.params.id}`
    },
  })

  res.json(userDetails);
});

router.delete('/users/:id', async (req, res, next) => {

  const userDetails = await db.del({
    table: 'users',
    where: {
      ID: `${req.params.id}`
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
  delete req.body.id;
  const userDetails = await db.update({
    table: "users",
    set: req.body,
    where: {
      ID: `${req.params.id}`
    }
  })
  res.json(userDetails);
})

module.exports = router;