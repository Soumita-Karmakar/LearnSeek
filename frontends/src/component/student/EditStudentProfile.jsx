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
    <div className="container mt-4">
      <h2>Edit Student Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <label>Name</label>
            <input name="name" value={studentData.name} disabled className="form-control mb-2" />

            <label>Email</label>
            <input name="email" value={studentData.email} disabled className="form-control mb-2" />

            <label>Phone</label>
            <input name="phone" value={studentData.phone} onChange={handleChange} className="form-control mb-2" />

            <label>City</label>
            <input name="city" value={studentData.city} onChange={handleChange} className="form-control mb-2" />
          </div>

          <div className="col-md-6">
            <label>Class</label>
            <input name="class" value={studentData.class} onChange={handleChange} className="form-control mb-2" />

            <label>Bio</label>
            <textarea name="bio" value={studentData.bio} onChange={handleChange} className="form-control mb-2" rows={3} />
          </div>
        </div>

        <button type="submit" className="btn btn-success">Update Profile</button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default EditStudentProfile;
