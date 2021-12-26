const express = require('express')
const router = express.Router()
// const verifyToken = require('../middleware/auth')
const {
	v4: uuidv4
} = require('uuid')
// const fs =require('fs')
const multer = require("multer")
let path = require('path');
const validate = require('../middleware/validate');
// const productController = require('../controllers/product.controller');
const {
	orderController,
} = require('../controllers/admin');
const orderValidation = require('../validations/order.validation');


router.route('/')
	.get(orderController.getOrders)
	.post(orderController.addOrder)

router.route('/track-order/track').get(orderController.getOrdersTrack)

router.route('/track/:id').put(orderController.trackOrder)

router.route('/admin-update/:id').put(orderController.adminUpdateOrder)

router.route('/:id')
	.put(orderController.updateOrder)
	.delete(orderController.deleteOrder)
	.get(orderController.getDetailOrder)

module.exports = router