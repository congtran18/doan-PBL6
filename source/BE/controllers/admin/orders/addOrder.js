const Order = require('../../../models/Order.model')
const { BadRequestError } = require('../../../helpers/errors')
var mongoose = require('mongoose');
const removeKeyNotValue = require('../../../helpers/removeKeyNotValue');

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * 
		charactersLength));
   }
   return result.toLowerCase();
}

async function addOrder(req, res, next) {
	const { realname, mobile, description, orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, itemsPrice, totalPrice } = req.body

	// console.log(itemsPrice)
	// for (let i = 0; i < products.length; i++) {
    //     products[i] = JSON.parse(products[i]);
    // }

	try {
		const newOrder = new Order({
			// user: req.user._id,
			realname,
			mobile,
			description,
      		orderItems,
      		shippingAddress,
     		paymentMethod,
      		taxPrice,
      		shippingPrice,
      		itemsPrice,
      		totalPrice,
			status : 'Chuẩn bị hàng'
		})

        removeKeyNotValue(newOrder);

		await newOrder.save()

		res.status(200).send({
			success: true,
			message: 'THÊM HOÁ ĐƠN THÀNH CÔNG!',
			order: newOrder,
		});

		// console.log(newOrder)
	} catch (error) {
		console.log(error)
		throw new BadRequestError("Add order fail!");
	}

}

module.exports = addOrder;