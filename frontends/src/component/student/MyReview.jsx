import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyReview = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/reviews/byStudent/${user.id}`);
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
        background: "linear-gradient(135deg, #c2e9fb, #a1c4fd)",
        padding: "2rem",
      }}
    >
      <div className="container">
        <h2 className="text-center fw-bold mb-5 text-dark">My Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-center text-muted">No reviews given yet.</p>
        ) : (
          <div className="row g-4">
            {reviews.map((review, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div
                  className="p-4 h-100 shadow-lg"
                  style={{
                    background: "rgba(255, 255, 255, 0.25)",
                    borderRadius: "20px",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    color: "#333",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h5 className="fw-bold mb-2">
                      👩‍🏫 {review.teacher?.name || "Teacher"}
                    </h5>
                    <p className="mb-2">{review.content}</p>

                    <div
                      className="badge"
                      style={{
                        backgroundColor:
                          review.rating >= 4
                            ? "#28a745"
                            : review.rating >= 3
                            ? "#ffc107"
                            : "#dc3545",
                        color: "white",
                        fontSize: "0.9rem",
                        padding: "0.4em 0.8em",
                        borderRadius: "1rem",
                      }}
                    >
                      Rating: {review.rating} / 5
                    </div>

                    <div className="text-muted small mt-2">
                      {new Date(review.timestamp).toLocaleString()}
                    </div>
                  </div>

                  <div className="text-end mt-3">
                    <Link
                      to={`/review/${user.id}/${review.teacher._id}`}
                      className="btn btn-sm btn-outline-dark rounded-pill px-3"
                    >
                      View / Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReview;
