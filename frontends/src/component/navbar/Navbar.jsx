import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const [profileImage, setProfileImage] = useState("/default-profile.png");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!user?.id || !role) return;

      const endpoint =
        role === "teacher"
          ? `http://localhost:8000/api/teacher/teacherDetails/${user.id}`
          : `http://localhost:8000/api/student/studentDetails/${user.id}`;

      try {
        const res = await fetch(endpoint);
        const data = await res.json();

        if (res.ok) {
          const imagePath = data.profileImage;
          if (imagePath && imagePath !== "default-profile.png") {
            setProfileImage(`http://localhost:8000/uploads/${imagePath}`);
          } else {
            setProfileImage("/default-profile.png");
          }
        }
      } catch (err) {
        console.error("Navbar profile fetch error:", err);
      }
    };

    fetchProfileImage();
  }, [user?.id, role]);

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#ffeeccff' }}>
  <div className="container-fluid">
    <Link to="/" className="navbar-brand text-dark custom-hover">LearnSeek</Link>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
<div className="navbar-nav mx-auto">
  <Link to="/" className="nav-link nav-link-custom fs-5.5">Home</Link>
  <Link to="/about" className="nav-link nav-link-custom fs-5.5">About</Link>
  <Link to="/contact" className="nav-link nav-link-custom fs-5.5">Contact</Link>
  <Link to="/teacher" className="nav-link nav-link-custom fs-5.5">Teachers</Link>
</div>



      <div className="d-flex align-items-center">
        {user ? (
          <>
            <Link to="/profile" className="text-dark me-3">
              <img
                src={profileImage}
                alt="Profile"
                width={30}
                height={30}
                style={{ borderRadius: "50%", objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-profile.png";
                }}
              />
            </Link>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/signup" className="btn btn-primary me-2">Signup</Link>
          </>
        )}
      </div>
    </div>
  </div>
</nav>

  );
}

export default Navbar;
