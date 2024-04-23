import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import useAuthStore from '../store/authStore';

export default function Courses() {
  const isAdmin = useAuthStore(state => state.userRole === 'admin');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/course/view-course')
      .then(res => {
        console.log('Fetched courses:', res.data); // Log fetched data
        setCourses(res.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);
  return (
    <div className="h-full bg-slate-200 py-10">
      <h1 className='text-center text-4xl font-mono md:text-7xl pb-10'>Our Courses</h1>
      <div className="container mx-auto">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
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
                    <button className="  text-red-600  rounded-full hover:text-red-500 border-none  p-2">
                      <FaTrash className='w-8 h-8' />
                    </button>
                    <button className="btn bg-blue-600 text-white rounded border-none hover:bg-blue-500">Edit</button>
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