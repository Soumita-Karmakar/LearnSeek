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
      className="flex items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(to right, #e0f7fa, #fce4ec)",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-white shadow-md p-6 rounded-xl w-full max-w-sm">
        <h3 className="text-center text-blue-600 font-bold text-xl mb-4">✒️ Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
