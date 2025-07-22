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
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(to right, #d9e7ff, #fefefe)",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="p-4 shadow-lg"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.25)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h3 className="text-center fw-bold mb-4 text-dark">
          👨‍🏫 Teacher Registration
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-pill px-4 py-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control rounded-pill px-4 py-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control rounded-pill px-4 py-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-pill px-4 py-2"
              placeholder="Subjects (e.g. Math, Physics)"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-pill px-4 py-2"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control rounded-pill px-4 py-2"
              placeholder="Experience (in years)"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control rounded-4 px-4 py-2"
              rows="2"
              placeholder="Short Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-pill px-4 py-2"
              placeholder="Availability (e.g., Mon-Fri Evening)"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="tel"
              className="form-control rounded-pill px-4 py-2"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 rounded-pill py-2 fw-semibold"
          >
            Sign Up
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none text-primary fw-semibold">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default TeacherSignup;
