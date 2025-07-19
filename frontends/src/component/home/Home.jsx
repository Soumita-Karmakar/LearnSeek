import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook } from "react-icons/fa";

const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [topTeachers, setTopTeachers] = useState([]);
  const [popularSubjects, setPopularSubjects] = useState([]);
  const [reviews, setReviews] = useState([]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/teacher/topRated');
        const data = await res.json();
        setTopTeachers(data.teachers || []);
        setPopularSubjects(data.subjects || []);
      } catch (err) {
        console.error("Failed to load home data", err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/reviews/recent');
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error('Error loading reviews', err);
      }
    };

    fetchData();
    fetchReviews();
  }, []);

  return (
    <div className="homepage-container bg-light">

      {/* HERO SECTION */}
      <section
  className="hero-section text-white"
  style={{
    minHeight: '100vh',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('/image.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <div className="container h-100">
    <div className="row h-100 align-items-center">
      {/* LEFT CONTENT */}
      <div className="col-md-7" style={{ paddingLeft: '60px', marginTop: '100px' }}>
        <h1 className="display-4 fw-bold mb-3 text-warning">
          Find the Best Teachers Near You
        </h1>
        <p className="lead text-light mb-4">
          LearnSeek connects students with top-rated teachers. Start your journey today!
        </p>

        {/* SEARCH BAR */}
        <div className="input-group mb-4 shadow" style={{ maxWidth: "600px" ,paddingLeft: '90px'}}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by subject or city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}
          />
          <button
            className="btn btn-danger px-4"
            onClick={handleSearch}
            style={{ borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}
          >
            🔍 Search
          </button>
        </div>

        {/* CTA BUTTONS */}
        <div className="d-flex gap-3 flex-wrap"style={{ paddingLeft: '130px'}}>
          <button
            onClick={() => navigate('/student/signup')}
            className="btn btn-primary btn-lg rounded-pill"
          >
            🧑‍🎓 I want to Learn
          </button>
          <button
            onClick={() => navigate('/teacher/signup')}
            className="btn btn-outline-warning btn-lg rounded-pill"
          >
            👨‍🏫 I want to Teach
          </button>
        </div>
      </div>

      {/* RIGHT EMPTY COLUMN (optional image or spacing) */}
      <div className="col-md-5 d-none d-md-block"></div>
    </div>
  </div>
</section>


      {/* POPULAR SUBJECTS */}
<section
  className="py-5"
  style={{ background: "linear-gradient(to bottom, #fff1e6, #b8e3f1)" }}
>
  <div className="container">
    <h2 className="text-center text-primary mb-4 fw-bold">
      📚 Popular Subjects
    </h2>
    <div className="d-flex flex-wrap justify-content-center gap-3">
      {popularSubjects.length > 0 ? (
        popularSubjects.map((subject, index) => (
          <div
            key={index}
            className="badge bg-warning text-dark p-3 rounded-pill shadow-sm fs-6"
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 10px 20px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 6px 12px rgba(0, 0, 0, 0.1)";
            }}
            onClick={() =>
              user ? navigate(`/search?query=${subject}`) : navigate("/login")
            }
          >
            <FaBook className="me-2" />
            {subject}
          </div>
        ))
      ) : (
        <p className="text-center">No subjects found</p>
      )}
    </div>
  </div>
</section>


      {/* TOP TEACHERS */}
   <section
  className="py-5"
  style={{
    background: "linear-gradient(to bottom, #b8e3f1, #4098d7)",
  }}
>
  <div className="container">
    <h2 className="text-center text-white mb-5 fw-bold">
      ⭐ Top Rated Teachers
    </h2>
    <div className="row g-4">
      {topTeachers.length > 0 ? (
        topTeachers.map((teacher) => (
          <div
            key={teacher._id}
            className="col-md-6 col-lg-4"
            onClick={() =>
              user ? navigate(`/teacher/${teacher._id}`) : navigate("/login")
            }
            style={{ cursor: "pointer" }}
          >
            <div
              className="card border-0 h-100 p-4"
              style={{
                borderRadius: "20px",
                backgroundColor: "#f4dafeff",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 25px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div className="card-body">
                <h5
                  className="card-title fw-bold mb-2"
                  style={{ color: "#2a5d9f" }}
                >
                  {teacher.name}
                </h5>
                <p className="card-text mb-2">
                  <strong>Subject:</strong>{" "}
                  <span className="text-muted">{teacher.subject}</span>
                </p>
                <p className="card-text mb-2">
                  <strong>City:</strong>{" "}
                  <span className="text-muted">{teacher.city}</span>
                </p>
                <p className="card-text mb-0">
  <strong>Rating:</strong>{" "}
  <span className="text-warning">
    {"⭐".repeat(Math.round(teacher.rating || 0))}
  </span>{" "}
  <span className="text-dark">
    ({teacher.rating ? teacher.rating.toFixed(1) : "N/A"} / 5)
  </span>
</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-light">
          No top-rated teachers available.
        </p>
      )}
    </div>
  </div>
</section>


      {/* STUDENT REVIEWS */}
<section
  className="py-5"
  style={{
    background: "linear-gradient(to bottom, #4098d7, #f5d3f7)",
  }}
>
  <div className="container">
    <h2 className="text-center text-dark mb-5 fw-bold">
      🌟 Our Happy Learners
    </h2>
    <div className="row g-4">
      {reviews.length > 0 ? (
        reviews.map((review, idx) => (
          <div key={idx} className="col-md-6 col-lg-4">
            <div
              className="card border-0 h-100 p-4"
              style={{
                borderRadius: "20px",
                backgroundColor: "#faffb2ff", // 💜 pastel lavender
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 25px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div className="d-flex align-items-center mb-3">
                <img
                  src={review.studentImage || "/default-profile.png"}
                  alt="student"
                  className="rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    border: "2px solid #4098d7",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-profile.png";
                  }}
                />
                <h6
                  className="mb-0 fw-semibold"
                  style={{ color: "#2a5d9f" }}
                >
                  {review.studentName}
                </h6>
              </div>
              <p
                className="fst-italic mb-0"
                style={{ color: "#6c757d" }}
              >
                "{review.comment}"
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-white">No reviews yet.</p>
      )}
    </div>
  </div>
</section>


      {/* FOOTER */}
      <footer className="text-white py-4" style={{ background: 'linear-gradient(to bottom, #f5d3f7, #958adc)' }}>
        <div className="container text-center">
          <p className="mb-2 fs-5 fw-medium">
            🌟 LearnSeek — Empowering Education Every Day
          </p>
          <div className="d-flex justify-content-center gap-3 mb-2">
            <a href="/about" className="text-white text-decoration-none">About</a>
            <a href="/contact" className="text-white text-decoration-none">Contact</a>
            <a href="/teacher" className="text-white text-decoration-none">Teachers</a>
          </div>
          <p className="mb-0 fs-6">
            &copy; {new Date().getFullYear()} LearnSeek. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
