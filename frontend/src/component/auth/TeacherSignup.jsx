import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function TeacherSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subjects, setSubjects] = useState("");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [availability, setAvailability] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addTeacher = {
      name,
      email,
      password,
      subjects,
      city,
      experience: Number(experience),
      bio,
      availability,
      phone,
    };

    try {
      const response = await fetch("http://localhost:8000/api/teacher/signup", {
        method: "POST",
        body: JSON.stringify(addTeacher),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Signup failed");
        return;
      }

      toast.success(result.message || "Signup successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        background: "linear-gradient(to right, #d9e7ff, #fefefe)",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="p-6 w-full max-w-lg rounded-2xl shadow-lg"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.25)",
        }}
      >
        <h3 className="text-center font-bold text-lg text-gray-800 mb-6">
          👨‍🏫 Teacher Registration
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Subjects (e.g. Math, Physics)"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="number"
              placeholder="Experience (in years)"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <textarea
              rows="2"
              placeholder="Short Bio"
              className="w-full rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Availability (e.g., Mon-Fri Evening)"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-semibold py-2 rounded-full hover:bg-gray-900 transition"
          >
            Sign Up
          </button>

          <p className="text-center mt-4 text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default TeacherSignup;
