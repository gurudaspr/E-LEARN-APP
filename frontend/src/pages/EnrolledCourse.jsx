import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore';
import axios from 'axios';

export default function EnrolledCourse() {
    const { userId } = useAuthStore();

    const [loading, setLoading] = useState(true);
    const [enrollments, setEnrollments] = useState([]);


    useEffect(() => {
        setTimeout(() => {
            fetchEnrolledCourses();
        }, 500);
    }, []);
    const fetchEnrolledCourses = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/enroll/view-enroll-course', { userId },{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            setEnrollments(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching enrolled courses:', error);
            setLoading(false);
        }
    };
    return (

        <div className="h-full bg-slate-200 py-10">
            <h1 className='text-center text-4xl font-mono md:text-7xl pb-10'>My Courses</h1>
            <div className="container mx-auto">
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-20'>
                    {loading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="skeleton w-80 h-72 mx-auto bg-slate-300 shadow-xl"></div>
                        ))
                    ) : (
                        enrollments.map((enroll) => (
                            <div key={enroll._id} className="card card-compact mx-auto bg-base-100 shadow-xl w-80 h-72">
                                <figure><img src={enroll.courseId.imageUrl} alt={enroll.courseId.title} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{enroll.courseId.title}
                                        {enroll.courseId.isNewtype && <div className="badge badge-warning">NEW</div>}
                                    </h2>
                                    <p>{enroll.courseId.description}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn bg-blue-600 text-white rounded border-none hover:bg-blue-500">View</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>



    )
}
