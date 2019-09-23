const express = require('express');

const router = express.Router();

const DB = require('../modules/db');

const db = new DB();

/* bl-snowboards.js betöltése, majd ha megy a paraméterezős lekérdezés */
/* const BL = require('../business-logic-layer/bl-snowboards');

const bl = new BL(); */


/* GET all producst in JSON format */
router.get('/', async (req, res, next) => {
  const productDetails = await db.read();

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
