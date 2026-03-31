import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [topTeachers, setTopTeachers] = useState([]);
  const [popularSubjects, setPopularSubjects] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
    <div className="bg-gray-100">

      {/* HERO SECTION */}
      <section
        className="min-h-screen text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('/image.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="h-full w-full px-6 py-12">
          <div className="flex flex-col md:flex-row h-full items-center">
            <div className="md:w-7/12 pl-[60px] mt-[100px]" data-aos="fade-right">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400 animate-pulse">
                Find the Best Teachers Near You
              </h1>
              <p className="text-lg text-gray-200 mb-6 transition-opacity duration-700 hover:opacity-80">
                LearnSeek connects students with top-rated teachers. Start your journey today!
              </p>

              {/* SEARCH BAR */}
              <div className="flex shadow-lg max-w-[600px] pl-[90px] mb-6 transition-transform duration-300 hover:scale-105">
                <input
                  type="text"
                  className="flex-1 rounded-l-full px-4 py-2 text-black outline-none"
                  placeholder="Search by subject or city or both (eg: kolkata math)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-r-full hover:bg-red-700 transition"
                  onClick={handleSearch}
                >
                  🔍 Search
                </button>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex gap-4 flex-wrap pl-[130px]">
                <button
                  onClick={() => navigate('/student/signup')}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full text-lg transition-transform hover:scale-105"
                >
                  🧑‍🎓 I want to Learn
                </button>
                <button
                  onClick={() => navigate('/teacher/signup')}
                  className="border-2 border-yellow-400 text-yellow-400 py-2 px-6 rounded-full text-lg hover:bg-yellow-400 hover:text-white transition-transform hover:scale-105"
                >
                  👨‍🏫 I want to Teach
                </button>
              </div>
            </div>
            <div className="md:w-5/12 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* POPULAR SUBJECTS */}
      <section className="py-12 bg-gradient-to-b from-[#fff1e6] to-[#b8e3f1]">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <h2 className="text-center text-blue-700 mb-6 text-3xl font-bold animate-fade-in">📚 Popular Subjects</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {popularSubjects.length > 0 ? (
              popularSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-full shadow cursor-pointer text-sm transition duration-300 hover:scale-110"
                  onClick={() =>
                    user ? navigate(`/search?query=${subject}`) : navigate("/login")
                  }
                  data-aos="zoom-in"
                >
                  <FaBook className="inline-block mr-1" />
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
      <section className="py-12 bg-gradient-to-b from-[#b8e3f1] to-[#4098d7]">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <h2 className="text-center text-white mb-10 text-3xl font-bold">⭐ Top Rated Teachers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTeachers.length > 0 ? (
              topTeachers.map((teacher) => (
                <div
                  key={teacher._id}
                  onClick={() => user ? navigate(`/teacher/${teacher._id}`) : navigate("/login")}
                  className="cursor-pointer"
                  data-aos="flip-left"
                >
                  <div className="bg-[#f4dafe] p-6 rounded-2xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center mb-4">
                      <img
                        src={teacher.profileImage || "/default-profile.png"}
                        alt="Teacher"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white mr-3"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-profile.png";
                        }}
                      />
                      <h5 className="font-bold text-[#2a5d9f] mb-0">{teacher.name}</h5>
                    </div>
                    <p className="mb-1"><strong>Subject:</strong> <span className="text-gray-600">{teacher.subject}</span></p>
                    <p className="mb-1"><strong>City:</strong> <span className="text-gray-600">{teacher.city}</span></p>
                    <p className="mb-0">
                      <strong>Rating:</strong>{" "}
                      <span className="text-yellow-500">
                        {"⭐".repeat(Math.round(teacher.rating || 0))}
                      </span>{" "}
                      <span className="text-gray-800">
                        ({teacher.rating ? teacher.rating.toFixed(1) : "N/A"} / 5)
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white">No top-rated teachers available.</p>
            )}
          </div>
        </div>
      </section>

      {/* STUDENT REVIEWS */}
      <section className="py-12 bg-gradient-to-b from-[#4098d7] to-[#f5d3f7]">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <h2 className="text-center text-gray-900 mb-10 text-3xl font-bold">🌟 Our Happy Learners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <div key={idx} data-aos="zoom-in-up">
                  <div className="bg-[#faffb2] p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                    <div className="flex items-center mb-3">
                      <img
                        src={review.studentImage || "/default-profile.png"}
                        alt="student"
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#4098d7] mr-3"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-profile.png";
                        }}
                      />
                      <h6 className="font-semibold text-[#2a5d9f] mb-0">{review.studentName}</h6>
                    </div>
                    <p className="italic text-gray-600">"{review.comment}"</p>
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
      <footer className="text-white py-6 bg-gradient-to-b from-[#f5d3f7] to-[#958adc]" data-aos="fade-up">
        <div className="text-center">
          <p className="text-lg font-medium mb-2 animate-bounce">
            🌟 LearnSeek — Empowering Education Every Day
          </p>
          <div className="flex justify-center gap-4 mb-2">
            <a href="/about" className="text-white hover:underline">About</a>
            <a href="/contact" className="text-white hover:underline">Contact</a>
            <a href="/teacher" className="text-white hover:underline">Teachers</a>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} LearnSeek. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
