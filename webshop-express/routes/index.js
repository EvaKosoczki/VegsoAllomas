const express = require('express');
const router = express.Router();
const db = require('../modules/db');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const page = req.query.page || 0;
  const productDetails = await db.get({
    select: '*',
    from: "snowboards",
    join: {
      join: 'inner',
      table: 'brands',
      'snowboards.brand': 'brands.brandId'
    },
  });
 
  let onSaleItems =  productDetails.sort(() => .5 - Math.random()).slice(0,3)
  console.log(onSaleItems);

let name = onSaleItems[0].name;
let brand = onSaleItems[0].purpose;
console.log(name)
console.log(brand);

  res.render('index', {
    products: onSaleItems,
    user: req.user,
    counter: req.body.counter,
  });
});

module.exports = router;
