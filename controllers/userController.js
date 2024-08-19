const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

// Create a new user
exports.createUser = async (req, res) => {
  const { username, email, password, role, address, contactNumber } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
      role,
      address,
      contactNumber,
    });

    await user.save();

    res.status(201).json({ msg: "User created successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  const { username, email, password, role, address, contactNumber } = req.body;

  try {
    // Hash new password if provided
    const updateData = { username, email, role, address, contactNumber };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Sign-up and Login combined in the same module
exports.signupAndLogin = {
  // Sign-up controller
  signup: async (req, res) => {
    try {
      const { username, email, password, phone, address } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Create a new user
      const newUser = new User({
        username,
        email,
        password, // This will be hashed by the pre-save middleware
        contactDetails: {
          phone,
          address,
        },
      });

      await newUser.save();
      res
        .status(201)
        .json({ message: "User created successfully", userId: newUser._id });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  // Login controller
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare the provided password with the hashed password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // If authentication is successful, you might want to create a session or a JWT token here
      res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
};
