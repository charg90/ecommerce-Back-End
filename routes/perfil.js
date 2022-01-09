const express = require("express");
const router = express.Router();
const usuarioController = require("./../controllers/usuariosControllers");

router.get("/:id", usuarioController.getUserProducts);

module.exports = router;
