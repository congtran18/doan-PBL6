const ProductCategory = require('../../../models/ProductCategory.model')
const { BadRequestError } = require('../../../helpers/errors')

async function getCategories(req, res, next) {
    try {

        var categoryfilter = {}

        if(req.query.typeID){
            categoryfilter.type = req.query.typeID 
        }

        let categoryProducts = await ProductCategory.find(categoryfilter).populate('type').exec();

        if (!categoryProducts) {
            throw new BadRequestError("Lỗi khi lấy loại sản phẩm!");
        }

        res.status(200).send({ success: true, categoryProducts: categoryProducts })
    } catch (error) {
        // console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }


}

module.exports = getCategories;
