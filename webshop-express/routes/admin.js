var express = require('express');
var router = express.Router();
const Db = require('../modules/db');
const db = new Db();

/* GET home page. */
router.get('/products', async (req, res, next) => {
  const productDetails = await db.get({
    select: '*',
    from: 'snowboards'
  })
  res.json(productDetails);
});

module.exports = router;