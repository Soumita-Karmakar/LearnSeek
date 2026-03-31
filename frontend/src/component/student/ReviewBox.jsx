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
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-yellow-400 flex items-center justify-center p-8">
      <div className="shadow-lg p-6 max-w-xl w-full bg-white/60 rounded-3xl backdrop-blur-lg border border-white/30">
        <h4 className="text-center mb-6 font-bold text-gray-800 text-lg">
          {existingReview ? "📝 Update Your Review" : "✍️ Write a Review"}
        </h4>

        {/* Rating */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-800 mb-2">Rating:</label>
          <select
            className="w-full px-4 py-2 rounded-full bg-yellow-50 border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
        <div className="mb-4">
          <label className="block font-semibold text-gray-800 mb-2">Review:</label>
          <textarea
            className="w-full p-3 rounded-xl shadow-sm bg-yellow-50 border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-end">
          <button
            onClick={handleSubmit}
            className="w-full font-bold rounded-full py-2 transition duration-300 tracking-wide bg-yellow-500 text-white hover:bg-yellow-600"
          >
            {existingReview ? "Update Review ✅" : "Submit Review 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
