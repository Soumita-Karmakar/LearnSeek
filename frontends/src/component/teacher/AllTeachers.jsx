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
          console.log(result.error);
          setError(result.error || "Something went wrong");
        } else {
          setData(result);
        }
      } catch (err) {
        console.error("Fetch error:", err);
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
    <div className="container mt-4">
      <h2>All Teachers</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="row">
        {data.length > 0 ? (
          data.map((teacher, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{teacher.name}</h5>
                  <p className="card-text">Subject: {teacher.subjects}</p>
                  <p className="card-text">City: {teacher.city}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewProfile(teacher._id)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No teachers available.</p>
        )}
      </div>
    </div>
  );
};

export default AllTeachers;
