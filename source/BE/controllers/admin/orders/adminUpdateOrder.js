const Order = require('../../../models/Order.model')
const { BadRequestError } = require('../../../helpers/errors')

async function adminUpdateOrder(req, res, next) {

    try {

        const existingOrder = await Order.findOne({ _id: req.params.id });
        const { isPaid, isDelivered, status } = req.body

        if (!existingOrder) {
            throw new BadRequestError("Không tìm thấy hoá đơn!");
        }


        const OrderUpdate = await Order.findOneAndUpdate({ _id: req.params.id }, { isPaid: isPaid ? isPaid : existingOrder.isPaid, isDelivered: isDelivered ? isDelivered : existingOrder.isDelivered, status: status ? status : existingOrder.status }, { new: true, useFindAndModify: false })

        if (!OrderUpdate) {
            throw new BadRequestError("Lỗi khi cập nhật hoá đơn!");
        }

        res.status(200).send({
            success: true,
            message: "CẬP NHẬT HOÁ ĐƠN THÀNH CÔNG!",
            OrderUpdate: OrderUpdate,
        });

    } catch (error) {
        console.log(error)
        throw new ApiError(httpStatus.NOT_FOUND, 'Delete not success');
    }

}

module.exports = adminUpdateOrder;
