import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';

const useLogin = () => {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const login = async (data, navigate) => {
        try {
            setLoading(true);
            let res = await axios.post(`http://localhost:5000/auth/login`, data);
            console.log(res.data.token);
            useAuthStore.getState().login(res.data.token, res.data.userRole, res.data.userId);
            let success = res.data.message;
            toast.success(success);
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Failed authentication");
            reset();
        } finally {
            setLoading(false);
        }
    };

    return { register, handleSubmit, loading, login };
};

export default useLogin;