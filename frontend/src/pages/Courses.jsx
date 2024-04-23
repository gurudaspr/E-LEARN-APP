import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';
import { useNavigate  } from 'react-router-dom';

export default function Courses() {
  const { userRole } = useAuthStore();
  const isAdmin = userRole === 'admin';
  const navigate = useNavigate();


  const token = localStorage.getItem('token');
  console.log(token)
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchData()
  }, []);
  const fetchData = async () => {
    axios.get('http://localhost:5000/course/view-course/', {
    })
      .then(res => {
        // console.log('Fetched courses:', res.data);
        setCourses(res.data);
        console.log(res.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }


  const handleEdit = async (id) => {
    navigate(`/course/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/course/view-course/${id}`);
      fetchData();
      toast.success("Course deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("error");
    }
  };

  return (
    <div className="h-full bg-slate-200 py-10">
      <h1 className='text-center text-4xl font-mono md:text-7xl pb-10'>Our Courses</h1>
      <div className="container mx-auto">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-20'>
          {courses.map(course => (
            <div key={course.id} className="card card-compact mx-auto bg-base-100 shadow-xl w-80 h-72">
              <figure><img src={course.imageUrl} alt={course.title} /></figure>
              <div className="card-body">
                <h2 className="card-title">{course.title}
                  {course.isNewtype && <div className="badge badge-warning">NEW</div>}
                </h2>
                <p>{course.description}</p>
                {isAdmin ? (
                  <div className=" card-actions justify-between">
                    <button   onClick={() => handleDelete(course._id)} className="  text-red-600  rounded-full hover:text-red-500 border-none  p-2">
                      <FaTrash className='w-8 h-8' />
                    </button>
                    <button  onClick={() => handleEdit(course._id)} className="btn bg-blue-600 text-white rounded border-none hover:bg-blue-500">Edit</button>
                  </div>
                ) : (
                  <div className=" card-actions justify-end">
                    <button className="btn bg-blue-600 text-white rounded border-none hover:bg-blue-500">Enroll</button>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}