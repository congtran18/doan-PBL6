const Product = require('../../../models/Product.model')
const { BadRequestError } = require('../../../helpers/errors')

async function getDetailProduct(req, res, next) {

    console.log(req.params.code)

    let findProduct = await Product.findOne({ code : req.params.code}).populate('type').populate('category').lean()
    
    if (!findProduct) {
        throw new BadRequestError("Lỗi khi hiển thị chi tiết sản phẩm!");
    }

    res.status(200).send({
        success: true,
        message: "Success",
        findProduct: findProduct,
    });

}

module.exports = getDetailProduct;
