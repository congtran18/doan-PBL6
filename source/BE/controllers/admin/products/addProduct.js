const Product = require('../../../models/Product.model')
const ProductCategory = require('../../../models/ProductCategory.model')
const { BadRequestError } = require('../../../helpers/errors')
var mongoose = require('mongoose');

async function addProduct(req, res, next) {
	const { realname, type, status, discount ,category, color, size, cost, description } = req.body


	const reqFiles = [];
	const url = req.protocol + '://' + req.get('host')

	reqFiles.push(url + '/uploads/' + req.files[0].filename)

	const existingProductCategory = await ProductCategory.findOne({ _id: mongoose.Types.ObjectId(category) });

	if (!existingProductCategory) {
		throw new BadRequestError("Can't found category when add product!");
	}

	const categoryname = existingProductCategory.realname

	let code;
	let codeexit;
	//Sinh ra mã ko bị trùng
	do {
		code = ((categoryname.split(" ")).concat("-").concat(realname.split(" ")))
		code = code.map((codeelement) => codeelement[0]).join('').concat("00").concat((Math.floor(Math.random() * 1000).toString()))
		//loại bỏ dấu tiếng việt
		code = code.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/đ/g, 'd').replace(/Đ/g, 'D');
		code = code.toUpperCase()
		codeexit = await Product.findOne({ code: code });
	} while (codeexit !== null)

	try {
		const newProduct = new Product({
			realname,
			code,
			status: (status) ? status : 'Nổi bật',
			discount,
			type,
			category,
			color,
			size,
			cost,
			description,
			image: reqFiles,
		})
		await newProduct.save()

		res.status(200).send({
			success: true,
			message: 'THÊM SẢN PHẨM THÀNH CÔNG!',
			product: newProduct,
		});
	} catch (error) {
		// console.log(error)
		throw new BadRequestError("Add product fail!");
	}

}

module.exports = addProduct;