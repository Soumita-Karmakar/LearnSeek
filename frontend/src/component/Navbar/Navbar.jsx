import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          const isFullUrl = imagePath?.startsWith("http");
          const finalUrl = isFullUrl
            ? `${imagePath}?t=${Date.now()}`
            : `http://localhost:8000/uploads/${imagePath}?t=${Date.now()}`;
          setProfileImage(finalUrl);
        } else {
          setProfileImage("/default-profile.png");
        }
      } catch (err) {
        console.error("Navbar profile fetch error:", err);
      }
    };

    fetchProfileImage();

    const handleRefresh = () => {
      fetchProfileImage();
    };

    window.addEventListener("profileImageUpdated", handleRefresh);

    return () => {
      window.removeEventListener("profileImageUpdated", handleRefresh);
    };
  }, [user?.id, role]);

  return (
    <nav className="bg-yellow-100 shadow-md relative z-50">
<div className="w-full flex items-center justify-between px-6 py-3 relative">



        {/* Logo (Left) */}
        <div className="flex-shrink-0 -ml-2">
  <Link to="/" className="text-2xl font-bold text-gray-800">LearnSeek</Link>
</div>


        {/* Nav Links (Center) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-6">
          <Link to="/" className="text-lg text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about" className="text-lg text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/contact" className="text-lg text-gray-700 hover:text-blue-600">Contact</Link>
          <Link to="/teacher" className="text-lg text-gray-700 hover:text-blue-600">Teachers</Link>
        </div>

        {/* Auth/Profile (Right) */}
        <div className="hidden md:flex gap-4 pr-1 items-center">

          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-profile.png";
                  }}
                />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button (Right) */}
        <div className="md:hidden absolute right-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 px-4 py-4 bg-yellow-100 shadow-md">
          <Link to="/" className="text-lg text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" className="text-lg text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" className="text-lg text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/teacher" className="text-lg text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Teachers</Link>

          <div className="w-full border-t border-gray-300 my-2"></div>

          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-profile.png";
                  }}
                />
                <span className="text-gray-700">Profile</span>
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-600 hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
