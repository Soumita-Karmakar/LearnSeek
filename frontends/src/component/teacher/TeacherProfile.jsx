import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

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

    // ✅ Validate image type and size
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
        // ✅ Update image after upload
        setTeacherData((prev) => ({
          ...prev,
          profileImage: data.profileImage,
        }));
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
    <div className="container mt-4">
      <h2>MY Profile</h2>

      {/* Profile Image with Upload Button */}
      <div className="text-center mb-3">
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
          width={120}
          height={120}
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
        <div className="mt-2">
          <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
        </div>
      </div>

      {/* Info Section */}
      <div className="row">
        <div className="col-md-6">
          <p><strong>Name:</strong> {teacherData.name}</p>
          <p><strong>Email:</strong> {teacherData.email}</p>
          <p><strong>Phone:</strong> {teacherData.phone}</p>
          <p><strong>City:</strong> {teacherData.city}</p>
          <p><strong>Qualification:</strong> {teacherData.qualification}</p>
        </div>
        <div className="col-md-6">
          <p><strong>Subjects:</strong> {teacherData.subjects}</p>
          <p><strong>Availability:</strong> {teacherData.availability}</p>
          <p><strong>Mode:</strong> {teacherData.mode}</p>
          <p><strong>Fee (₹/hr):</strong> {teacherData.fee}</p>
          <p><strong>Experience:</strong> {teacherData.experience} years</p>
        </div>
      </div>

      <div className="mb-4">
        <p><strong>Bio:</strong> {teacherData.bio}</p>
      </div>

      <Link to={`/editTeacherprofile/${user.id}`} className="btn btn-primary me-2">
        Edit Profile
      </Link>
      <Link to="/teachermychats" className="btn btn-outline-success me-2">
        My Chats
      </Link>
      <Link to="/teacherreviews" className="btn btn-outline-warning">
        My Reviews
      </Link>
    </div>
  );
};

export default TeacherProfile;
