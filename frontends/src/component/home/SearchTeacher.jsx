import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SearchTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams(useLocation().search).get("query") || "";

  useEffect(() => {
    const fetchTeachers = async () => {
      if (!query) return;

      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:8000/api/teacher/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Something went wrong");
        } else {
          setTeachers(data);
        }
      } catch {
        setError("Network error");
      }

      setLoading(false);
    };

    fetchTeachers();
  }, [query]);

  return (
    <div
      className="py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fdfbfb, #ebedee)",
      }}
    >
      <div className="container">
        <h2 className="text-center fw-bold mb-5 text-dark">🔍 Search Results for Teachers</h2>

        {loading && <p className="text-center text-muted">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row">
          {teachers.length > 0 ? (
            teachers.map((teacher, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div
                  className="card border-0 shadow-lg h-100"
                  style={{
                    borderRadius: "20px",
                    background: "#ffffff",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <div className="card-body p-4">
                    <h5 className="fw-bold text-primary">{teacher.name}</h5>
                    <p className="mb-1"><strong>📍 City:</strong> {teacher.city}</p>
                    <p><strong>📘 Subjects:</strong> {teacher.subjects?.join(", ")}</p>
                    <Link
                      to={`/teacher/${teacher._id}`}
                      className="btn btn-outline-primary w-100 mt-3"
                      style={{ borderRadius: "12px" }}
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <div className="text-center text-muted mt-4">
                <p>No teachers found matching your query.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchTeacher;
