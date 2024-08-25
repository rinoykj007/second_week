const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController.js");
const authMiddleware = require("../Middleware/authMiddleware.js");

// Define the routes for the cart
router.get("/", authMiddleware, cartController.getCartItems);
router.post("/", authMiddleware, cartController.addItemToCart);
router.put("/:id", authMiddleware, cartController.updateCartItem);
router.delete("/:id", authMiddleware, cartController.removeItemFromCart);

module.exports = router;
