import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='bkgimg flex justify-center items-center  h-screen bg-slate-200 w-full '>
      <div>
        <div>
          <h1 className=' text-blue-600 text-center py-3 text-3xl sm:text-5xl lg:text-6xl'>Welcome to E-Learn App</h1>
        </div>

        <div className='text-center'>
         <Link to={'/courses'}> <button className='btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static'>Get a course</button></Link> 
        </div>
      </div>
    </div>
  )
}
