let express = require('express');

let router = express.Router();

/* GET users listing. */
router.get('/*', (req, res, next) => {
  res.render('admin', {});
});

module.exports = router;
