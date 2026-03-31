import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AllTeacher = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
    <div className="min-h-screen bg-gradient-to-tr from-cyan-100 to-lime-200 p-6">
      <h2
        className="text-center text-3xl font-extrabold text-blue-700 mb-10  decoration-4"
        data-aos="zoom-in"
      >
        👩‍🏫 Meet Our Teachers
      </h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="flex flex-wrap justify-center gap-8">
        {data.length > 0 ? (
          data.map((teacher, index) => (
            <div
              key={index}
              className="w-72 rounded-2xl p-5 shadow-xl bg-white/60 backdrop-blur-md border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              data-aos="fade-up"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={teacher.profileImage || "/default-profile.png"}
                  alt="teacher"
                  className="w-20 h-20 rounded-full object-cover mb-3 border-4 "
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-profile.png";
                  }}
                />
                <h5 className="text-lg font-bold text-blue-800 mb-1">
                  {teacher.name}
                </h5>
                <p className="text-gray-700 mb-1">
                  📘 <span className="font-medium">Subjects:</span>{" "}
                  {Array.isArray(teacher.subjects)
                    ? teacher.subjects.join(", ")
                    : teacher.subjects}
                </p>
                <p className="text-gray-600 mb-4">🏙️ City: {teacher.city}</p>
                <button
                  onClick={() => handleViewProfile(teacher._id)}
                  className="border-2 border-yellow-400 text-blue-800 font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 transition duration-300"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No teachers available.</p>
        )}
      </div>
    </div>
  );
};

export default AllTeacher;
