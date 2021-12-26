const asyncHandler = require('../../../helpers/asyncHandler');
const getUserById = require('./getUserById');
const registerUser = require('./registerUser');
const updateUserProfile = require('./updateUserProfile');
const authUser = require('./authUser');
const getUserProfile = require('./getUserProfile');

module.exports = {
    getUserById: asyncHandler(getUserById),
    registerUser: asyncHandler(registerUser),
    updateUserProfile: asyncHandler(updateUserProfile),
    authUser: asyncHandler(authUser),
    getUserProfile: asyncHandler(getUserProfile),
};