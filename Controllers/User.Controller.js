const createError = require("http-errors");
const User = require("../Models/Users.model");
const JWT = require("jsonwebtoken");

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = req.body;
      const doExists = await User.findOne({ email: result.email });
      if (doExists) {
        throw createError.Conflict(
          `${result.email} is already been registered`
        );
      }
      const user = new User(result);
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = req.body;
      const user = await User.findOne({ email: result.email });
      if (!user) throw createError.NotFound("User not registered");

      const isMatch = await user.passwordCheck(result.password);
      if (!isMatch) {
        throw createError.Unauthorized("Username/password not valid");
      }

      const payload = {
        id: user._id,
        password: user.password,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      JWT.sign(payload, secret, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }
        res.send({ accessToken: token });
      });
    } catch (error) {
      next(error);
    }
  },

  userDetails: async (req, res, next) => {
    try {
      const user = await User.find();
      res.send(user);
    } catch (error) {
      next(error);
    }
  },
};
