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
    <div className="container mt-4">
      <h4 className="text-center mb-3">Review Teacher</h4>
      <label>Rating (1–5):</label>
      <select
        className="form-select mb-2"
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>

      <textarea
        className="form-control"
        rows="5"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
      ></textarea>

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        {existingReview ? "Update Review" : "Submit Review"}
      </button>
    </div>
  );
};

export default ReviewBox;