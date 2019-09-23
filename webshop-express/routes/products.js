const express = require('express');

const router = express.Router();
const path = require('path');

const DB = require('../modules/db');

const db = new DB();

/* bl-snowboards.js betöltése, majd ha megy a paraméterezős lekérdezés */
const BL = require('../business-logic-layer/bl-snowboards');

const bl = new BL();

router.get('/:postfix', async (req, res, next) => {
  const productDetails = await bl.readSnowboards(req.params.postfix);
  console.log(productDetails);
  const oneProduct = productDetails[0];
  const img = path.join('/image', 'snowboards', oneProduct.picture);
  console.log('Product details: ', oneProduct);
  const icon = path.join('/image', 'brands', oneProduct.logo);

  res.render('product', {
    product: oneProduct,
    imgRoot: img,
    iconRoot: icon,
  });
});

/* GET all producst in JSON format */
router.get('/', async (req, res, next) => {
  const productDetails = await bl.readSnowboards();

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
