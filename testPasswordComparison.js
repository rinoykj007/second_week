const mongoose = require("mongoose");
const User = require("./models/userModel.js"); // Adjust the path as needed

const testPasswordComparison = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return;
    }

    const isMatch = await user.comparePassword(password);
    console.log("Password match:", isMatch);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Connect to your database
mongoose
  .connect("mongodb://localhost:27017/yourDatabaseName", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Call the test function
    testPasswordComparison("newuser@example.com", "YourTestPassword");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
