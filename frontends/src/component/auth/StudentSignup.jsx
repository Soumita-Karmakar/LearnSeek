import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

function StudentSignup() {

const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [city, setCity] = useState("");
const [subjectclass, setSubjectclass] = useState("");
const [phone, setPhone] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();


    const addStudent = {name, email, password,city,class:subjectclass,phone}
    console.log("Sending data:", addStudent);

try {
    const response = await fetch("http://localhost:8000/api/student/addstudent", {
      method: "POST",
      body: JSON.stringify(addStudent),
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

    return(
        <div className="container my-2">
            <ToastContainer position="top-right" autoClose={3000} />
        <h2 className="text-center">Signup As Student</h2>

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
                    <label  className="form-label">City</label>
                    <input type="text" className="form-control" value={city} onChange={(e)=> setCity(e.target.value)} />
                </div>       
                <div className="mb-3">
                    <label  className="form-label">Phone No</label>
                    <input type="tel" className="form-control" value={phone} onChange={(e)=> setPhone(e.target.value)}  />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Class</label>
                    <input type="text" className="form-control" value={subjectclass} onChange={(e)=> setSubjectclass(e.target.value)} />
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

export default StudentSignup;