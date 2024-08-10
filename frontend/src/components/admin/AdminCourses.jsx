import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';


export default function AdminCourses({ courses, fetchData, setDeleteCourseId }) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-course/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteCourseId(id);
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20'>
      {courses.map(course => (
        <div key={course._id} className="card card-compact mx-auto bg-base-100 shadow-xl w-80 h-72">
          <figure><Link to={`/course-details/${course._id}`}><img src={course.imageUrl} alt={course.title} className='transition-transform transform-gpu duration-300 hover:scale-110' /></Link></figure>
          <div className="card-body">
            <h2 className="card-title">{course.title}
              {course.isNewtype && <div className="badge badge-warning">NEW</div>}
            </h2>
            <p>{course.description}</p>
            <div className="card-actions justify-between">
              <button onClick={() => handleDelete(course._id)} className="text-red-600 rounded-full hover:text-red-500 border-none p-2">
                <FaTrash className='w-8 h-8' />
              </button>
              <button onClick={() => handleEdit(course._id)} className="btn bg-blue-600 text-white rounded border-none hover:bg-blue-500">Edit</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}