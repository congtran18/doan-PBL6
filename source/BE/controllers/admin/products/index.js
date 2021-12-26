const asyncHandler = require('../../../helpers/asyncHandler');
const getProducts = require('./getProducts');
const addProduct = require('./addProduct');
const updateProduct = require('./updateProduct');
const deleteProduct = require('./deleteProduct');
const getDetailProduct = require('./getDetailProduct');
const createProductReview = require('./createProductReview');
const getCodeProduct = require('./getCodeProduct');
const getProductsTrack = require('./getProductsTrack');
const trackProduct = require('./trackProduct')

module.exports = {
    getProducts: asyncHandler(getProducts),
    addProduct: asyncHandler(addProduct),
    updateProduct: asyncHandler(updateProduct),
    deleteProduct: asyncHandler(deleteProduct),
    getDetailProduct: asyncHandler(getDetailProduct),
    createProductReview: asyncHandler(createProductReview),
    getCodeProduct: asyncHandler(getCodeProduct),
    getProductsTrack: asyncHandler(getProductsTrack),
    trackProduct: asyncHandler(trackProduct),
};