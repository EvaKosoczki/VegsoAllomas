const express = require('express');

const router = express.Router();

const DB = require('../modules/db');

const db = new DB();

router.get('/products', async (req, res, next) => {
  const productDetails = await db.get({
    select: '*',
    from: 'snowboards'
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

module.exports = router;