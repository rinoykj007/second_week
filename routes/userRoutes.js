const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { signupAndLogin } = require("../controllers/userController"); // Ensure the correct path and import

// Routes for user operations
router.post("/", userController.createUser); // Create a new user
router.get("/", userController.getAllUsers); // Get all users
router.get("/:id", userController.getUserById); // Get a user by ID
router.put("/:id", userController.updateUserById); // Update a user by ID
router.delete("/:id", userController.deleteUserById); // Delete a user by ID

// Routes for authentication
router.post("/signup", signupAndLogin.signup); // User sign-up
router.post("/login", signupAndLogin.login); // User login

module.exports = router;
