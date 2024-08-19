const mongoose = require("mongoose");

// Define the Order schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId, // Should be ObjectId
          ref: "Product", // Reference to the Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingAddress: {
      street: {
        type: String,
        trim: true,
        required: true,
      },
      city: {
        type: String,
        trim: true,
        required: true,
      },
      state: {
        type: String,
        trim: true,
        required: true,
      },
      postalCode: {
        type: String,
        trim: true,
        required: true,
      },
      country: {
        type: String,
        trim: true,
        required: true,
      },
    },
    billingAddress: {
      street: {
        type: String,
        trim: true,
        required: true,
      },
      city: {
        type: String,
        trim: true,
        required: true,
      },
      state: {
        type: String,
        trim: true,
        required: true,
      },
      postalCode: {
        type: String,
        trim: true,
        required: true,
      },
      country: {
        type: String,
        trim: true,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"], // Ensure these match the values you are using
      default: "unpaid",
    },
  },
  {
    timestamps: true,
  }
);

// Create the Order model from the schema
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
