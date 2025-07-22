import { useNavigate } from "react-router-dom";

const ChooseSignup = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: "linear-gradient(to right top, #dfe9f3, #ffffff)",
        backdropFilter: "blur(5px)",
      }}
    >
      <div
        className="card border-0 shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="card-body text-center">
          <h3 className="mb-4 fw-bold text-dark">Choose Your Role</h3>
          <div className="d-grid gap-3">
            <button
              className="btn btn-outline-primary btn-lg rounded-pill"
              onClick={() => navigate("/teacher/signup")}
              style={{ fontWeight: "600" }}
            >
              👨‍🏫 I'm a Teacher
            </button>
            <button
              className="btn btn-outline-success btn-lg rounded-pill"
              onClick={() => navigate("/student/signup")}
              style={{ fontWeight: "600" }}
            >
              🎓 I'm a Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSignup;
