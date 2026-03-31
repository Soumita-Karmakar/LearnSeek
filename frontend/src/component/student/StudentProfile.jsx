import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaCity, FaSchool, FaInfoCircle } from "react-icons/fa";

const StudentProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    class: "",
    bio: "",
    profileImage: "/default-profile.png",
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG and PNG images are allowed");
      return;
    }
    if (file.size > 1024 * 1024) {
      alert("Image must be less than 1MB");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await fetch(`http://localhost:8000/api/student/uploadProfileImage/${user.id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setStudentData((prev) => ({
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
        const res = await fetch(`http://localhost:8000/api/student/studentDetails/${user.id}`);
        const data = await res.json();

        if (res.ok) {
          setStudentData((prev) => ({
            ...prev,
            ...data,
            profileImage: data.profileImage || "/default-profile.png",
          }));
        }
      } catch (err) {
        console.error("Student profile fetch error:", err);
      }
    };

    if (user?.id) fetchProfile();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-white py-12 px-4 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white/40 rounded-3xl shadow-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Profile Image Section */}
        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            <img
              src={
                studentData.profileImage?.startsWith("http")
                  ? studentData.profileImage
                  : `http://localhost:8000/uploads/${studentData.profileImage}`
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
          <h2 className="mt-4 font-bold text-xl">{studentData.name}</h2>
          <p className="text-sm text-gray-600">{studentData.email}</p>
        </div>

        {/* Profile Details */}
        <div className="md:col-span-2">
          <h2 className="text-3xl  text-left ml-12 font-bold text-indigo-800 mb-6">🎓Your Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-blue-500 mt-1" />
              <div>
                <p className="font-semibold">Phone:</p>
                <p className="text-gray-700">{studentData.phone || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaCity className="text-blue-500 mt-1" />
              <div>
                <p className="font-semibold">City:</p>
                <p className="text-gray-700">{studentData.city || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaSchool className="text-blue-500 mt-1" />
              <div>
                <p className="font-semibold">Class:</p>
                <p className="text-gray-700">{studentData.class || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaInfoCircle className="text-blue-500 mt-1" />
              <div>
                <p className="font-semibold">Bio:</p>
                <p className="text-gray-700">{studentData.bio || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              to={`/editStudentprofile/${user.id}`}
              className="w-full sm:w-auto text-center bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              ✏️ Edit Profile
            </Link>
            <Link
              to="/mychats"
              className="w-full sm:w-auto text-center bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
            >
              💬 My Chats
            </Link>
            <Link
              to="/myreviews"
              className="w-full sm:w-auto text-center bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition"
            >
              🌟 My Reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
