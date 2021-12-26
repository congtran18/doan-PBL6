const Order = require('../../../models/Order.model')
const { BadRequestError } = require('../../../helpers/errors')

async function deleteOrder(req, res, next) {

    try {
        const OrderDelete = await Order.findOneAndDelete({ _id: req.params.id })

        if (!OrderDelete) {
            throw new BadRequestError("Lỗi khi xoá hoá đơn!");
        }

        res.status(200).send({
            success: true,
            message: "XOÁ HOÁ ĐƠN THÀNH CÔNG!",
            OrderDelete: OrderDelete,
        });

    } catch (error) {
        console.log(error)
        throw new ApiError(httpStatus.NOT_FOUND, 'Delete not success');
    }

}

module.exports = deleteOrder;
