const Product = require('../../../models/Product.model')
const ProductCategory = require('../../../models/ProductCategory.model')
const { BadRequestError } = require('../../../helpers/errors')
var mongoose = require('mongoose');

async function addCategories(req, res, next) {
	const { realname, type } = req.body


	try {
		const newCategory = new ProductCategory({
			realname,
			type,
		})
		await newCategory.save()

		res.status(200).send({
			success: true,
			message: 'THÊM DANH MỤC THÀNH CÔNG!',
			category: newCategory,
		});
	} catch (error) {
		// console.log(error)
		throw new BadRequestError("Add product fail!");
	}

}

module.exports = addCategories;