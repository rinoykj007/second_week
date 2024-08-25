// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware.js");
const reviewController = require("../controllers/reviewController.js");

// Apply authentication middleware
router.use(authMiddleware);

// Define routes
router.post("/", reviewController.createReview);
router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);
router.put("/:id", reviewController.updateReviewById);
router.delete("/:id", reviewController.deleteReviewById);

module.exports = router;
