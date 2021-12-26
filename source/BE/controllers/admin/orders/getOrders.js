const Order = require('../../../models/Order.model')

async function getOrders(req, res, next) {

    let query;
    let total;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * pageSize;

    // const {filters} = req.query;
    var Orderfilter = {}

    // if(filters){
    //     Orderfilter.realname = new RegExp(filters, 'i');
    // }
    // if(types){
    //     productfilter.type = types;
    // }
    // if(categories){
    //     productfilter.category = categories;
    // }

    query = await Order.find({...Orderfilter, ... {track : true}}).sort({createdAt:-1}).populate("user", "id name email").skip(skip).limit(pageSize);

    total = await Order.countDocuments({...Orderfilter, ... {track : true}});

    const pages = Math.ceil(total / pageSize);

    const result = await query;

    res.status(200).send({
        success: true,
        message: "Successfully fetched Orders List",
        count: result.length, page, pages, data: result 
    });

    // const orders = await Order.find({}).populate("user", "id name");

    // res.json(orders);

}

module.exports = getOrders;
