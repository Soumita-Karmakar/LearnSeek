import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TeacherDetails = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getTeacher = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/teacher/teacherDetails/${id}`);
        const result = await response.json();

        if (!response.ok) {
          setError(result.message || "Error fetching teacher");
        } else {
          setTeacher(result);
        }
      } catch (err) {
        setError("Network error");
      }
    };

    getTeacher();
  }, [id]);

  const handleChat = () => {
    if (!user || user.role !== "student") {
      toast.warn("Only logged-in students can start a chat");
      return navigate("/login");
    }
    navigate(`/chat/${user.id}/${teacher._id}`);
  };

  const handleReviewSubmit = async () => {
    if (!user || user.role !== "student") {
      toast.warn("Only logged-in students can give reviews");
      return navigate("/login");
    }

    if (!reviewText.trim()) {
      toast.warn("Please enter a review before submitting");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/reviews/${user.id}/${teacher._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: reviewText, rating }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to submit review");
      } else {
        toast.success("Review submitted successfully!");
        setReviewText("");
        setRating(5);
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  if (error) return <p className="text-danger text-center">{error}</p>;
  if (!teacher) return <p className="text-center">Loading...</p>;

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        padding: "2rem",
      }}
    >
      <div
        className="card shadow border-0 p-4"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
      >
        <div className="text-center mb-4">
          <img
            src={teacher.profileImage || "/default-profile.png"}
            alt="Teacher"
            className="rounded-circle shadow border border-3 border-info mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-profile.png";
            }}
          />
          <h3 className="fw-bold">{teacher.name}</h3>
          <p className="text-secondary">{teacher.email}</p>
        </div>

        <div className="mb-4" style={{ fontSize: "0.95rem" }}>
          {teacher.phone && <p><strong>📞 Phone:</strong> {teacher.phone}</p>}
          {teacher.city && <p><strong>🏙️ City:</strong> {teacher.city}</p>}
          {teacher.qualification && <p><strong>🎓 Qualification:</strong> {teacher.qualification}</p>}
          {teacher.experience && <p><strong>📅 Experience:</strong> {teacher.experience} years</p>}
          {teacher.subjects && (
            <p><strong>📘 Subjects:</strong> {Array.isArray(teacher.subjects) ? teacher.subjects.join(', ') : teacher.subjects}</p>
          )}
          {teacher.availability && <p><strong>⏰ Availability:</strong> {teacher.availability}</p>}
          {teacher.mode && <p><strong>💻 Mode:</strong> {teacher.mode}</p>}
          {teacher.fee && <p><strong>💰 Fee:</strong> ₹{teacher.fee}</p>}
          {teacher.bio && <p><strong>📝 Bio:</strong> {teacher.bio}</p>}
        </div>

        <div className="text-center mb-4">
          <button
            className="btn btn-outline-primary px-4 py-2 fw-semibold"
            onClick={handleChat}
          >
            💬 Start Chat
          </button>
        </div>

        <div className="border-top pt-4">
          <h5 className="fw-bold mb-3 text-center text-success">🗨️ Leave a Review</h5>

          <div className="mb-3">
            <label className="form-label fw-semibold">Rating</label>
            <select
              className="form-select"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val}>{val} ⭐</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Your Review</label>
            <textarea
              className="form-control"
              rows="3"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Describe your learning experience..."
            />
          </div>

          <button
            className="btn btn-success w-100 fw-bold"
            onClick={handleReviewSubmit}
          >
            ✅ Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
