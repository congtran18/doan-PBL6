const asyncHandler = require('../../../helpers/asyncHandler');
const getCategories = require('./getCategories')
const addCategories = require('./addCategories')
const deleteCategories = require('./deleteCategories')
const getDetailCategory = require('./getDetailCategory')
const updateCategory = require('./updateCategory')

module.exports = {
    getCategories: asyncHandler(getCategories),
    addCategories: asyncHandler(addCategories),
    deleteCategories: asyncHandler(deleteCategories),
    getDetailCategory: asyncHandler(getDetailCategory),
    updateCategory: asyncHandler(updateCategory)
};