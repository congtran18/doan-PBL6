const Order = require('../../../models/Order.model')

async function getOrdersTrack(req, res, next) {

    let query;
    let total;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * pageSize;

    const {filters, types, categories} = req.query;
    var Orderfilter = {}

    if(filters){
        Orderfilter.realname = new RegExp(filters, 'i');
    }
    // if(types){
    //     productfilter.type = types;
    // }
    // if(categories){
    //     productfilter.category = categories;
    // }

    query = await Order.find({...Orderfilter, ... {track : false}}).sort({createdAt:-1}).populate("user", "id name email").skip(skip).limit(pageSize);

    total = await Order.countDocuments({...Orderfilter, ... {track : false}});

    const pages = Math.ceil(total / pageSize);

    const result = await query;

    res.status(200).send({
        success: true,
        message: "Successfully fetched Orders List",
        count: result.length, page, pages, data: result 
    });

}

module.exports = getOrdersTrack;
