const User = require('../../../models/User.model')
const generateToken = require("../../../utils/generateToken");

async function getUserById(req, res, next) {

    const user = await User.findOne(req.user._id);
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
}

module.exports = getUserById;
