const mongoose = require('mongoose')
const validator = require('validator');
const Schema = mongoose.Schema;

const reviewsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new Schema({
	realname: {
		type: String,
		trim: true,
		required: true
	},
	code: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	status: {
		type: String,
		trim: true,
		enum: ['Mới', 'Nổi bật', 'Bình thường'],
		default: 'Mới'
	},
	
	discount:{
		type: String,
		trim: true,
		// required: true,
	},
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'producttypes',
		required: true
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'productcategoris',
		required: true
	},
	cost: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	image: {
		type: Array,
		required: [true, "Image is required"],
	},
	color: {
		type: Array,
		required: [true, "color is required"],
	},
	size: {
		type: Array,
		required: [true, "size is required"],
	},

	reviews: [reviewsSchema],

    rating: {
      	type: Number,
      	// required: true,
      	default: 5,
    },
	numReviews: {
      	type: Number,
      	// required: true,
      	default: 0,
    },
	// ratingStar: {
    //     type: {
    //         ratingStar: {
    //             type: Number,
    //             default: 0,
    //         },
    //         ratingCount: {
    //             type: Number,
    //             default: 0,
    //         },
    //         ratingValue: {
    //             type: Number,
    //             default: 0,
    //         }
    //     },
    //     default: { 'ratingStar': 5, 'ratingCount': 1, 'ratingValue': 5 }
    // },
	track: {
		type: Boolean,
		default: true
	},
}, {
	timestamps: true,
})

module.exports = mongoose.model('products', ProductSchema)
