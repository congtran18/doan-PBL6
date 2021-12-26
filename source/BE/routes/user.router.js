const express = require('express')
const router = express.Router()
// const verifyToken = require('../middleware/auth')
const { v4: uuidv4 } = require('uuid')
// const fs =require('fs')
const multer =require("multer")
let path = require('path');
// const validate = require('../middleware/validate');
// const productController = require('../controllers/product.controller');
const {
    userController,
} = require('../controllers/user');
const productValidation = require('../validations/product.validation');
const protectRoute = require("../middleware/authMiddleware");


// router.route('/')
// 	  .get( validate(productValidation.getProducts), productController.getProducts)
// 	  .post( upload.array('image', 6), validate(productValidation.postProduct), productController.addProduct)

// router.route('/:id')
// 	  .put( upload.array('image', 5), validate(productValidation.updateProduct), productController.updateProduct)
// 	  .delete(validate(productValidation.deleteProduct), productController.deleteProduct)
// 	  .get(productController.getDetailProduct)

// router.get('/typeProduct/type', validate(productValidation.getTypeProduct), typeController.getTypes)

// router.get('/categoryProduct/category', validate(productValidation.getCategoryProduct), categoryController.getCategories)

router.post("/login", userController.authUser);
// router.get("/profile", protectRoute, getUserProfile);

router.post("/", userController.registerUser);
// router.get("/", protectRoute, admin, getAllUsersByAdmin);
router
  .route("/profile")
  .get(protectRoute, userController.getUserProfile)
  .put(protectRoute, userController.updateUserProfile);

// router
//   .route("/:id")
//   .delete(protectRoute, admin, deleteUser)
//   .get(protectRoute, admin, getUserById)
//   .put(protectRoute, admin, updateUserByAdmin);

module.exports = router
