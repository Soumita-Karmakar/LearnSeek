import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './component/navbar/Navbar';
import Home from './component/home/Home';
import Login from './component/auth/Login';
import TeacherSignup from './component/auth/TeacherSignup';
import StudentSignup from './component/auth/StudentSignup';
import ChooseSignup from './component/auth/ChooseSignup';
import AllTeachers from './component/teacher/AllTeachers';
import SearchTeacher from './component/home/SearchTeacher';
import TeacherDetails from './component/teacher/TeacherDetails';
import ProfileRouter from './component/ProfileRouter';
import EditProfile from './component/teacher/EditProfile';
import EditStudentProfile from './component/student/EditStudentProfile';
import MyChats from './component/student/MyChats';
import ChatBox from './component/ChatBox';
import MyReview from './component/student/MyReview'
import ReviewBox from './component/student/ReviewBox'
import TeacherMyChats from "./component/teacher/TeacherMyChats";
import TeacherMyReviews from "./component/teacher/TeacherMyReviews";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacher/signup" element={<TeacherSignup />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<ChooseSignup />} />
          <Route path="/teacher" element={<AllTeachers />} />
          <Route path="/search" element={<SearchTeacher />} />
          <Route path="/teacher/:id" element={<TeacherDetails />} />
          <Route path="/profile" element={<ProfileRouter />} />
          <Route path="/editTeacherprofile/:id" element={<EditProfile />} />
          <Route path="/editStudentprofile/:id" element={<EditStudentProfile />} />
          <Route path="/mychats" element={<MyChats />} />
          <Route path="/chat/:studentId/:teacherId" element={<ChatBox />} />
          <Route path="/myreviews" element={<MyReview />} />
          <Route path="/review/:studentId/:teacherId" element={<ReviewBox />} />
          <Route path="/teachermychats" element={<TeacherMyChats />} />
          <Route path="/teacherreviews" element={<TeacherMyReviews />} />



          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
