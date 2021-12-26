const asyncHandler = require('../../../helpers/asyncHandler');
const addUser = require('./addUser');
const deleteUser = require('./deleteUser');
const getDetailUser = require('./getDetailUser');
const getUsers = require('./getUsers');
const getUserTrack = require('./getUserTrack');
const trackUser = require('./trackUser')
const updateUser = require('./updateUser')

module.exports = {
    addUser: asyncHandler(addUser),
    deleteUser: asyncHandler(deleteUser),
    getDetailUser: asyncHandler(getDetailUser),
    getUsers: asyncHandler(getUsers),
    getUserTrack: asyncHandler(getUserTrack),
    trackUser: asyncHandler(trackUser),
    updateUser: asyncHandler(updateUser),
};