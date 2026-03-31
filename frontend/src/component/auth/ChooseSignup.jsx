import { useNavigate } from "react-router-dom";

const ChooseSignup = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "linear-gradient(to right top, #dfe9f3, #ffffff)",
        backdropFilter: "blur(5px)",
      }}
    >
      <div
        className="shadow-lg p-6 w-full max-w-md rounded-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="text-center">
          <h3 className="mb-6 font-bold text-xl text-gray-800">Choose Your Role</h3>
          <div className="space-y-4">
            <button
              className="w-full border border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-full transition"
              onClick={() => navigate("/teacher/signup")}
            >
              👨‍🏫 I'm a Teacher
            </button>
            <button
              className="w-full border border-green-500 text-green-600 hover:bg-green-50 font-semibold py-3 rounded-full transition"
              onClick={() => navigate("/student/signup")}
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
