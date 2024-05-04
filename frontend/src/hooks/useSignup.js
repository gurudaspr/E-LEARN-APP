import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [emailExists, setEmailExists] = useState(false); // State to track if email exists
    const [otpSent, setOtpSent] = useState(false);
    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState("");
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
  
    const onSave = async (data) => {
      console.log(data);
      try {
        setLoading(true);
        if (!validateInput(data)) {
          setLoading(false);
          return;
        }
        setUserData(data)
        // Check if email exists

        const exists = await checkEmailExists(data.email);
        if (exists) {
          setEmailExists(true);
          toast.error("Email already exists");
          setLoading(false);
          return;
        }
        // If email doesn't exist, proceed with sending OTP
        
        await sendOtp(data.email);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }; 
    const checkEmailExists = async (email) => {
      try {
        const response = await axios.post(`http://localhost:5000/auth/check-email`, { email });
        return response.data.exists; // Assume backend returns { exists: true/false }
      } catch (error) {
        console.error(error);
        return false; // Return false in case of an error
      }   
    };

 const sendOtp = async (email) => {
    try {
      const response = await axios.post(`http://localhost:5000/auth/send-otp`, { email });
      if (response.status === 200) {
        setOtpSent(true); // OTP sent successfully, update state
        setEmail(email); // Save user's email for OTP verification
        toast.success("OTP sent successfully");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const verifyOtp = async ( otp) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/auth/verify-otp`, {otp ,userData });
      if (response.status === 201) {
        toast.success("Signup success");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Invalid OTP");
      // handleError(error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.response && error.response.status === 400 && error.response.data && error.response.data.error === "Email already exists") {
      toast.error("Email already exists");
    } else {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const handleOtpVerification = async ( otp) => {
    try {
      await verifyOtp( otp);
    } catch (error) {
      handleError(error);
    }
  };
  

  return { loading , register, handleSubmit, onSave,handleOtpVerification, verifyOtp, emailExists , otpSent, email, };
};

const validateInput = (data) => {
    if (!data.fullName || !data.email || !data.password || !data.confirmPassword) {
      toast.error("Please fill in all fields");
      return false;
    }
  
    if (!isValidEmail(data.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
  
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (data.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }
  
    return true;
  }; 
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

export default useSignup;
