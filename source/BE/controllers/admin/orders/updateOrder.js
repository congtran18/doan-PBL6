const Order = require('../../../models/Order.model')
const { BadRequestError } = require('../../../helpers/errors')
const removeKeyNotValue = require('../../../helpers/removeKeyNotValue');

async function updateOrder(req, res, next) {
    const { realname, description, orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, itemsPrice, totalPrice, isPaid, isDelivered, status } = req.body


    let updateOrder;

    try {
        updateOrder = {
            realname,
            description,
            orderItems,
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            itemsPrice,
            totalPrice,
            isPaid,
            isDelivered,
            status
        }

        removeKeyNotValue(updateOrder);

        updateOrder = await Order.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateOrder },
            { new: true, useFindAndModify: false }
        )

        res.status(200).send({
            success: true,
            message: "CẬP NHẬT HOÁ ĐƠN THÀNH CÔNG!",
            updateOrderObj: updateOrder,
        });
    } catch (error) {
        console.log(error)
        throw new BadRequestError("Error occur when update order!");
    }

}

module.exports = updateOrder;