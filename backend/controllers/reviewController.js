const Review = require("../models/review");

// ✅ Create or Update Review (only one review per student-teacher)
const createReview = async (req, res) => {
  const { studentId, teacherId } = req.params;
  const { content, rating } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ message: "Review content is required." });
  }

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5." });
  }

  try {
    // Check if review already exists
    const existingReview = await Review.findOne({ student: studentId, teacher: teacherId });

    if (existingReview) {
      existingReview.content = content;
      existingReview.rating = rating;
      existingReview.timestamp = Date.now();
      await existingReview.save();
      return res.status(200).json({ message: "Review updated successfully." });
    }

    const newReview = new Review({ student: studentId, teacher: teacherId, content, rating });
    await newReview.save();
    return res.status(201).json({ message: "Review submitted successfully." });

  } catch (err) {
    console.error("Review submit error:", err);
    res.status(500).json({ message: "Server error submitting review." });
  }
};

// ✅ Get all reviews for a teacher
const getReviewsByTeacher = async (req, res) => {
  try {
    const reviews = await Review.find({ teacher: req.params.teacherId })
      .populate("student", "name email profileImage")
      .sort({ timestamp: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Review fetch error (teacher):", err);
    res.status(500).json({ message: "Error fetching reviews for teacher." });
  }
};

// ✅ Get all reviews by a student
const getReviewsByStudent = async (req, res) => {
  try {
    const reviews = await Review.find({ student: req.params.studentId })
      .populate("teacher", "name")
      .sort({ timestamp: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Review fetch error (student):", err);
    res.status(500).json({ message: "Error fetching reviews by student." });
  }
};

// ✅ Check if review exists between student and teacher
const getReviewByStudentAndTeacher = async (req, res) => {
  try {
    const review = await Review.findOne({
      student: req.params.studentId,
      teacher: req.params.teacherId,
    }).populate("teacher", "name");

    res.status(200).json(review || null);
  } catch (err) {
    console.error("Review existence check error:", err);
    res.status(500).json({ message: "Error checking review." });
  }
};

// ✅ Get recent reviews (Homepage: Our Happy Learners)
const getRecentReviews = async (req, res) => {
  try {
    const allReviews = await Review.find()
      .sort({ timestamp: -1 })
      .populate("student", "name profileImage");

    const uniqueReviewsMap = new Map();

    for (const review of allReviews) {
      const studentId = review.student?._id?.toString();
      if (studentId && !uniqueReviewsMap.has(studentId)) {
        uniqueReviewsMap.set(studentId, {
          studentName: review.student.name || "Anonymous",
          studentImage: review.student.profileImage
            ? `http://localhost:8000/uploads/${review.student.profileImage}`
            : "",
          comment: review.content,
          rating: review.rating,
        });
      }
    }

    const recentUniqueReviews = Array.from(uniqueReviewsMap.values()).slice(0, 6);
    res.status(200).json(recentUniqueReviews);
  } catch (err) {
    console.error("Recent reviews fetch error:", err);
    res.status(500).json({ message: "Error loading recent reviews" });
  }
};

// ✅ Export
module.exports = {
  createReview,
  getReviewsByTeacher,
  getReviewsByStudent,
  getReviewByStudentAndTeacher,
  getRecentReviews,
};
