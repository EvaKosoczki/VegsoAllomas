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
  const page = req.query.page || 0;
  const productDetails = await db.get({
    select: '*',
    from: "snowboards",
    limit: {
      start:page*12,
      limit: 12
    }
  });
  const pagination = await userDb.pagination(page);
  console.log(pagination);
  res.render('products', {
    title: 'Snowboards',
    products: productDetails,
    user: req.user,
    counter: req.body.counter,
    pagination: pagination,
    page:page
  });
});
//get filtered products
router.post('/', async (req, res, next) => {
  delete req.body.counter;
  const filteredProducts = userDb.filter(req.body);
  res.render('products', {
    title: 'Snowboards',
    products: filteredProducts,
  });
})



// /* GET products per page */
// router.get('/:start=0:size=4', async (req, res, next) => {

//   const prodsPerPage = await db.get({
//     select: '*',
//     from: "snowboards",
//     limit: { 0: 4 }
//   })

//   res.render('products', {
//     title: 'Snowboards',
//     products: prodsPerPage,
//     user: req.user,
//     counter: req.body.counter
//   });
// });


// //Pagination:
// router.get('/:page', async function (req, res, next) {
//   const productDetails = await db.get({
//     select: '*',
//     from: "snowboards",
//   })

//   let perPage = 4
//   let page = req.params.page || 1

//   productDetails
//     .find({})
//     .skip((perPage * page) - perPage)
//     .limit(perPage)
//     .exec(function (err, products) {
//       Product.count().exec(function (err, count) {
//         if (err) return next(err)
//         res.render('products', {
//           products: products,
//           current: page,
//           pages: Math.ceil(count / perPage)
//         })
//       })
//     })
// })


//No product found:
router.get('/*', (req, res, next) => {
  res.render('no-product', {
    title: 'No product found!',
    counter: req.body.counter
  });
});

module.exports = router;