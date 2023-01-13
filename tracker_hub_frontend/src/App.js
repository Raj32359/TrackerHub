import Navbar from "./Pages/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Contactus from "./Pages/Contact_us/Contactus";
import Courses from "./Pages/Courses/Courses";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Assignments from "./Pages/Assignments/Assignments";
import Notfound from "./Pages/NotFound/Notfound";
import AllCourses from "./Pages/Courses/AllCourse";
import CourseDetails from "./Pages/Courses/CourseDetails";
import CreateCourses from "./Pages/Courses/CreateCourses";
import Secretkey from "./Pages/Secretavalut/Secretkey";

function App() {
  return (
    <div className="App">
      <Navbar/>
      
      
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/assignment" element={<Assignments />} />
        <Route path="/allcourses/courseDetails/:id" element={<CourseDetails />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="assignment" element={<Assignments />} />
          <Route path="courses" element={<Courses />} />
          <Route path="createcourses" element={<CreateCourses />} />
          <Route path="secretkey" element={<Secretkey />} />
        </Route>

        <Route path="*"  element={<Notfound />}/>

        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
