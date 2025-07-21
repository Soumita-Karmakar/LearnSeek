import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReviewBox = () => {
  const { studentId, teacherId } = useParams();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [existingReview, setExistingReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/reviews/check/${studentId}/${teacherId}`);
        const data = await res.json();
        if (res.ok && data) {
          setExistingReview(data);
          setReview(data.content);
          setRating(data.rating || 5);
        }
      } catch (err) {
        console.error("Error loading review:", err);
      }
    };

    fetchReview();
  }, [studentId, teacherId]);

  const handleSubmit = async () => {
    if (!review.trim()) return toast.warn("Please write a review first.");

    try {
      const res = await fetch(`http://localhost:8000/api/reviews/${studentId}/${teacherId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: review, rating }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Review submitted!");
        navigate("/myreviews");
      } else {
        toast.error(data.message || "Review failed");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fceabb, #f8b500)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        className="shadow-lg p-4"
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.6)",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <h4 className="text-center mb-4 fw-bold text-dark">
          {existingReview ? "📝 Update Your Review" : "✍️ Write a Review"}
        </h4>

        {/* Rating */}
        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">Rating:</label>
          <select
            className="form-select rounded-pill px-3 py-2"
            style={{ backgroundColor: "#fff9e6", border: "1px solid #f0c36d" }}
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>
                {"⭐".repeat(val)} ({val})
              </option>
            ))}
          </select>
        </div>

        {/* Review Text */}
        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">Review:</label>
          <textarea
            className="form-control rounded-4 shadow-sm"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
            style={{ backgroundColor: "#fffef2", border: "1px solid #f0c36d" }}
          />
        </div>

        {/* Submit Button */}
        <div className="text-end">
          <button
            onClick={handleSubmit}
            className="btn w-100 fw-bold rounded-pill"
            style={{
              backgroundColor: "#ff9900",
              color: "#fff",
              transition: "0.3s",
              letterSpacing: "0.5px",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e68a00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff9900")}
          >
            {existingReview ? "Update Review ✅" : "Submit Review 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
