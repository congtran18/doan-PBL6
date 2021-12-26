const User = require('../../../models/User.model')
const generateToken = require("../../../utils/generateToken");

async function authUser(req, res, next) {

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Email and password invalid!!!");
  }
}

module.exports = authUser;
