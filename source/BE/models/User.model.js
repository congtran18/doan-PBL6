const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator');
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		// validate(value) {
		// 	if (!value.match(/[a-zA-Z]/) || value.length < 5) {
		// 	  throw new Error('Name must contain letter and min length is 5');
		// 	}
		// },
	},
	email: {
      	type: String,
      	required: true,
    },
	password: {
		type: String,
		required: true,
		// validate(value) {
		// 	if (!value.match(/\d/) || !value.match(/[a-zA-Z]/) || value.length < 5) {
		// 	  throw new Error('Password must contain at least one letter and one number and min length is 5');
		// 	}
		// },
	},
	isAdmin: {
      	type: Boolean,
      	required: true,
      	default: false,
    },
	track: {
		type: Boolean,
		// required: true,
		default: true,
  	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('users', UserSchema)
