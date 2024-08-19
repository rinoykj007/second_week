const express = require("express");
const connectDB = require("./db.js");

// Import route files, not model files
const userRoutes = require("./routes/userRoutes"); // Assuming your user routes are defined in `userRoutes.js`
const productRoutes = require("./routes/productRoutes"); // Assuming your product routes are defined in `productRoutes.js`
const categoryRoutes = require("./routes/categoryRoutes"); // Assuming your category routes are defined in `categoryRoutes.js`
const orderRoutes = require("./routes/orderRoutes.js");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
