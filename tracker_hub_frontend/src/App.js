import Navbar from "./Pages/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Contactus from "./Pages/Contact_us/Contactus";
import Courses from "./Pages/Courses/Courses";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Assignments from "./Pages/Assignments/Assignments";
import Notfound from "./Pages/NotFound/Notfound";

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
        <Route path="/courses" element={<Courses />} />
        <Route path="/assignment" element={<Assignments />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="assignment" element={<Assignments />} />
        </Route>
        <Route path="*"  element={<Notfound />}/>

        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
