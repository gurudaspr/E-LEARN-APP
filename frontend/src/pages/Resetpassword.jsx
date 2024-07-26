import React, { useState } from 'react'
import OtpInput from '../components/OtpInput';
import useReset from '../hooks/useReset';
import { useForm } from 'react-hook-form';
import ResetPswd from '../components/ResetPswd';


export default function Resetpassword() {

	const { loading, sendResetPasswordOtp, verifyResetPasswordOtp,otpVerified } = useReset();
	const { register, handleSubmit, reset } = useForm();
	const [email, setEmail] = useState('');

    const onSave = async (data) => {
        setEmail(data.email);
        await sendResetPasswordOtp(data);
    };

    const onVerifyOtp = async (otp) => {
        const data = { email, otp };
        await verifyResetPasswordOtp(data);
    };

	return (
		<div className='flex justify-center items-center  h-screen bg-slate-200 w-full '>
			<div className='rounded-lg  bg-slate-300  w-12 flex flex-col items-center justify-center min-w-80 md:min-w-96 mx-auto'>
				{!otpVerified?(
				<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
					<h1 className='text-3xl font-semibold text-center'>
						Reset
						<span className='text-blue-500'> Password</span>
					</h1>

					<h3 className='text-md font-semibold text-center pt-5'>Enter the registered email to reset password.</h3>

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
						<div className=' flex justify-end'>
							<button className='btn w-40 bg-red-500 text-white e  btn-sm mt-2 border-none hover:bg-red-400' disabled={loading}>
								{loading ? <span className='loading loading-spinner '></span> : "Send OTP"}
							</button>
						</div>
					</form>
					<OtpInput  onVerify={onVerifyOtp} />
				</div>):(
					<ResetPswd email={email} />
				)}
				
			</div>
		</div>
	)
}
