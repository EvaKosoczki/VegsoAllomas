const express = require('express');

const router = express.Router();


router.get('/', async (req, res, next) => {
  res.render('basket', { title: 'My basket', basket: 'Basket Summary' });
});

router.post('/'), async (req,res,next) =>{
  const parsedBody = JSON.parse(req.body);
  console.log(parsedBody);
}

module.exports = router;
