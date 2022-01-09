const Usuario = require("./../models/usuariosModels");
const Productos = require("./../models/productosModels");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const productosController = require("./../models/productosModels");
const emailer = require("./../utils/emailer");
const { v4: uuid } = require("uuid");

exports.crearUsuario = async (req, res) => {
  // validar con express-validator si los datos llegaron correctamente

  const error = validationResult(req, res);
  if (!error.isEmpty()) {
    return res.status(400).json({ errores: error.array() });
  }
  // creacion de usuario y validacion de que se crea no sea existente

  try {
    const { email, password, nombre } = req.body;
    // a traves de funcion de mongoose compruebo de que mail exista
    let usuario = await Usuario.findOne({ email });
    usuario ? res.status(400).json("usuario ya registrado") : null;

    const uid = uuid();

    // creacion de usuario y encriptacion de password
    usuario = new Usuario({
      nombre: nombre,
      email: email,
      password: password,
      uuid: uid,
    });
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);
    await emailer.sendMail(usuario);
    // usuario guardado
    await usuario.save();

    res.status(200).json(usuario);
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await Usuario.findById(id).populate(
      { path: "productos", match: { eliminado: false } }
      /*
      {
        eliminado: 1,
        nombre: 1,
        descripcion: 1,
        precio: 1,
      }
      */
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send("usuario no existe");
  }
};

exports.getUserProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const userProduct = await Productos.find({ usuario: id });
    res.json(userProduct);
  } catch (err) {}
};
