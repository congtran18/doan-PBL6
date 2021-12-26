const User = require('../../../models/User.model')
const {
    BadRequestError
} = require('../../../helpers/errors')

async function getDetailUser(req, res, next) {

    const User = await User.findById(req.params.id).lean()

    if (User) {
        res.json(User);
    } else {
        throw new BadRequestError("User not found");
    }

}

module.exports = getDetailUser;