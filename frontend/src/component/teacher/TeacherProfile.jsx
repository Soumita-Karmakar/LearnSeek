import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TeacherProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG and PNG files allowed");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Image must be less than 1MB");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await fetch(`http://localhost:8000/api/teacher/uploadProfileImage/${user.id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setTeacherData((prev) => ({
          ...prev,
          profileImage: data.profileImage,
        }));
        window.dispatchEvent(new Event("profileImageUpdated"));
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error("Image upload error:", err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/teacher/teacherDetails/${user.id}`);
        const data = await res.json();

        if (res.ok) {
          setTeacherData((prev) => ({
            ...prev,
            ...data,
            subjects: Array.isArray(data.subjects)
              ? data.subjects.join(", ")
              : data.subjects || "",
            profileImage: data.profileImage || "/default-profile.png",
          }));
        } else {
          alert("Failed to fetch profile");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    if (user?.id) fetchProfile();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-white py-12 px-4 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white/40 rounded-3xl shadow-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Profile Image */}
        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            <img
              src={
                teacherData.profileImage?.startsWith("http")
                  ? teacherData.profileImage
                  : `http://localhost:8000/uploads/${teacherData.profileImage}`
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-profile.png";
              }}
              alt="Profile"
              className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-lg"
            />
            <label className="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-full p-2 cursor-pointer group-hover:scale-110 transition-transform">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="text-white text-xs">📸</span>
            </label>
          </div>
          <h2 className="mt-4 font-bold text-xl">{teacherData.name}</h2>
          <p className="text-sm text-gray-600">{teacherData.email}</p>
        </div>

        {/* Profile Details */}
        <div className="md:col-span-2">
          <h2 className="text-3xl text-left ml-4 font-bold text-indigo-800 mb-6">👩‍🏫 Your Profile</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-800 text-base">
            <p>📞 <strong>Phone:</strong> {teacherData.phone || "N/A"}</p>
            <p>🌆 <strong>City:</strong> {teacherData.city || "N/A"}</p>
            <p>🎓 <strong>Qualification:</strong> {teacherData.qualification || "N/A"}</p>
            <p>📚 <strong>Subjects:</strong> {teacherData.subjects || "N/A"}</p>
            <p>🕒 <strong>Availability:</strong> {teacherData.availability || "N/A"}</p>
            <p>💻 <strong>Mode:</strong> {teacherData.mode || "N/A"}</p>
            <p>💰 <strong>Fee (₹/hr):</strong> {teacherData.fee || "N/A"}</p>
            <p>🧰 <strong>Experience:</strong> {teacherData.experience || "N/A"} years</p>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <p className="text-lg"><strong>📝 Bio:</strong> {teacherData.bio || "N/A"}</p>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              to={`/editTeacherprofile/${user.id}`}
              className="w-full sm:w-auto text-center bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              ✏️ Edit Profile
            </Link>
            <Link
              to="/teachermychats"
              className="w-full sm:w-auto text-center bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
            >
              💬 My Chats
            </Link>
            <Link
              to="/teacherreviews"
              className="w-full sm:w-auto text-center bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition"
            >
              ⭐ My Reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
