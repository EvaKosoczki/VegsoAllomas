const express = require('express');

const router = express.Router();
const path = require('path');

const DB = require('../modules/db');

const db = new DB();


router.get('/:postfix', async (req, res, next) => {
  const productDetails = await db.get({
    select:'*',
    from:'snowboards',
    where:{postfix:`${req.params.postfix}`},
    join:{join:'inner', table:'brands', 'snowboards.brand':'brands.brandId'},
  })
  console.log(productDetails);
  const oneProduct = productDetails[0];
  const img = path.join('/image', 'snowboards', oneProduct.picture);
  console.log('Product details: ', oneProduct);
  console.log(img);
  const icon = path.join('/image', 'brands', oneProduct.logo);
  console.log(icon);

  res.render('product', {
    product: oneProduct,
    imgRoot: img,
    iconRoot: icon,
  });
});

/* GET all producst in JSON format */
router.get('/', async (req, res, next) => {
  const productDetails = await db.get({
    select:'*',
    from:"snowboards"
  })

  res.render('products', {
    title: 'Snowboards',
    products: productDetails,
  });
});


router.get('/*', (req, res, next) => {
  res.render('no-product', {
    title: 'No product found!',
  });
});

module.exports = router;
