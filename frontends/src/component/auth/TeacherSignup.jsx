import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

function TeacherSignup() {

const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [subjects, setSubjects] = useState("");
const [city, setCity] = useState("");
const [experience, setExperience] = useState("");
const [bio, setBio] = useState("");
const [availability, setAvailability] = useState("");
const [phone, setPhone] = useState("");




const handleSubmit = async (e) => {
    e.preventDefault();

   

    const addTeacher = {name, email, password,subjects,city,experience: Number(experience) ,bio,availability,phone}
    console.log("Sending data:", addTeacher);

try {
    const response = await fetch("http://localhost:8000/api/teacher/signup", {
      method: "POST",
      body: JSON.stringify(addTeacher),
      headers: {
        "Content-Type": "application/json",
      }
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message || "Signup failed");
      return;
    }

    toast.success(result.message || "Signup successful!");
    setTimeout(() => navigate("/login"), 2000);

  } catch (err) {
    toast.error("Something went wrong. Please try again.");
  }
};


    return (
        <div className="container my-2">
            <ToastContainer position="top-right" autoClose={3000} />
        <h2 className="text-center">Signup As Teacher</h2>

            <form onSubmit = {handleSubmit}>
                <div className="mb-3">
                    <label  className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e)=> setName(e.target.value)}  />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}  />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e)=> setPassword(e.target.value)}  />
                </div>        
                <div className="mb-3">
                    <label  className="form-label">Subjects</label>
                    <input type="text" className="form-control" value={subjects} onChange={(e)=> setSubjects(e.target.value)}  />
                </div>

                <div className="mb-3">
                    <label  className="form-label">City</label>
                    <input type="text" className="form-control" value={city} onChange={(e)=> setCity(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label  className="form-label">Experience</label>
                    <input type="number" className="form-control" value={experience} onChange={(e)=> setExperience(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Bio</label>
                    <input type="text" className="form-control" value={bio} onChange={(e)=> setBio(e.target.value)}  />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Avalibility</label>
                    <input type="text" className="form-control" value={availability} onChange={(e)=> setAvailability(e.target.value)}  />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Phone No</label>
                    <input type="tel" className="form-control" value={phone} onChange={(e)=> setPhone(e.target.value)}  />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                 <p className="mt-3">
      Already have an account?{" "}
      <Link to="/login">Login</Link>
    </p>
            </form>
        </div>
    )
 }

 export default  TeacherSignup;