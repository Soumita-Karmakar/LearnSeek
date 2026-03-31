import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    if (!user) {
      toast.warn("⚠️ Please log in to start a chat");
      return navigate("/login");
    }

    if (user.id === teacher._id) {
      toast.info("ℹ️ You cannot chat with yourself");
      return;
    }

    if (user.role === "student" || user.role === "teacher") {
      navigate(`/chat/${user.id}/${teacher._id}`);
    } else {
      toast.error("❌ You are not authorized to start a chat");
    }
  };

  const handleReviewSubmit = async () => {
    if (!user) {
      toast.warn("Please log in to submit a review");
      return navigate("/login");
    }

    if (user.role !== "student") {
      toast.error("Only students can submit reviews");
      return;
    }

    if (!reviewText.trim()) {
      toast.warn("Please write something in the review");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/reviews/${user.id}/${teacher._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: reviewText, rating }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to submit review");
      } else {
        toast.success("Review submitted successfully!");
        setReviewText("");
        setRating(5);
      }
    } catch {
      toast.error("Network error");
    }
  };

  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!teacher) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#f5f7fa] to-[#c3cfe2] p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6">
        <div className="text-center mb-6">
          <img
            src={teacher.profileImage || "/default-profile.png"}
            alt="Teacher"
            className="w-24 h-24 rounded-full object-cover border-4 border-cyan-400 shadow mx-auto mb-3"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-profile.png";
            }}
          />
          <h3 className="font-bold text-xl">{teacher.name}</h3>
          <p className="text-gray-500">{teacher.email}</p>
        </div>

        <div className="text-sm text-gray-700 space-y-2 mb-6">
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

        <div className="text-center mb-6">
          <button
            className="border border-blue-500 text-blue-600 font-semibold px-6 py-2 rounded hover:bg-blue-100 transition"
            onClick={handleChat}
          >
            💬 Start Chat
          </button>
        </div>

        <div className="border-t pt-4">
          <h5 className="font-bold text-center text-green-600 mb-4">🗨️ Leave a Review</h5>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Rating</label>
            <select
              className="w-full p-2 border rounded"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val}>{val} ⭐</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Your Review</label>
            <textarea
              className="w-full p-2 border rounded resize-none"
              rows="3"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Describe your learning experience..."
            />
          </div>

          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold w-full py-2 rounded"
            onClick={handleReviewSubmit}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
