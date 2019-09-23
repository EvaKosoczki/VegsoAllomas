var express = require('express');
var router = express.Router();
const BL = require('../business-logic-layer/bl-snowboards');
const bl = new BL();

/* GET home page. */
router.get('/products', async (req, res, next) => {
  const Products = await bl.readSnowboards()
  console.log(Products)
  res.json(Products);
});

module.exports = router;