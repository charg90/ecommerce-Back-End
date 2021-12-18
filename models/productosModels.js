const { Schema, model } = require("mongoose");

const productosSchema = new Schema({
  eliminado: Boolean,
  nombre: String,
  precio: String,
  descripcion: String,

  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});
//modifica la propiedad de __id a id y tambien lo elimina
productosSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Producto = model("Producto", productosSchema);
module.exports = Producto;
