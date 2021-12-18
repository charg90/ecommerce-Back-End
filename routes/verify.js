const express = require("express");
const router = express.Router();
const verifyController = require("./../controllers/verifyController");

router.put("/:uid", verifyController.verify);

module.exports = router;
