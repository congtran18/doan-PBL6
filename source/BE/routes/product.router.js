const express = require('express')
const router = express.Router()
// const verifyToken = require('../middleware/auth')
const { v4: uuidv4 } = require('uuid')
// const fs =require('fs')
const multer =require("multer")
let path = require('path');
const validate = require('../middleware/validate');
// const productController = require('../controllers/product.controller');
const {
    categoryController,
	productController,
	typeController,
} = require('../controllers/admin');
const productValidation = require('../validations/product.validation');
const protectRoute = require("../middleware/authMiddleware.js");

const fileFilter = (req, file, cb) => {
	const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
	if (allowedFileTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads');
    },
	filename: (req, file, callback) => {
		callback(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
	}
});
let upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

router.route('/')
	  .get( productController.getProducts)
	  .post( upload.array('image', 6), validate(productValidation.postProduct), productController.addProduct)

router.route('/:id')
	  .put( upload.array('image', 5), validate(productValidation.updateProduct), productController.updateProduct)
	  .delete(validate(productValidation.deleteProduct), productController.deleteProduct)
	  .get(productController.getDetailProduct)

router.route('/track-product/track').get(productController.getProductsTrack)

router.route('/track/:id').put(productController.trackProduct)

router.route('/code/:code').get(productController.getCodeProduct)

router.route("/:id/reviews").post(protectRoute, productController.createProductReview);

router.get('/typeProduct/type', validate(productValidation.getTypeProduct), typeController.getTypes)

router.route('/categoryProduct/category')
	.get(validate(productValidation.getCategoryProduct), categoryController.getCategories)
	.post( categoryController.addCategories)

router.route('/categoryProduct/category/:id')
	.get(categoryController.getDetailCategory)
	.put(categoryController.updateCategory)
	.delete( categoryController.deleteCategories)

module.exports = router
