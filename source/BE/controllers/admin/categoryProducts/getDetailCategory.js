const ProductCategory = require('../../../models/ProductCategory.model')
const { BadRequestError } = require('../../../helpers/errors')

async function getDetailCategory(req, res, next) {

    const findCategory = await ProductCategory.findById(req.params.id).populate('type').lean()

    if (!findCategory) {
        throw new BadRequestError("Lỗi khi hiển thị chi tiết danh mục!");
    }

    res.status(200).send({
        success: true,
        message: "Success",
        findCategory: findCategory,
    });

}

module.exports = getDetailCategory;
