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
    <div className="container mt-4">
      <h2 className="text-center">Reviews From Students</h2>
      {reviews.length === 0 ? (
        <p className="text-muted text-center">No reviews yet.</p>
      ) : (
        <ul className="list-group">
          {reviews.map((rev, idx) => (
            <li key={idx} className="list-group-item">
              <strong>From:</strong> {rev.student?.name || "Unknown"}
              <br />
              <strong>Rating:</strong> {rev.rating} / 5
              <br />
              <strong>Comment:</strong> {rev.content}
              <br />
              <small className="text-muted">{new Date(rev.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherMyReviews;
