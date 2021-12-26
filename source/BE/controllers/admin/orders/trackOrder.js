const Order = require('../../../models/Order.model')
const { BadRequestError } = require('../../../helpers/errors')

async function trackOrder(req, res, next) {

    try {

        const existingOrder = await Order.findOne({ _id: req.params.id });

        if (!existingOrder) {
            throw new BadRequestError("Không tìm thấy sản phẩm!");
        }

        let track = existingOrder.track;

        const OrderTrack = await Order.findOneAndUpdate({ _id: req.params.id }, { track: !track }, { new: true, useFindAndModify: false })

        if (!OrderTrack) {
            throw new BadRequestError("Lỗi khi khôi phục sản phẩm!");
        }

        res.status(200).send({
            success: true,
            message: "KHÔI PHỤC HOÁ ĐƠN THÀNH CÔNG!",
            OrderTrack: OrderTrack,
        });

    } catch (error) {
        console.log(error)
        throw new ApiError(httpStatus.NOT_FOUND, 'Delete not success');
    }

}

module.exports = trackOrder;
