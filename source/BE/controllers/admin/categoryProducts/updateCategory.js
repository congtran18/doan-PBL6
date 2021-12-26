const ProductCategory = require('../../../models/ProductCategory.model')
const { BadRequestError } = require('../../../helpers/errors')
const removeKeyNotValue = require('../../../helpers/removeKeyNotValue');

async function updateCategory(req, res, next) {
    const { realname, type } = req.body

    console.log(req.body)

    let updatedCategory;

    try {
        updatedCategory = {
            realname,
            type,
        }

        removeKeyNotValue(updatedCategory);

        updatedCategory = await ProductCategory.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedCategory },
            { new: true, useFindAndModify: false }
        )

        res.status(200).send({
            success: true,
            message: "CẬP NHẬT DANH MỤC THÀNH CÔNG!",
            updatedCategory: updatedCategory,
        });
    } catch (error) {
        // console.log(error)
        throw new BadRequestError("Error occur when update product!");
    }

}

module.exports = updateCategory;