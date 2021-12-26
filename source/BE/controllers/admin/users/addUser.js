const User = require('../../../models/User.model')
const { BadRequestError } = require('../../../helpers/errors')
var mongoose = require('mongoose');
const removeKeyNotValue = require('../../../helpers/removeKeyNotValue');

async function addUser(req, res, next) {
	const { name, isAdmin, email, password} = req.body

	try {
		const newUser = new User({
			// user: req.user._id,
			name,
			isAdmin,
			email,
            password,
		})

        removeKeyNotValue(newUser);

		await newUser.save()

		res.status(200).send({
			success: true,
			message: 'THÊM TÀI KHOẢN THÀNH CÔNG!',
			newUser: newUser,
		});

		// console.log(newOrder)
	} catch (error) {
		console.log(error)
		throw new BadRequestError("Add User fail!");
	}

}

module.exports = addUser;