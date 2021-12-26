const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({

    realname: {
        type: String,
		trim: true,
    },

    mobile: {
        type: String,
		trim: true,
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "users",
    },
	description: {
		type: String,
		trim: true,
		// required: true
	},

    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
	// products: {
    //     type: [{
    //         productId: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'products',
    //         },
    //         count: {
    //             type: String,
    //             trim: true,
    //         },
    //     }],
    // },

    orderItems: [
        {
            realname: { type: String },
            qty: { type: Number, required: true },
            size: { type: String, required: true },
            color: { type: String, required: true },
            image: { type: String },
            cost: { type: Number },
            code: { type: String },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
        },
    ],

    shippingPrice: {
        type: Number,
        // required: true,
        default: 0.0,
    },

    taxPrice: {
        type: Number,
        // required: true,
        default: 0.0,
    },

	// code: {
	// 	type: String,
	// 	trim: true,
	// 	require: true
	// },

	// status: {
	// 	type: String,
	// 	trim: true,
	// 	default: 'Chưa thanh toán'
	// },

    itemsPrice: {
        type: Number,
        // required: true,
        default: 0.0,
    },
	
	totalPrice:{
		type: String,
		trim: true,
		required: true,
	},

    shippingAddress: [
        {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
    ],

    paymentMethod: {
        type: String,
        // required: true,
        default: 'Khi nhận hàng',
    },

    isPaid: {
        type: Boolean,
        // required: true,
        default: false,
    },

    isDelivered: {
        type: Boolean,
        // required: true,
        default: false,
    },

    status: {
        type: String,
        // required: true,
        default: 'Chuẩn bị hàng',
    },

    track: {
		type: Boolean,
		default: true
	},

    deliveredAt: {
        type: Date,
    },
}, {
	timestamps: true,
})

module.exports = mongoose.model('orders', OrderSchema)
