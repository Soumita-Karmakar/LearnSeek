import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-r from-[#e0f7fa] to-[#f1f8e9] py-16 px-4">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 animate-fade-in">
        Here Are the Mentors You Were Looking For 🔍💡
      </h2>

      {loading && (
        <p className="text-center text-blue-600 font-medium text-lg animate-pulse">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {teachers.length > 0 ? (
          teachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 transition duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">{teacher.name}</h3>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">📍 City:</span> {teacher.city}
              </p>

              <div className="mb-4">
                <span className="font-semibold text-gray-600">📘 Subjects:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(teacher.subjects || []).map((subj, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/teacher/${teacher._id}`}
                className="inline-block w-full text-center py-2 mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition duration-300"
              >
                View Profile
              </Link>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center text-gray-600 text-lg mt-10">
              No teachers found matching your query.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchTeacher;
