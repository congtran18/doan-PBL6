const mongoose = require('mongoose')
const Schema = mongoose.Schema

//con
const ProductCategorySchema = new Schema({
	realname: {
		type: String,
		required: true,
        unique: true
	},
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'producttypes'
	}
})

module.exports = mongoose.model('productcategoris', ProductCategorySchema)