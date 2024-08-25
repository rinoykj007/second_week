const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET } = process.env;

// const authMiddleware = (req, res, next) => {
//   if (!JWT_SECRET) {
//     console.error("JWT_SECRET is not defined in the environment variables.");
//     return res.status(500).json({ message: "Internal server error" });
//   }

//   // Get the token from the Authorization header
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   // Log the received token to verify its structure
//   console.log("Received token:", token); // <-- Log the token

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   // Verify the token
//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) {
//       console.error("Token verification failed:", err.message); // <-- Log the error message
//       return res.status(401).json({ message: "Invalid token" });
//     }
//     req.user = decoded;
//     next();
//   });
// };

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from header

  if (!token) return res.status(401).json({ message: "No token provided" });

  console.log("Received Token:", token);

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }
    // Check token expiration manually
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err && err.name === "TokenExpiredError") {
        console.error("Token expired");
      }
    });

    req.user = decoded; // Attach decoded token payload to request
    next();
  });
};

module.exports = authMiddleware;
