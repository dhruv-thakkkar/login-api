const jwt = require("jsonwebtoken");
const User = require("../Models/Users.model");
var ObjectId = require("mongodb").ObjectId;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    var o_id = new ObjectId(decode.id);
    const user = await User.findOne({ _id: o_id, password: decode.password });
    if (user) {
      next();
    }
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
