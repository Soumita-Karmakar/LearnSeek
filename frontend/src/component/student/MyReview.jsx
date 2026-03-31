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
    <div className="min-h-screen bg-gradient-to-br from-[#c2e9fb] to-[#a1c4fd] p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">My Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-600">No reviews given yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="p-6 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg flex flex-col justify-between h-full text-gray-800">
                <div>
                  <h5 className="font-bold text-lg mb-2">
                    👩‍🏫 {review.teacher?.name || "Teacher"}
                  </h5>
                  <p className="mb-2">{review.content}</p>

                  <div
                    className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
                      review.rating >= 4
                        ? "bg-green-600"
                        : review.rating >= 3
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }`}
                  >
                    Rating: {review.rating} / 5
                  </div>

                  <div className="text-sm text-gray-600 mt-2">
                    {new Date(review.timestamp).toLocaleString()}
                  </div>
                </div>

                <div className="mt-4 text-right">
                  <Link
                    to={`/review/${user.id}/${review.teacher?._id}`}
                    className="inline-block border border-gray-800 text-gray-800 text-sm rounded-full px-4 py-1 hover:bg-gray-800 hover:text-white transition"
                  >
                    View / Edit
                  </Link>
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
