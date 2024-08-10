import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { baseUrl } from '../../config/baseUrl';


export default function UserCourses({ courses, userId , isAuth }) {

  if(!isAuth){
    return <Navigate replace to="/login" />
  }
  const enrollCourse = async (courseId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${baseUrl}/enroll/enroll-course`, {
        userId: userId,
        courseId: courseId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Enrolled successfully");
    } catch (error)  {
      if (error.response && error.response.status === 400 && error.response.data.error === 'User already enrolled in this course') {
        toast.error("User already enrolled in this course");
      } else {
        console.error(error);
        toast.error("Failed to enroll");
      }
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20'>
      {courses.map(course => (
        <div key={course._id} className="card card-compact mx-auto bg-base-100 shadow-xl w-80 h-72">
          <figure><img src={course.imageUrl} alt={course.title} className='transition-transform transform-gpu duration-300 hover:scale-110' /></figure>
          <div className="card-body">
            <h2 className="card-title">{course.title}
              {course.isNewtype && <div className="badge badge-warning">NEW</div>}
            </h2>
            <p>{course.description}</p>
            <div className="card-actions justify-end">
              <button onClick={() => enrollCourse(course._id)} className="btn bg-blue-600 text-white rounded border-none hover:bg-blue-500">Enroll</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}