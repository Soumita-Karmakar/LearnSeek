import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllTeachers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/teacher/AllTeachers");
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Something went wrong");
        } else {
          setData(result);
        }
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    getData();
  }, []);

  const handleViewProfile = (teacherId) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/teacher/${teacherId}`);
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #f1f8e9)",
        padding: "2rem",
      }}
    >
      <h2 className="mb-4 text-primary fw-bold">👩‍🏫 All Teachers</h2>
      {error && <p className="text-danger">{error}</p>}

      <div className="d-flex flex-wrap justify-content-center gap-4">
        {data.length > 0 ? (
          data.map((teacher, index) => (
            <div
              key={index}
              className="card shadow"
              style={{
                width: "18rem",
                borderRadius: "1rem",
                backgroundColor: "#ffffffee",
              }}
            >
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-dark">{teacher.name}</h5>
                <p className="card-text mb-1">
                  📘 Subject: {Array.isArray(teacher.subjects) ? teacher.subjects.join(", ") : teacher.subjects}
                </p>
                <p className="card-text">🏙️ City: {teacher.city}</p>
                <button
                  className="btn btn-outline-warning text-primary w-100"
                  onClick={() => handleViewProfile(teacher._id)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No teachers available.</p>
        )}
      </div>
    </div>
  );
};

export default AllTeachers;
