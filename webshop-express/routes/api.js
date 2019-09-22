const express = require('express');

const router = express.Router();

const DB = require('../modules/db');

const db = new DB();

router.get('/products', async (req, res, next) => {
  const productDetails = await db.read();

  res.json(productDetails);
});


module.exports = router;
