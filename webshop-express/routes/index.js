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
  

  res.render('index', {
    products: onSaleItems,
    user: req.user,
    counter: req.body.counter,
  });
});

router.get('/:purpose', async (req, res, next) => {
  const productDetails = await db.get({
    select: '*',
    from: "snowboards",
    where: {
      purpose: `${req.params.purpose}`
    },
    join: {
      join: 'inner',
      table: 'brands',
      'snowboards.brand': 'brands.brandId'
    },
    orderby: {
      name: 'asc',
      brandName: 'asc'
    }
  });

  console.log(productDetails);

  res.render('products', {
    title: 'Snowboards',
    products: productDetails
  });
});

module.exports = router;
