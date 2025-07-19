import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

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
    <div className="container mt-4">
      <h2>Your Teachers</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row mt-3">
        {teachers.length > 0 ? (
          teachers.map((teacher, i) => (
            <div className="col-md-4 mb-3" key={i}>
              <div className="card p-3">
                <h5>{teacher.name}</h5>
                <p><strong>City:</strong> {teacher.city}</p>
                <p><strong>Subjects:</strong> {teacher.subjects?.join(", ")}</p>
                <Link to={`/teacher/${teacher._id}`} className="btn btn-primary ">
                    View Profile
                </Link>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No teachers found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchTeacher;
