const express = require("express");
const router = express.Router();
const usuarioController = require("./../controllers/usuariosControllers");
// express validator extraigo check
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("nombre", "es obligatorio").not().isEmpty(),
    check("email", "email es obligatorio").isEmail(),
    check("password", "password debe tener mas de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  usuarioController.crearUsuario
);
router.get("/:id", usuarioController.getUser);

module.exports = router;
