import { useEffect, useState } from "react";

const TeacherMyReviews = () => {
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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f0f4f8, #d9f0e3)",
        padding: "3rem 1rem",
      }}
    >
      <div className="container">
        <h2 className="text-center mb-5 fw-bold" style={{
          background: "linear-gradient(to right, #2193b0, #6dd5ed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          📋 Reviews From Students
        </h2>

        {reviews.length === 0 ? (
          <p className="text-muted text-center">No reviews yet.</p>
        ) : (
          <div className="row justify-content-center">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="col-md-8 mb-4"
              >
                <div
                  className="shadow-sm p-4 rounded"
                  style={{
                    backgroundColor: "#ffffffcc",
                    borderLeft: "6px solid #4caf50",
                  }}
                >
                  <h5 className="fw-semibold mb-2 text-success">
                    👤 From: {rev.student?.name || "Unknown"}
                  </h5>
                  <p className="mb-1"><strong>⭐ Rating:</strong> {rev.rating} / 5</p>
                  <p className="mb-2"><strong>💬 Comment:</strong> {rev.content}</p>
                  <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                    {new Date(rev.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherMyReviews;
