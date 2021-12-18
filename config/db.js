const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("conectado a MongoDB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
