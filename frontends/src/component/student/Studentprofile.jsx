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

      // ✅ Dispatch this so Navbar listens and refreshes
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
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right top, #fefcea, #9795f0)",
        padding: "2rem",
      }}
    >
      <div
        className="glass-card p-4 d-flex flex-column flex-md-row gap-4 text-dark"
        style={{
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          width: "100%",
          maxWidth: "960px",
        }}
      >
        {/* Profile Image Section */}
        <div className="text-center">
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
            style={{
              width: "160px",
              height: "160px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "4px solid #007bff",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            }}
          />
          <div className="mt-3">
            <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
          </div>
          <h5 className="mt-3 fw-bold">{studentData.name}</h5>
          <p className="text-muted small">{studentData.email}</p>
        </div>

        {/* Info Section */}
        <div className="flex-grow-1">
          <h4 className="text-primary mb-3">🎓 My Profile</h4>
          <div className="row">
            <div className="col-sm-6 mb-3">
              <strong>📞 Phone:</strong>
              <p>{studentData.phone}</p>
            </div>
            <div className="col-sm-6 mb-3">
              <strong>🏙️ City:</strong>
              <p>{studentData.city}</p>
            </div>
            <div className="col-sm-6 mb-3">
              <strong>🏫 Class:</strong>
              <p>{studentData.class}</p>
            </div>
            <div className="col-sm-6 mb-3">
              <strong>📝 Bio:</strong>
              <p>{studentData.bio || "N/A"}</p>
            </div>
          </div>

          <div className="mt-4 d-flex flex-wrap gap-2">
            <Link to={`/editStudentprofile/${user.id}`} className="btn btn-outline-dark">
              ✏️ Edit Profile
            </Link>
            <Link to="/mychats" className="btn btn-outline-success">
              💬 My Chats
            </Link>
            <Link to="/myreviews" className="btn btn-outline-warning text-dark">
              🌟 My Reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
