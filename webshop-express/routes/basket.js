const express = require('express');

const router = express.Router();

const DB = require('./../modules/db');
const db = new DB();


router.get('/', async (req, res, next) => {
  res.render('basket', {
    title: 'My basket',
    basket: 'Basket Summary'
  });
});

router.post('/', async (req, res, next) => {
  console.log("REQ: " + req.body);
  //console.log('REQ BODY:' + Object.keys(req.body[0]));
  // const productDetails = await db.create({
  //   table: 'basket-details',
  //   values: req.body,
  // })
  res.send('Hali');
})

module.exports = router;
