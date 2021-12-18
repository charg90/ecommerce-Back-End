const Usuario = require("./../models/usuariosModels");

exports.verify = async (req, res) => {
  const { uid } = req.params;
  console.log(uid);
  try {
    const user = await Usuario.findOne({ uuid: uid });
    console.log(user);
    if (user) {
      const confirmation = await Usuario.findByIdAndUpdate(user.id, {
        confirmacion: true,
      });

      res.status(200), res.json("validacion exitosa");
    }
  } catch (err) {
    console.log(err);
    res.status(406).json("error en validacion");
  }
};
