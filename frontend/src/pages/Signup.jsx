import React from 'react';
import { Link } from "react-router-dom";
import useSignup from '../hooks/useSignup';
import OtpInput from '../components/OtpInput';

const Signup = () => {
  const {loading , register, handleSubmit, onSave,handleOtpVerification, otpSent, email  } = useSignup(); // Include otpSent from useSignup hook

  // Render the Signup form or OTP input based on otpSent state
  return (
    <div className='flex justify-center items-center  h-screen bg-slate-200 w-full '>
      <div className='rounded-lg  bg-slate-300  w-12 flex flex-col items-center justify-center min-w-80 md:min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <h1 className='text-3xl font-semibold text-center '>
            Signup <span className='text-blue-500'> E-Learn</span>
          </h1>

          {/* Conditionally render Signup form or OTP input based on otpSent */}
          {!otpSent ? (
              <form onSubmit={handleSubmit(onSave)}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10'
                            {...register("fullName")}
							
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Email</span>
						</label>
						<input
							type='email'
							placeholder='johndoe@xyz.com'
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

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
                            {...register("confirmPassword")}

						/>
					</div>

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?
					</Link>

              <div>
                <button className='btn btn-block bg-blue-600 text-white  btn-sm mt-2 border-none hover:bg-blue-500' disabled={loading}>
                  {loading ? <span className='loading loading-spinner'></span> : "Next"}
                </button>
              </div>
            </form>
          ) : (
            <OtpInput email={email} loading={loading}  onVerify={handleOtpVerification} />


          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
