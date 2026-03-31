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
      className="flex justify-center items-center min-h-screen"
      style={{
        background: "linear-gradient(to right, #c9d6ff, #e2e2e2)",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="p-6 shadow-lg w-full max-w-lg rounded-2xl"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <h3 className="text-center font-bold text-lg text-gray-800 mb-6">
          📝 Create Student Account
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="tel"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Class (e.g., 10th, BCA)"
              value={subjectclass}
              onChange={(e) => setSubjectclass(e.target.value)}
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
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default StudentSignup;
