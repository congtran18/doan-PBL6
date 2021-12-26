const User = require('../../../models/User.model')

async function getUsers(req, res, next) {

    let query;
    let total;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * pageSize;

    const {filters, isAdmin} = req.query;
    var Userfilter = {}

    if(filters){
        Userfilter.realname = new RegExp(filters, 'i');
    }

    if(isAdmin){
        Userfilter.isAdmin = isAdmin;
    }

    query = await User.find({...Userfilter, ... {track : true}}).sort({createdAt:-1}).skip(skip).limit(pageSize);

    total = await User.countDocuments({...Userfilter, ... {track : true}});

    const pages = Math.ceil(total / pageSize);

    const result = await query;

    res.status(200).send({
        success: true,
        message: "Successfully fetched Users List",
        count: result.length, page, pages, data: result 
    });

}

module.exports = getUsers;
