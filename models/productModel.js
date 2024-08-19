// const mongoose = require("mongoose");

// // Define the Product schema
// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     brand: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     stockQuantity: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     images: [
//       {
//         url: {
//           type: String,
//           required: true,
//         },
//         altText: {
//           type: String,
//           required: true,
//           trim: true,
//         },
//       },
//     ],
//     attributes: {
//       color: {
//         type: String,
//         trim: true,
//       },
//       size: {
//         type: String,
//         trim: true,
//       },
//       weight: {
//         type: String,
//         trim: true,
//       },
//       material: {
//         type: String,
//         trim: true,
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Create the Product model from the schema
// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;

const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    attributes: {
      color: {
        type: String,
        trim: true,
      },
      size: {
        type: String,
        trim: true,
      },
      weight: {
        type: String,
        trim: true,
      },
      material: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create the Product model from the schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
