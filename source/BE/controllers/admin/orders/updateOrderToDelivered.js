const Order = require('../../../models/Order.model')
const { BadRequestError } = require('../../../helpers/errors')

async function updateOrderToDelivered(req, res, next) {

      const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new BadRequestError("Order not found");
  }

}

module.exports = updateOrderToDelivered;
