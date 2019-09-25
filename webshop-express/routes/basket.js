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

<<<<<<< HEAD
router.post('/'), async (req,res,next) =>{
  const parsedBody = JSON.parse(req.body);
  console.log(parsedBody);
}

module.exports = router;
=======
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
>>>>>>> cc47cebedecb38601834556adbb19789e87549d9
