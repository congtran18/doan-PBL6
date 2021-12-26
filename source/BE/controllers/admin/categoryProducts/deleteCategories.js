const ProductCategory = require('../../../models/ProductCategory.model')
const { BadRequestError } = require('../../../helpers/errors')

async function deleteCategories(req, res, next) {

    try {
        const CategoryDelete = await ProductCategory.findOneAndDelete({ _id: req.params.id })

        if (!CategoryDelete) {
            throw new BadRequestError("Lỗi khi xoá danh mục!");
        }

        res.status(200).send({
            success: true,
            message: "XOÁ DANH MỤC THÀNH CÔNG!",
            CategoryDelete: CategoryDelete,
        });

    } catch (error) {
        console.log(error)
        throw new ApiError(httpStatus.NOT_FOUND, 'Delete not success');
    }

}

module.exports = deleteCategories;
