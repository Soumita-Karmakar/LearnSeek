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
  });

  const normalizeData = (data) => ({
    name: data.name || "",
    email: data.email || "",
    city: data.city || "",
    qualification: data.qualification || "",
    phone: data.phone || "",
    subjects: Array.isArray(data.subjects) ? data.subjects.join(", ") : data.subjects || "",
    availability: data.availability || "",
    mode: data.mode || "",
    fee: data.fee !== undefined ? String(data.fee) : "",
    experience: data.experience !== undefined ? String(data.experience) : "",
    bio: data.bio || "",
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
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-indigo-50 flex justify-center py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-2">Edit Your Profile</h2>
          <p className="text-gray-500">Keep your profile updated for students to find you easily.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner space-y-4">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput label="Name" name="name" value={teacherData.name} onChange={handleChange} />
              <FloatingInput label="Email" name="email" value={teacherData.email} onChange={handleChange} disabled />
              <FloatingInput label="City" name="city" value={teacherData.city} onChange={handleChange} />
              <FloatingInput label="Phone" name="phone" value={teacherData.phone} onChange={handleChange} />
              <FloatingInput label="Qualification" name="qualification" value={teacherData.qualification} onChange={handleChange} />
            </div>
          </div>

          {/* Professional Info */}
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner space-y-4">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput label="Subjects (comma separated)" name="subjects" value={teacherData.subjects} onChange={handleChange} />
              <FloatingInput label="Availability" name="availability" value={teacherData.availability} onChange={handleChange} />
              <SelectInput label="Mode" name="mode" value={teacherData.mode} onChange={handleChange} options={["Online", "Offline", "Both"]} />
              <FloatingInput label="Fee (₹/hr)" name="fee" value={teacherData.fee} onChange={handleChange} />
              <FloatingInput label="Experience (years)" name="experience" value={teacherData.experience} onChange={handleChange} />
            </div>
          </div>

          {/* Bio */}
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Bio</h3>
            <textarea
              name="bio"
              value={teacherData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md"
            >
              Update Profile
            </button>
          </div>
        </form>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

// Floating label input component
const FloatingInput = ({ label, name, value, onChange, disabled }) => (
  <div className="relative">
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`peer w-full border border-indigo-300 rounded-xl px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
    />
    <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-indigo-600 peer-focus:text-sm">
      {label}
    </label>
  </div>
);

// Select input component
const SelectInput = ({ label, name, value, onChange, options }) => (
  <div className="relative">
    <label className="block text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default EditProfile;
