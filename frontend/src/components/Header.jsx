import React, { useEffect, useState } from 'react';
import { FaBarsStaggered, FaX, FaBookOpen } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { FaPlus } from 'react-icons/fa';

const Header = () => {
    let Links = [
        { id: 1, name: "HOME", link: "/" },
        { id: 2, name: "COURSES", link: "/courses" },
        // { id: 3, name: "ABOUT", link: "/about" },
    ];
    let [open, setOpen] = useState(false);

    const { isAuth, userRole, checkAuth } = useAuthStore();
    const isAdmin = userRole === 'admin';
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // After logging out, navigate to the home page
        navigate("/");
    };

    return (
        <div className='shadow-md w-full sticky  top-0  left-0 z-10'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                {/* logo section */}
                <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
                    <FaBookOpen className='w-7 h-7 text-blue-600' />
                    <span>E-Learn</span>
                </div>
                {/* Menu icon */}
                <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                    {
                        open ? <FaX /> : <FaBarsStaggered />
                    }
                </div>
                {/* link items */}
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                    {
                        Links.map((link) => (
                            <li key={link.id} className='md:ml-8 md:my-0 my-7 font-semibold'>
                                <Link to={link.link} className='text-gray-800 hover:text-blue-400 duration-500'>{link.name}</Link>
                            </li>
                        ))
                    }

                    {/* is admin logged in  */}
                    {isAdmin ? (
                        <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                            <Link to="/add-course" className='text-gray-800 hover:text-blue-400 duration-500 flex items-center'>
                                ADD COURSE
                            </Link>
                        </li>
                    ) : (
                        <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                            <Link to="/my-courses" className='text-gray-800 hover:text-blue-400 duration-500'>MY COURSES</Link>
                        </li>
                    )}


                    {/* Conditional rendering of the button based on authentication state */}
                    {isAuth ? (
                        <button onClick={handleLogout} className='btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static'>LOGOUT</button>
                    ) : (
                        <Link to={'/login'}><button className='btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static'>LOGIN</button></Link>
                    )}
                </ul>
                {/* button */}
            </div>
        </div>
    );
};

export default Header;
