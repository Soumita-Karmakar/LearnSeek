import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditStudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    class: "",
    bio: "",
  });

  const normalizeData = (data) => ({
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    city: data.city || "",
    class: data.class || "",
    bio: data.bio || "",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/student/studentDetails/${id}`);
        const data = await res.json();

        if (res.ok) {
          setStudentData(normalizeData(data));
        } else {
          toast.error("Failed to fetch student details");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Error while fetching student data");
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/api/student/studentUpdate/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Profile updated successfully!");
        setTimeout(() => navigate("/profile"), 1000);
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong while updating");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 to-lime-100">
      <div className="w-full max-w-4xl bg-white/80 shadow-lg p-8 rounded-2xl">
        <h3 className="text-center text-blue-600 text-2xl font-semibold mb-6">📝 Edit Student Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mt-4 mb-1">👤 Name</label>
<input
  name="name"
  value={studentData.name}
  onChange={handleChange}
  className="w-full px-4 py-2 border rounded-lg"
/>
              <label className="block font-semibold text-gray-700 mt-4 mb-1">📧 Email</label>
              <input
                name="email"
                value={studentData.email}
                disabled
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />

              <label className="block font-semibold text-gray-700 mt-4 mb-1">📱 Phone</label>
              <input
                name="phone"
                value={studentData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />

              <label className="block font-semibold text-gray-700 mt-4 mb-1">🏙️ City</label>
              <input
                name="city"
                value={studentData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">🏫 Class</label>
              <input
                name="class"
                value={studentData.class}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />

              <label className="block font-semibold text-gray-700 mt-4 mb-1">📝 Bio</label>
              <textarea
                name="bio"
                value={studentData.bio}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us something about yourself..."
                className="w-full px-4 py-2 border rounded-lg resize-none"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Update Profile
            </button>
          </div>
        </form>

        <ToastContainer position="top-center" autoClose={1000} />
      </div>
    </div>
  );
};

export default EditStudentProfile;
