import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className="container mt-4">
      <h2 className="text-center">MY Profile</h2>

      {/* Profile Image */}
      <div className="text-center mb-3">
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
          width={120}
          height={120}
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
        <div className="mt-2">
          <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
        </div>
      </div>

      {/* Info Section */}
      <div className="row justify-content-center">
        <div className="col-md-4">
          <p><strong>Name:</strong> {studentData.name}</p>
          <p><strong>Email:</strong> {studentData.email}</p>
          <p><strong>Phone:</strong> {studentData.phone}</p>
        </div>
        <div className="col-md-4">
          <p><strong>City:</strong> {studentData.city}</p>
          <p><strong>Class:</strong> {studentData.class}</p>
          <p><strong>Bio:</strong> {studentData.bio || "N/A"}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="text-center my-4">
        <Link to={`/editStudentprofile/${user.id}`} className="btn btn-primary me-2">
          Edit Profile
        </Link>
        <Link to="/mychats" className="btn btn-outline-success me-2">
          My Chats
        </Link>
        <Link to="/myreviews" className="btn btn-outline-warning">
          My Reviews
        </Link>
      </div>
    </div>
  );
};

export default StudentProfile;
