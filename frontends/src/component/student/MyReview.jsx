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
    <div className="container mt-4">
      <h2 className="text-center">My Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews given yet.</p>
      ) : (
        <ul className="list-group">
          {reviews.map((review, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{review.teacher?.name || "Teacher"}</strong>
                <br />
                <small className="text-muted">{review.content}</small>
                <div><strong>Rating:</strong> {review.rating} / 5</div>
                <div className="text-muted small">{new Date(review.timestamp).toLocaleString()}</div>
              </div>
              <Link to={`/review/${user.id}/${review.teacher._id}`} className="btn btn-outline-primary">
                View / Edit Review
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReview;
