const Product = require('../../../models/Product.model')

async function getProducts(req, res, next) {

    let query;
    let total;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * pageSize;

    const {filters, types, categories} = req.query;
    var productfilter = {}

    if(filters){
        productfilter.realname = new RegExp(filters, 'i');
    }
    if(types){
        productfilter.type = types;
    }
    if(categories){
        productfilter.category = categories;
    }

    query = await Product.find({...productfilter, ...{track : true}}).sort({createdAt:-1}).populate('type').populate('category').skip(skip).limit(pageSize);

    total = await Product.countDocuments({...productfilter, ...{track : true}});

    const pages = Math.ceil(total / pageSize);

    const result = await query;

    res.status(200).send({
        success: true,
        message: "Successfully fetched Products List",
        count: result.length, page, pages, data: result 
    });

}

module.exports = getProducts;
