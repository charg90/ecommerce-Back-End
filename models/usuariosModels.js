const { Schema, model } = require("mongoose");

const usuariosSchema = new Schema({
  nombre: {
    type: "string",
    required: true,
    trim: true,
  },
  email: {
    type: "string",
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
    trim: true,
  },
  registro: {
    type: Date,
  },
  uuid: { type: "string" },
  confirmacion: { type: Boolean, default: false },
  productos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Producto",
    },
  ],
});

//modifica la propiedad de __id a id y tambien lo elimina
usuariosSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Usuario = model("Usuario", usuariosSchema);
module.exports = Usuario;
