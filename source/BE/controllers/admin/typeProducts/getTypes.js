const ProductType = require('../../../models/ProductType.model')
const { BadRequestError } = require('../../../helpers/errors')

async function getTypes(req, res, next) {
    try {

		let typeProducts = await ProductType.find();

        if(!typeProducts){
            throw new BadRequestError("Lỗi khi lấy danh mục sản phẩm!");
        }

		res.status(200).send({ success: true, typeProducts: typeProducts })
    } catch (error) {
		// console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
	}


}

module.exports = getTypes;
