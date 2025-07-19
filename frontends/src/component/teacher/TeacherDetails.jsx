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

  if (error) return <p className="text-danger">{error}</p>;
  if (!teacher) return <p>Loading...</p>;

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
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Teacher Profile</h2>

      <div className="card mx-auto shadow" style={{ maxWidth: "700px" }}>
        <div className="card-body text-center">
          <img
            src={teacher.profileImage || "/default-profile.png"}
            alt="Teacher"
            width={120}
            height={120}
            style={{ borderRadius: "50%", objectFit: "cover", marginBottom: "1rem" }}
          />
          {teacher.name && <h4 className="card-title">{teacher.name}</h4>}
          {teacher.email && <h6 className="card-subtitle mb-2 text-muted">{teacher.email}</h6>}
        </div>

        <div className="card-body">
          {teacher.phone && <p><strong>Phone:</strong> {teacher.phone}</p>}
          {teacher.city && <p><strong>City:</strong> {teacher.city}</p>}
          {teacher.qualification && <p><strong>Qualification:</strong> {teacher.qualification}</p>}
          {teacher.experience && <p><strong>Experience:</strong> {teacher.experience} years</p>}
          {teacher.subjects && (
            <p>
              <strong>Subjects:</strong>{" "}
              {Array.isArray(teacher.subjects) ? teacher.subjects.join(', ') : teacher.subjects}
            </p>
          )}
          {teacher.availability && <p><strong>Availability:</strong> {teacher.availability}</p>}
          {teacher.mode && <p><strong>Mode:</strong> {teacher.mode}</p>}
          {teacher.fee && <p><strong>Fee:</strong> ₹{teacher.fee}</p>}
          {teacher.bio && <p><strong>Bio:</strong> {teacher.bio}</p>}

          <button className="btn btn-outline-primary mt-3" onClick={handleChat}>
            Start Chat with {teacher.name}
          </button>

          <div className="mt-4">
            <h5>Write a Review</h5>
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
              rows="3"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this teacher..."
            />
            <button className="btn btn-primary mt-2" onClick={handleReviewSubmit}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
