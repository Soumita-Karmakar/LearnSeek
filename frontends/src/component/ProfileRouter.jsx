import { Navigate } from 'react-router-dom';
import TeacherProfile from './teacher/TeacherProfile';
import StudentProfile from './student/Studentprofile';

const ProfileRouter = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = localStorage.getItem('role');

  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'teacher') {
    return <TeacherProfile user={user} />;
  } else if (role === 'student') {
    return <StudentProfile user={user} />;
  } else {
    return <h3>Invalid user role</h3>;
  }
};

export default ProfileRouter;
