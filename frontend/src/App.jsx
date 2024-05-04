import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import AddCourse from "./pages/AddCourse";
import EnrolledCourse from "./pages/EnrolledCourse";
import Resetpassword from "./pages/Resetpassword";

export default function App() {
  const { isAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
    <Header />
    <div className="overflow-y-auto h-full">
    <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Navigate replace to="/" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/edit-course/:id" element={<AddCourse />} />
            <Route path="/my-courses" element={<EnrolledCourse />} />
           
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses/>} />
            <Route path="/my-courses" element={<Navigate replace to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<Resetpassword />} />
            {/* <Route path="/add-course" element={<AddCourse />} /> */}
            
          </>
        )}
      </Routes>
      <ToastContainer autoClose={1000}  position="bottom-center" />
      </div>
    </>
  )
}