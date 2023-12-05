const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/User.Controller");
const verifyToken = require("../Middlewares/verification");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/user-details", verifyToken, UserController.userDetails);

module.exports = router;
