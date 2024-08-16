import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore.js';
import { toast } from 'react-toastify';
import Modal from '../components/Model.jsx';
import AdminCourses from '../components/admin/AdminCourses.jsx';
import UserCourses from '../components/user/UserCourses.jsx';
import { baseUrl } from '../config/baseUrl.js';
import { useNavigate } from 'react-router-dom';

export default function CoursePage() {
  const navigate = useNavigate();
  const { userRole, userId , isAuth } = useAuthStore();
  const isAdmin = userRole === 'admin';

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [deleteCourseId, setDeleteCourseId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseUrl}/course/view-course/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${baseUrl}/course/view-course/${deleteCourseId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchData();
      toast.success("Course deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course");
    } finally {
      setDeleteCourseId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteCourseId(null); 
  };

  return (
    <div className="h-min-screen h-full bg-slate-200 py-10 ">
      <h1 className='text-center text-4xl font-mono md:text-7xl pb-10'>Our Courses</h1>
      <div className="container mx-auto">
        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20'>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="skeleton w-80 h-72 mx-auto bg-slate-300 shadow-xl"></div>
            ))}
          </div>
        ) : (
          isAdmin ? (
            <AdminCourses courses={courses} fetchData={fetchData} setDeleteCourseId={setDeleteCourseId} />
          ) : (
            <UserCourses courses={courses} userId={userId} isAuth={isAuth} navigate={navigate} />
          )
        )}
      </div>
      <Modal
        isOpen={deleteCourseId !== null}
        onProceed={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}