const Order = require('../../../models/Order.model')
const { BadRequestError } = require('../../../helpers/errors')

async function getDetailOrder(req, res, next) {

    const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    throw new BadRequestError("Order not found");
  }

}

module.exports = getDetailOrder;
