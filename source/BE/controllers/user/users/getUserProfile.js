const User = require('../../../models/User.model')
const generateToken = require("../../../utils/generateToken");
const { BadRequestError } = require('../../../helpers/errors')

async function getUserProfile(req, res, next) {

  const user = await User.findOne(req.user._id);

  console.log(req.user._id)
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    throw new BadRequestError("User not found");
  }

}

module.exports = getUserProfile;
