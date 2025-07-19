const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// More specific first
router.get("/check/:studentId/:teacherId", reviewController.getReviewByStudentAndTeacher);
router.get("/byStudent/:studentId", reviewController.getReviewsByStudent);
router.get("/recent", reviewController.getRecentReviews); // ✅ NEW for homepage
router.post("/:studentId/:teacherId", reviewController.createReview);
router.get("/:teacherId", reviewController.getReviewsByTeacher);

module.exports = router;
