const Productos = require("../models/productosModels");
const Usuario = require("./../models/usuariosModels");

// funcion encargada de traer todo los productos
exports.getProducts = async (req, res) => {
  try {
    // llama a los productos y popula con la referencia de usuario
    const productos = await Productos.find({ eliminado: false }).populate(
      "usuario",
      {
        nombre: 1,
        email: 1,
      }
    );

    res.json(productos);
  } catch (err) {
    console.log(err);
    res.status(400).send("no se encontrado el producto");
  }
};
// funcion encargada de crear producto

exports.postProduct = async (req, res) => {
  try {
    const { nombre, precio, descripcion, usuario, img } = req.body;
    console.log(nombre, precio, descripcion, usuario);
    const user = await Usuario.findById(usuario);
    console.log(user.id);

    const newProduct = new Productos({
      nombre: nombre,
      precio: precio,
      img: img,
      descripcion: descripcion,
      eliminado: false,
      usuario: user._id,
    });

    const saveProduct = await newProduct.save();
    user.productos = user.productos.concat(newProduct);
    await user.save();
    res.json(saveProduct);
  } catch (err) {
    console.log(err);
  }
};
// funcion encargada de encontrar el producto elegido
exports.getSingle = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Productos.findById(id);
    console.log(product);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).send("producto no encontrado");
  }
};

exports.productUpdate = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const options = { new: true };
  try {
    const update = await Productos.findByIdAndUpdate(id, updates, options);
    res.status(200).json(update);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.productDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await Productos.findByIdAndUpdate(id, { eliminado: true });
    res.status(200).json({ id: id });
  } catch (err) {
    console.log(err);
  }
};
