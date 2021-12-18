const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

// llamada a conexion
connectDB();
// lectura de json
app.use(express.json({ extend: true }));
app.use(cors());
//routes
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/usuarios/:id", require("./routes/usuarios"));
app.use("/api/login", require("./routes/login"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/productos/:id", require("./routes/productos"));
app.use("/api/verify", require("./routes/verify"));
app.listen(process.env.PORT, () => {
  console.log(`server on port ${process.env.PORT}`);
});
