const User = require('../../../models/User.model')
const { BadRequestError } = require('../../../helpers/errors')
const removeKeyNotValue = require('../../../helpers/removeKeyNotValue');
const bcrypt = require('bcryptjs');

async function updateUser(req, res, next) {
    let { name, isAdmin, email, password } = req.body

    password = await bcrypt.hash("12345aA@", 10);

    let updateUser;

    try {
        updateUser = {
            name,
            isAdmin,
            email,
            password,
        }

        removeKeyNotValue(updateUser);

        updateUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateUser },
            { new: true, useFindAndModify: false }
        )

        res.status(200).send({
            success: true,
            message: "CẬP NHẬT TÀI KHOẢN THÀNH CÔNG!",
            updateUserObj: updateUser,
        });
    } catch (error) {
        console.log(error)
        throw new BadRequestError("Error occur when update User!");
    }

}

module.exports = updateUser;