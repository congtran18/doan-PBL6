const Order = require('../../../models/Order.model')
const { BadRequestError } = require('../../../helpers/errors')

async function getLoggedInUserOrders(req, res, next) {

    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json(orders);

}

module.exports = getLoggedInUserOrders;
