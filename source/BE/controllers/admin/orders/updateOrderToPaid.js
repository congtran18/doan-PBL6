const Order = require('../../../models/Order.model')
const { BadRequestError } = require('../../../helpers/errors')

async function updateOrderToPaid(req, res, next) {

      const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new BadRequestError("Order not found");
  }

}

module.exports = updateOrderToPaid;
