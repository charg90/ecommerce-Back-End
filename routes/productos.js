const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");
const productosController = require("./../controllers/productosController");
router.get("/", productosController.getProducts);
router.post("/", auth, productosController.postProduct);
router.get("/:id", productosController.getSingle);
router.put("/:id", auth, productosController.productUpdate);
router.patch("/:id", productosController.productDelete);
module.exports = router;
