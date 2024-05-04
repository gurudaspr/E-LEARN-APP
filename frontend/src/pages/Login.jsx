import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export default function Login() {
	const { register, handleSubmit, loading, login } = useLogin();
    const navigate = useNavigate();

    const onSave = (data) => {
        login(data, navigate);
    };


    return (
        <div className='flex justify-center items-center  h-screen bg-slate-200 w-full '>
        <div className='rounded-lg  bg-slate-300  w-12 flex flex-col items-center justify-center min-w-80 md:min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center'>
					Login
					<span className='text-blue-500'> E-Learn</span>
				</h1>

				<form onSubmit={handleSubmit(onSave)}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Email</span>
						</label>
						<input
							type='email'
							placeholder='Enter Email'
							className='w-full input input-bordered h-10'
							{...register("email")}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							{...register("password")}
						/>
					</div>
					<div className=' flex justify-between'>
					
					<Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>
					<Link to='/reset-password' className='text-sm  hover:underline hover:text-red-600 mt-2 inline-block'>
						 Reset Password
					</Link>

					</div>

					<div>
						<button className='btn btn-block bg-blue-600 text-white  btn-sm mt-2 border-none hover:bg-blue-500' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
        </div>
	);
};


