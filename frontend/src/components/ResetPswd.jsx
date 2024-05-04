import React from 'react';
import { useForm } from 'react-hook-form';
import useReset from '../hooks/useReset';

export default function ResetPswd( {email}) {
    const { loading, resetPassword } = useReset();
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        const formData = { ...data,email};
        await resetPassword(formData);   
    };

    return (
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center'>
                Reset
                <span className='text-blue-500'> Password</span>
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <div className='py-2'>
                    <button className='btn btn-block bg-blue-600 text-white btn-sm mt-2 border-none hover:bg-blue-500' disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span> : "Reset Password"}
                    </button>
                </div>
            </form>
        </div>
    );
}
