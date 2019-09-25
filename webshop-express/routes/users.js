let express = require('express');

let router = express.Router();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'webshop', user: 'root', password: 'root', connectionLimit: 5
});

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
