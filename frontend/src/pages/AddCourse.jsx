import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const loadData = async () => {
    if (!isEdit) return;

    try {
      let res = await axios.get(`http://localhost:5000/course/view-course/${id}`);
      let formValue = res.data.data;

      Object.keys(formValue).forEach((key) => {
        setValue(key, formValue[key]);
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load course detail");
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const fileInput = document.getElementById("image");

      if (fileInput && fileInput.files[0]) {
        formData.append("image", fileInput.files[0]);
      }

      let res;
      if (isEdit) {
        res = await axios.put(`http://localhost:5000/course/view-course/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer Token ${localStorage.getItem("token")}`,
          },
        });
      } else {
        res = await axios.post(`http://localhost:5000/course/add-course`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer Token ${localStorage.getItem("token")}`,
          },
        });
      }
      toast.success(res.data.message || "Course added successfully");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <div className="h-screen   bg-slate-200 py-10">
      <h1 className='text-center text-4xl font-mono md:text-7xl pb-10'>{isEdit ? "Edit Course" : "Add Course"}</h1>
      <div className='rounded-lg bg-slate-300 w-[50%]  md:mx-auto sm:mx-auto xs:mx-auto '>
        <div className='min-w-96 p-6 rounded-lg shadow-md bg-gray-400 px-auto'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text'>Course Name</span>
              </label>
              <input
                type='text'
                placeholder='Course name'
                className='w-full input input-bordered h-12'
                {...register("title")}
              />
            </div>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text'>Description</span>
              </label>
              <input
                type='text'
                placeholder='Description'
                className='w-full input input-bordered h-12'
                {...register("description")}
              />
            </div>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text'>Course Image</span>
              </label>
              <input type="file" className="file-input w-full input-bordered h-12" name="image" id="image" />
            </div>
            <div className='p-2'>
              <button className=' btn btn-block bg-blue-600 text-white btn-sm mt-2 border-none hover:bg-blue-500' disabled={loading}>
                {loading ? <span className='loading loading-spinner'></span> : (isEdit ? "Update Course" : "Add Course")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
