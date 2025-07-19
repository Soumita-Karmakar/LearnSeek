
import { useNavigate } from "react-router-dom";


const ChooseSignup = () => {
  const navigate = useNavigate();

  return (
    <div className="choose-signup-container">
      <h2 className="title">Sign up as</h2>
      <div className="buttons">
        <button className="btn teacher-btn" onClick={() => navigate("/teacher/signup")}>
          Teacher
        </button>
        <button className="btn student-btn" onClick={() => navigate("/student/signup")}>
          Student
        </button>
      </div>
    </div>
  );
};

export default ChooseSignup;
