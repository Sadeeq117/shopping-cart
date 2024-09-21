const express = require("express")
const productService = require("../services/productService")
const router = express.Router()


router.get("/get",productService.getProducts);
router.get("/get/:id",productService.getProductById);
router.post("/add",productService.addProduct);
router.put("/update/:id",productService.updateProduct);
router.delete("/delete/:id",productService.deleteProduct);
module.exports = router