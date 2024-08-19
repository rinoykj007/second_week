const mongoose = require("mongoose");

// Define the Category schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure category names are unique
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to another Category
      default: null, // Allow for top-level categories
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

// Create the Category model from the schema
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
