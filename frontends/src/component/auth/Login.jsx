import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const login = { email, password, role };
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("role", result.role);
      toast.success(result.message || "Login successful!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(to right, #e0f7fa, #fce4ec)",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="shadow p-4"
        style={{
          background: "white",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h3 className="text-center text-primary fw-bold mb-3">✒️ Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                Select Role
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Login
          </button>

          <p className="text-center mt-3 mb-0">
            Don't have an account?{" "}
            <a href="/signup" className="text-decoration-none text-primary fw-semibold">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
