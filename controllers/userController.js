const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../Utility/generateToken.js");

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
    if (!user) return res.status(404).json({ msg: "User not found" });
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
    const updateData = { username, email, role, address, contactNumber };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      // updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
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
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Sign-up and login controllers

exports.signupAndLogin = {
  signup: async (req, res) => {
    try {
      const { username, email, password, address, contactNumber } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

      const newUser = new User({
        username,
        email,
        password: hashedPassword, // Save the hashed password
        address,
        contactNumber,
      });

      await newUser.save();
      res
        .status(201)
        .json({ message: "User created successfully", userId: newUser._id });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = generateToken(user);
      console.log("Generated Token:", token);

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error", error });
    }
  },
};
