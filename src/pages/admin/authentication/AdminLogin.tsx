import React from 'react';
import { useFormik } from "formik";
import { AdminLogins,MyError } from '../../../utils/validations/commonVaild';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAdminCredentials } from "../../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { loginValidation } from '../../../utils/validations/yupValidation';
import {  RiLockPasswordLine } from 'react-icons/ri';
import { IoPersonOutline } from 'react-icons/io5';
import LoginImage from '../../../assets/images/Admin login/login.png';
import { useAdminLoginMutation } from "../../../slices/adminApiSlice";

const AdminLogin: React.FC = () => {
    const dispatch = useDispatch();
    const [login] = useAdminLoginMutation();
    const navigate = useNavigate();
    
    const initialValues: AdminLogins = {
        email: "",
        password: ""
      };

      const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: loginValidation,
        onSubmit: async (values) => {
          try {
            console.log(values);
            
            const { password, email } = values; // Destructure values
            const res = await login({ password, email }).unwrap();
            dispatch(setAdminCredentials({ ...res.data}));
            navigate('/admin')
            toast.success(res.message);
          } catch (err) {
            toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
          }
        },
      });

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white" style={{ backgroundImage: `url(${LoginImage})`, backgroundSize: 'cover' ,backgroundPosition: 'center'}}>
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 rounded-lg shadow-lg p-8 w-96 text-center">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Admin Login</h2>
        <div className="mb-6 flex items-center">
          <IoPersonOutline className="text-white mr-3" />
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            type="email"
            placeholder="Username"
            className="w-full px-4 py-2 bg-transparent center border border-white border-solid rounded-lg"
          />
          {errors.email && touched.email && (
            <div className="text-red-500">{errors.email}</div>
          )}
        </div>
        <div className="mb-6 flex items-center">
          <RiLockPasswordLine className="text-white mr-3" />
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-transparent center border border-white border-solid rounded-lg"
          />
          {errors.password && touched.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>
        <button className="w-64 ml-4 mt-4 py-2 px-4 text-center bg-transparent text-white rounded-lg border border-white border-solid hover:bg-white hover:text-black focus:outline-none">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
