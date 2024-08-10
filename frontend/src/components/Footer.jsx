import React from 'react';
import { FaBookOpen } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className=''>
        <footer className="bg-white h-14 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] mt-auto">
            <div className="container mx-auto px-4 h-full">
                <div className="flex items-center justify-center space-x-4 text-sm h-full">
                    <div className="flex items-center">
                        <FaBookOpen className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-bold">E-Learn</span>
                    </div>
                    <span className="text-gray-600">
                        © {currentYear} All rights reserved.
                    </span>
                    <span className="text-gray-600 font-semibold hidden md:block ">
                        Designed by gurudaspr
                    </span>
                </div>
            </div>
        </footer>
        </div>
    );
};

export default Footer;