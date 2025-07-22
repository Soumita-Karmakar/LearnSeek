import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function StudentSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [subjectclass, setSubjectclass] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addStudent = {
      name,
      email,
      password,
      city,
      class: subjectclass,
      phone,
    };

    try {
      const response = await fetch("http://localhost:8000/api/student/addstudent", {
        method: "POST",
        body: JSON.stringify(addStudent),
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
        background: "linear-gradient(to right, #c9d6ff, #e2e2e2)",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="p-4 shadow-lg"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.25)",
          borderRadius: "16px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h3 className="text-center fw-bold mb-4 text-dark">
         📝  Create Student Account
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
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="tel"
              className="form-control rounded-pill px-4 py-2"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="form-control rounded-pill px-4 py-2"
              placeholder="Class (e.g., 10th, BCA)"
              value={subjectclass}
              onChange={(e) => setSubjectclass(e.target.value)}
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
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default StudentSignup;
