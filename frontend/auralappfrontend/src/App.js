import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Mentor from "./pages/mentor";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Education from "./pages/Education";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/Updatepass";
import Logout from "./pages/logout";
import "./style/global.css";
import Course from "./pages/Course";
import Calendar from "./pages/calendar";
import { allCourses } from "./services/courses.service";
import Contactus from "./components/Settings/Contactus";
import Faq from "./components/Settings/Faq";
import Students from './components/students/Students'
// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<EducationButton />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/education" element={<Education />} />
//         <Route path="/courses/:slug" element={<Course />} />
//       </Routes>
//     </>

// import Students from "./components/students/Students";

function App() {
  const [courseData, setCourseData] = useState([]);
  const getAllCourse = async () => {
    try {
      const { data } = await allCourses();
      setCourseData(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCourse();
  }, []);
  return (
    <div className="relative z-0">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Admin />} />
        <Route path="/students" element={<Students />} />
        <Route
          path="/education"
          element={<Education courseData={courseData} />}
        />
        <Route
          path="/courses/:slug"
          element={<Course courseData={courseData} />}
        />
        {/* Add a default route */}
        <Route path="/student-profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/updatePass" element={<ChangePassword />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/calendar" element={<Calendar />} />
        
      </Routes>
    </div>
  );
}

export default App;
