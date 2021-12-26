const Product = require('../../../models/Product.model')
const { BadRequestError } = require('../../../helpers/errors')

async function deleteProduct(req, res, next) {

    try {
        const ProductDelete = await Product.findOneAndDelete({ _id: req.params.id })

        if (!ProductDelete) {
            throw new BadRequestError("Lỗi khi xoá sản phẩm!");
        }

        res.status(200).send({
            success: true,
            message: "XOÁ SẢN PHẨM THÀNH CÔNG!",
            ProductDelete: ProductDelete,
        });

    } catch (error) {
        console.log(error)
        throw new ApiError(httpStatus.NOT_FOUND, 'Delete not success');
    }

}

module.exports = deleteProduct;
