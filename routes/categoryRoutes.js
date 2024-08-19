const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");

// Route to create a new category
router.post("/", categoryController.createCategory);

// Route to get all categories
router.get("/", categoryController.getAllCategories);

// Route to get a category by ID
router.get("/:id", categoryController.getCategoryById);

// Route to update a category by ID
router.put("/:id", categoryController.updateCategoryById);

// Route to delete a category by ID
router.delete("/:id", categoryController.deleteCategoryById);

module.exports = router;
