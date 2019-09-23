const express = require('express');

const router = express.Router();
const path = require('path');

const DB = require('./../modules/db');

const db = new DB();

/* bl-snowboards.js betöltése, majd ha megy a paraméterezős lekérdezés */
/* const BL = require('../business-logic-layer/bl-snowboards');

const bl = new BL(); */


/* GET all producst in JSON format */
router.get('/', async (req, res, next) => {
  const productDetails = await db.read();

  res.render('products', {
    title: 'Our products!',
    products: productDetails,
  });
});

router.get('/:postfix', async (req, res, next) => {
  const productArray = await db.readOne(req.params.postfix);
  const oneProduct = productArray[0];
  const productImage = path.join('/image', 'snowboards', oneProduct.picture);
  const brandIcon = path.join('/image', 'brands', oneProduct.logo);

  res.render('product', {
    title: 'Snowboarder site',
    product: oneProduct,
    imgRoot: productImage,
    iconRoot: brandIcon,
  });
});

router.get('/*', (req, res, next) => {
  res.render('no-product', {
    title: 'No product found!',
  });
});

module.exports = router;
