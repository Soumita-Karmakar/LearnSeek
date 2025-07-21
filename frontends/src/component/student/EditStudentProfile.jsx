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
        toast.success("✅ Profile updated successfully!");
        setTimeout(() => navigate("/profile"), 2000);
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong while updating");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "linear-gradient(to right, #e0f2f1, #f1f8e9)" }}
    >
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "800px", backgroundColor: "#ffffffcc", borderRadius: "20px" }}>
        <h3 className="text-center text-primary mb-4">📝 Edit Student Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">👤 Name</label>
              <input name="name" value={studentData.name} disabled className="form-control" />

              <label className="form-label fw-bold mt-3">📧 Email</label>
              <input name="email" value={studentData.email} disabled className="form-control" />

              <label className="form-label fw-bold mt-3">📱 Phone</label>
              <input name="phone" value={studentData.phone} onChange={handleChange} className="form-control" />

              <label className="form-label fw-bold mt-3">🏙️ City</label>
              <input name="city" value={studentData.city} onChange={handleChange} className="form-control" />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">🏫 Class</label>
              <input name="class" value={studentData.class} onChange={handleChange} className="form-control" />

              <label className="form-label fw-bold mt-3">📝 Bio</label>
              <textarea
                name="bio"
                value={studentData.bio}
                onChange={handleChange}
                className="form-control"
                rows={5}
                placeholder="Tell us something about yourself..."
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-success px-4 py-2">
              ✅ Update Profile
            </button>
          </div>
        </form>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default EditStudentProfile;
