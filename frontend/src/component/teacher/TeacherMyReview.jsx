import { useEffect, useState } from "react";

const TeacherMyReview = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/reviews/${user.id}`);
        const data = await res.json();
        if (res.ok) setReviews(data);
      } catch (err) {
        console.error("Error loading reviews:", err);
      }
    };

    if (user?.id) fetchReviews();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#d9f0e3] px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center mb-12 text-3xl font-bold bg-gradient-to-r from-[#2193b0] to-[#6dd5ed] bg-clip-text text-transparent">
          📋 Reviews From Students
        </h2>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet.</p>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="w-full max-w-2xl bg-white/80 rounded shadow-sm border-l-8 border-green-500 p-6"
              >
                <h5 className="text-lg font-semibold text-green-600 mb-2">
                  👤 From: {rev.student?.name || "Unknown"}
                </h5>
                <p className="mb-1"><strong>⭐ Rating:</strong> {rev.rating} / 5</p>
                <p className="mb-2"><strong>💬 Comment:</strong> {rev.content}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(rev.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherMyReview;
