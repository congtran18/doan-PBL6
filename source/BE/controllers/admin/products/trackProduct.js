const Product = require('../../../models/Product.model')
const { BadRequestError } = require('../../../helpers/errors')

async function trackProduct(req, res, next) {

    try {

        const existingProduct = await Product.findOne({ _id: req.params.id });

        if (!existingProduct) {
            throw new BadRequestError("Không tìm thấy sản phẩm!");
        }

        let track = existingProduct.track;

        const ProductTrack = await Product.findOneAndUpdate({ _id: req.params.id }, { track: !track }, { new: true, useFindAndModify: false })

        if (!ProductTrack) {
            throw new BadRequestError("Lỗi khi khôi phục sản phẩm!");
        }

        res.status(200).send({
            success: true,
            message: "KHÔI PHỤC SẢN PHẨM THÀNH CÔNG!",
            ProductTrack: ProductTrack,
        });

    } catch (error) {
        console.log(error)
        throw new ApiError(httpStatus.NOT_FOUND, 'Delete not success');
    }

}

module.exports = trackProduct;
