const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../modules/db');
const UserDb = require('../modules/user');
const userDb = new UserDb();

router.get('/:postfix', async (req, res, next) => {
  const postfixes = await db.get({
    select: '*',
    from: 'snowboards',
    where: {
      postfix: `${req.params.postfix}`
    }
  });

  if (postfixes[0] == undefined) {
    res.render('no-product', {
      title: 'No product found!',
      counter: req.body.counter
    });
  } else {

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

    let reviewD = await db.get({
      select: '*',
      from: 'reviews',
      where: {
        'reviews.snowboardId': `${productDetails[0].ID}`
      }
    })

    if (reviewD == undefined) {
      reviewD = 0;
    }

    const oneProduct = productDetails[0];
    const img = path.join('/image', 'snowboards', oneProduct.picture);
    const icon = path.join('/image', 'brands', oneProduct.logo);

    res.render('product', {
      product: oneProduct,
      imgRoot: img,
      iconRoot: icon,
      user: req.user,
      counter: req.body.counter,
      reviews: reviewD
    });
  }
});


/* GET all products in JSON format */
router.get('/', async (req, res, next) => {
  let productDetails = [];
  console.log('req.filter', req.query.filter);
  const limit = req.query.prodsPerPage || 12;
  const filteredKeys = Object.keys(req.query) || [];
  console.log('keys', filteredKeys);
  const page = req.query.page || 0;
  const brands = await db.get({
    select: {
      'brandName': 'name'
    },
    from: "brands",
  });
  const shapes = await db.get({
    select: {
      'distinct shape': 'shape'
    },
    from: "snowboards",
  });
  const purposes = await db.get({
    select: {
      'distinct purpose': 'purpose'
    },
    from: "snowboards",
  });
  let pagination = 0;
  if (Object.keys(req.query).length > 3) {
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
    brands: brands,
    shapes: shapes,
    purposes: purposes,
    keys: filteredKeys,
    query: req.url.split('?')[1] || "",
    limit: limit
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
    brands: brands,
    shapes: shapes,
    purposes: purposes
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


// // No product found:
// router.get('/*', (req, res, next) => {
//   res.render('no-product', {
//     title: 'No product found!',
//     counter: req.body.counter
//   });
// });



// can you review?
router.put('/reviews', async (req, res, next) => {
  const user = req.user;
  const canReview = await db.get({
    select: {
      'orders.userId': 'userId',
    },
    from: 'orders',
    join: {
      join: 'inner',
      table: '`order-details`',
      'orders.orderId': '`order-details`.order',
    },
    where: {
      '`order-details`.snowboardId': `${req.body.snowboardId}`,
    },
  });

  let isTrue = true;
  if (canReview[0] == undefined) {
    isTrue = false;
  }
  for (let i = 0; i < canReview.length; i++) {
    if (canReview[i].userId == user.userId) {
      isTrue = true;
      break;
    } else {
      isTrue = false;
    }
  }

  res.json(isTrue);
});

// new review added
router.post('/reviews', async (req, res, next) => {
  delete req.body.counter;
  let allData = [];
  const user = req.user;

  if (req.body.snowboardId == undefined) {
    let allData = await db.update({
      table: "reviews",
      set: {
        details: `${req.body.details}`
      },
      where: {
        reviewId: `${req.body.reviewId}`
      }
    });

  } else {

    let allData = await db.create({
      table: 'reviews',
      values: {
        snowboardId: `${req.body.snowboardId}`,
        userId: user.userId,
        rate: `${req.body.rate}`,
        details: `${req.body.details}`
      },
    });


  }
  res.json(allData);
});

router.delete('/reviews', async (req, res, next) => {

  const deleted = await db.del({
    table: 'reviews',
    where: {
      reviewId: `${req.body.reviewId}`
    }
  })

  res.json(deleted);
})


module.exports = router;