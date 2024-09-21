const express = require("express")
const brandService = require("../services/brandService")
const router = express.Router()

router.get("/get",brandService.getBrands);
router.get("/get/:id",brandService.getBrandById);
router.post("/add",brandService.addBrand);
router.put("/update/:id",brandService.updateBrand);
router.delete("/delete/:id",brandService.deleteBrand);
module.exports = router