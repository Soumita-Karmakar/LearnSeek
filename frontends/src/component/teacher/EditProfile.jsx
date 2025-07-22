import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    city: "",
    qualification: "",
    phone: "",
    subjects: "",
    availability: "",
    mode: "",
    fee: "",
    experience: "",
    bio: "",
    profileImage: "/default-profile.png",
  });

  const normalizeData = (data) => ({
    name: data.name || "",
    email: data.email || "",
    city: data.city || "",
    qualification: data.qualification || "",
    phone: data.phone || "",
    subjects: Array.isArray(data.subjects)
      ? data.subjects.join(", ")
      : data.subjects || "",
    availability: data.availability || "",
    mode: data.mode || "",
    fee: data.fee !== undefined ? String(data.fee) : "",
    experience: data.experience !== undefined ? String(data.experience) : "",
    bio: data.bio || "",
    profileImage: data.profileImage || "/default-profile.png",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/teacher/teacherDetails/${id}`);
        const data = await res.json();
        if (res.ok) setTeacherData(normalizeData(data));
        else toast.error("Failed to fetch profile");
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Something went wrong while fetching");
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...teacherData,
      subjects: teacherData.subjects
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(`http://localhost:8000/api/teacher/UpdateTeacher/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully!");
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
    <div className="container my-5">
      {/* Header Section */}
      <div
        className="rounded p-4 mb-4 text-white"
        style={{
          background: "linear-gradient(to right, #6dd5ed, #2193b0)",
        }}
      >
        <h2 className="mb-0 fw-bold">Edit Your Profile</h2>
        <p className="mb-0">Update your information to keep your profile accurate.</p>
      </div>

      {/* Profile Form Card */}
      <div
        className="p-4 rounded shadow"
        style={{ background: "#f8f9fa", border: "1px solid #dee2e6" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Name</label>
              <input name="name" value={teacherData.name} onChange={handleChange} className="form-control mb-3" />

              <label className="form-label fw-semibold">Email</label>
              <input name="email" value={teacherData.email} onChange={handleChange} className="form-control mb-3" />

              <label className="form-label fw-semibold">City</label>
              <input name="city" value={teacherData.city} onChange={handleChange} className="form-control mb-3" />

              <label className="form-label fw-semibold">Phone</label>
              <input name="phone" value={teacherData.phone} onChange={handleChange} className="form-control mb-3" />

              <label className="form-label fw-semibold">Qualification</label>
              <input name="qualification" value={teacherData.qualification} onChange={handleChange} className="form-control mb-3" />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Subjects (comma separated)</label>
              <input name="subjects" value={teacherData.subjects} onChange={handleChange} className="form-control mb-3" />

              <label className="form-label fw-semibold">Availability</label>
              <input name="availability" value={teacherData.availability} onChange={handleChange} className="form-control mb-3" />

              <label className="form-label fw-semibold">Mode</label>
              <select name="mode" value={teacherData.mode} onChange={handleChange} className="form-select mb-3">
                <option value="">Select Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>

              <label className="form-label fw-semibold">Fee (₹/hr)</label>
              <input name="fee" value={teacherData.fee} onChange={handleChange} className="form-control mb-3" />

              <label className="form-label fw-semibold">Experience (years)</label>
              <input name="experience" value={teacherData.experience} onChange={handleChange} className="form-control mb-3" />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Bio</label>
            <textarea name="bio" value={teacherData.bio} onChange={handleChange} className="form-control" rows={4} />
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-success px-4">
              Update Profile
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default EditProfile;
