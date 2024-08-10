import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config/baseUrl";


const useReset = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();
  const sendResetPasswordOtp = async (data) => {
    setLoading(true);
    try {
      const exists = await checkEmailExists(data.email);
      if (!exists) {
        setEmailExists(true);
        toast.error("There is no account with this email address. Please sign up.");
        setLoading(false);
        return;
      }
      const response = await axios.post(`${baseUrl}/auth/reset-password-otp`, data);
      setEmail(data.email);
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error sending OTP:', error);
      return { success: false, error: 'Failed to send OTP' };
    } finally {
      setLoading(false);
    }
  };

  const verifyResetPasswordOtp = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/reset-otp-verify`, data);
      toast.success(response.data.message);
      console.log(response.data.message);
      setOtpVerified(true);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await axios.post(`${baseUrl}/auth/reset-password`, data);
      toast.success(response.data.message);
      navigate('/login')
    } catch (error) {
      console.error('Error resetting password:', error);
      return { success: false, error: 'Failed to reset password' };
    } finally {
      setLoading(false);
    }
  }

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/check-email`, { email });
      return response.data.exists; // Assume backend returns { exists: true/false }
    } catch (error) {
      console.error(error);
      return false; // Return false in case of an error
    }
  };
  return { loading, sendResetPasswordOtp, verifyResetPasswordOtp, otpVerified, resetPassword, email };
};

export default useReset;
