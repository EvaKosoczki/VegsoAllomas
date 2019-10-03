const express = require('express');

const router = express.Router();

const db = require('./../modules/db');
isHidden = true;

//get all basket item and details
router.get('/', async (req, res, next) => {
	if (!req.user || req.user.role == 'administrator') {
		res.redirect('/login')
	}
	const diffOrders = await db.get({
		select: {
			'OrderId': 'OrderId'
		},
		from: 'orders',
		where: {
			'orders.userId': `${req.user.userId}`
		},
		join: {
			join: 'inner',
			table: 'users',
			'orders.userId': 'users.userId'
		},
		orderby: {
			'orderDate': 'desc'
		}
	});
	let Orders = []
	for (let i = 0; i < diffOrders.length; i += 1) {
		let orderDetails = await db.get({
			select: '*',
			from: 'orders',
			where: {
				userId: `${req.user.userId}`,
				relation: 'and',
				OrderId: diffOrders[i].OrderId
			},
			join: {
				join: 'inner',
				table: '`order-details`',
				'orders.orderId': '`order-details`.order',
				join1: 'inner',
				table1: '`snowboards`',
				'snowboards.ID': '`order-details`.snowboardId'
			},

		});
		orderDetails.Total = orderDetails.map(product => product.quantity * product.price)
			.reduce((a, b) => {
				return a + b
			}, 0)
		Orders.push(orderDetails);
	}


	const userData = await db.get({
		select: '*',
		from: 'users',
		where: {
			userId: `${req.user.userId}`
		},
	});
	console.log(userData[0])

	res.render('orders', {
		title: 'My orders',
		Orders: Orders,
		userData: userData[0],
		user: req.user,
	});

});
module.exports = router;