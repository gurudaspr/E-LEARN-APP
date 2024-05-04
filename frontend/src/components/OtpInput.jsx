import React, { useRef } from 'react';

const OtpInput = ({ email, onVerify ,loading }) => {
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const onSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const otp = inputRefs.map(ref => ref.current.value).join(''); // Concatenate values of all OTP input fields
        onVerify( otp); // Pass email and OTP to the onVerify function
    };

    const handleOnChange = (index, e) => {
        const maxLength = 1;
        const input = e.target;
        const value = input.value;
        if (!/^[0-9]*$/.test(value)) {
            input.value = '';
            return;
        }
        if (value.length >= maxLength && input.nextElementSibling) {
            input.nextElementSibling.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
            e.preventDefault();
            inputRefs[index - 1].current.focus();
        }
    };

    return (
        <div className='flex justify-center items-center bg-slate-200'>
            <div className='rounded-lg bg-slate-300 w-12 flex flex-col items-center justify-center min-w-80 md:min-w-96 mx-auto'>
                <div className='w-full p-6 '>
                    <h1 className=' text-md font-semibold text-center py-3'>
                        Enter OTP for {email}
                    </h1>
                    <form onSubmit={onSubmit}> {/* Manually handle form submission */}
                        <div className="flex justify-center items-center">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <input
                                    key={index}
                                    type='text'
                                    maxLength={1}
                                    className='w-10 h-10 text-2xl text-center border rounded mx-1'
                                    ref={inputRefs[index]}
                                    onChange={(e) => handleOnChange(index, e)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                />
                            ))}
                        </div>

                        <div>
                            <button type="submit" className='btn btn-block bg-blue-600 text-white btn-sm mt-2 border-none hover:bg-blue-500' disabled={loading}>
                                {loading ? <span className='loading loading-spinner'></span> : "Verify OTP"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OtpInput;
