const express = require('express');
const router = express.Router();
const path = require('path');
const DB = require('../modules/db');

const db = new DB();

//Get one product:
router.get('/:postfix', async (req, res, next) => {
  const productDetails = await db.get({
    select: '*',
    from: 'snowboards',
    where: { postfix: `${req.params.postfix}` },
    join: { join: 'inner', table: 'brands', 'snowboards.brand': 'brands.brandId' },
    orderby: { name: 'asc', brandName: 'asc' }
  })
  const oneProduct = productDetails[0];
  const img = path.join('/image', 'snowboards', oneProduct.picture);
  const icon = path.join('/image', 'brands', oneProduct.logo);

  res.render('product', {
    product: oneProduct,
    imgRoot: img,
    iconRoot: icon,
    user: req.user,
    counter: req.body.counter
  });
});


/* GET all products in JSON format */
router.get('/', async (req, res, next) => {


  const productDetails = await db.get({
    select: '*',
    from: "snowboards"
  })

  res.render('products', {
    title: 'Snowboards',
    products: productDetails,
    user: req.user,
    counter: req.body.counter
  });
});


//No product found:
router.get('/*', (req, res, next) => {
  res.render('no-product', {
    title: 'No product found!',
    counter: req.body.counter
  });
});

module.exports = router;
