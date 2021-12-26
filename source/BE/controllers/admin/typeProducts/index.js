const asyncHandler = require('../../../helpers/asyncHandler');
const getTypes = require('./getTypes')

module.exports = {
    getTypes: asyncHandler(getTypes),
};