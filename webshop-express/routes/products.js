let express = require('express');

let router = express.Router();

router.get('/', (req, res, next) => {
  res.render('products', {
    title: 'Our products!'
  });
});


router.get('/*', (req, res, next) => {
  res.render('no-product', {
    title: 'No product found!'
  });
});

module.exports = router;
