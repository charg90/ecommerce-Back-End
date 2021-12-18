const Usuario = require("./../models/usuariosModels");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  //revisa errores del express validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  // compara el email y password para que sean correctos
  try {
    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      res.status(400).json({ msg: "usuario no existe" });
    }
    const passwordCorrect = await bcrypt.compare(password, usuario.password);

    if (!passwordCorrect) {
      return res.status(401).json({ msg: "password incorrecto" });
    }
    // si el password y usuario son correctos crea el token

    const payload = {
      usuario: {
        id: usuario._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_WORD,
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error;
        res.json({ token: token, usuario: usuario });
      }
    );
  } catch (err) {
    console.error(err);
  }
};
