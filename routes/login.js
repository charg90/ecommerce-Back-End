const express = require("express");
const router = express.Router();
const loginController = require("./../controllers/loginController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("email", "debes poner un nombre").isEmail(),
    check("password", "debes poner un contrase;a").not().isEmpty(),
  ],
  loginController.authUser
);

module.exports = router;
