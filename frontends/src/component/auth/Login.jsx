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
    console.log("Sending data:", login);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login)
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
    <div className="container my-2">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-center">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
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
            <option value="" disabled hidden>Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Login</button>

        <p className="mt-3">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
