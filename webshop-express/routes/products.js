const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../modules/db');
const UserDb = require('../modules/user');
const userDb = new UserDb();

router.get('/:postfix', async (req, res, next) => {
  const productDetails = await db.get({
    select: '*',
    from: 'snowboards',
    where: {
      postfix: `${req.params.postfix}`
    },
    join: {
      join: 'inner',
      table: 'brands',
      'snowboards.brand': 'brands.brandId'
    },
    orderby: {
      name: 'asc',
      brandName: 'asc'
    }
  })
  const oneProduct = productDetails[0];
  const img = path.join('/image', 'snowboards', oneProduct.picture);
  const icon = path.join('/image', 'brands', oneProduct.logo);

  res.render('product', {
    product: oneProduct,
    imgRoot: img,
    iconRoot: icon,
    user: req.user,
    counter: req.body.counter
  });
});


/* GET all products in JSON format */
router.get('/', async (req, res, next) => {
  let productDetails = [];
  console.log('req.filter', req.query.filter);
  const limit = req.query.prodsPerPage || 12;
  const filteredKeys=Object.keys(req.query) || [];
  console.log('keys',filteredKeys);
  const page = req.query.page || 0;
  const brands = await db.get({
    select: {'brandName': 'name'},
    from: "brands",
    });
    const shapes=await db.get({
      select: {'distinct shape': 'shape'},
      from: "snowboards",
      });
      const purposes = await db.get({
        select: {'distinct purpose': 'purpose'},
        from: "snowboards",
        });
  let pagination = 0;
  if ( Object.keys(req.query).length>3) {
    let sql = await userDb.filter(req.query);
    productDetails = await db.getFilteredItems(sql, {
      start: page * limit,
      limit: limit
    });
    pagination = await userDb.pagination(page, sql, limit);
  } else {
    productDetails = await db.get({
      select: '*',
      from: "snowboards",
      limit: {
        start: page * limit,
        limit: limit
      }
    });
    pagination = await userDb.pagination(page, {
      select: {
        'count(ID)': 'amount'
      },
      from: 'snowboards'
    }, limit);
  }
  res.render('products', {
    title: 'Snowboards',
    products: productDetails,
    user: req.user,
    counter: req.body.counter,
    pagination: pagination,
    page: page,
    brands:brands,
    shapes:shapes,
    purposes:purposes,
    keys: filteredKeys,
    query: req.url.split('?')[1] || "" ,
    limit:limit
  });
});

//get filtered products
router.post('/', async (req, res, next) => {
  const page = req.query.page || 0;
  let sql = await userDb.filter(req.body);
  req.filter = sql;
  const productDetails = await db.getFilteredItems(sql, {
    start: page * 12,
    limit: 12
  });
  let pagination = await userDb.pagination(page, sql);
  res.render('products', {
    title: 'Snowboards',
    counter: req.body.counter,
    products: productDetails,
    pagination: pagination,
    page: page,
    brands:brands,
    shapes:shapes,
    purposes:purposes
  });
})
router.get('/*', (req, res, next) => {
  res.render('no-product', {
    title: 'No product found!',
    counter: req.body.counter
  });
});



module.exports = router;