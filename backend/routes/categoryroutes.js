const express = require("express")
const categoryService = require("../services/categoryService")
const router = express.Router()

router.get("/get",categoryService.getCategories);
router.get("/get/:id",categoryService.getCategoryById);
router.post("/add",categoryService.addCategory);
router.put("/update/:id",categoryService.updateCategory);
router.delete("/delete/:id",categoryService.deleteCategory);
module.exports = router
