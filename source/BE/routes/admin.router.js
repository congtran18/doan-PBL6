const express = require('express')
const router = express.Router()

const {
    userController,
} = require('../controllers/admin');


router.route('/')
    .get(userController.getUsers)
    .post(userController.addUser)

router.route('/:id')
    .put(userController.updateUser)
    .delete(userController.deleteUser)
    .get(userController.getDetailUser)

router.route('/track-user/track').get(userController.getUserTrack)

router.route('/track/:id').put(userController.trackUser)


module.exports = router