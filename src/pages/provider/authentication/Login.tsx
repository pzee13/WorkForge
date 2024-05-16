import { useFormik } from "formik";
import { setProviderCredentials } from "../../../slices/authSlice"
import { useProviderLoginMutation } from '../../../slices/providerApiSlice';
import { loginValidation } from "../../../utils/validations/yupValidation";
import { AdminLogins,MyError } from '../../../utils/validations/commonVaild';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import logo from '../../../assets/images/Set Space-logo/realLogo/png/logo-no-background.png'
import { Link } from 'react-router-dom'
import LoginPic from '../../../assets/images/loginFormPic.jpg';
import Spinner from '../../../component/user/Loader/Spinner'
import './Login.css'

function Login() {
  const dispatch = useDispatch();
  const [login] = useProviderLoginMutation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
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
          setIsLoading(true);
          const { password, email } = values; // Destructure values
          const res = await login({ password, email }).unwrap();
          dispatch(setProviderCredentials({ ...res.data}));
          navigate('/provider/home')
          toast.success(res.message);
        } catch (err) {
          toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        }finally {
          setIsLoading(false); 
        }
      },
    });

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div className=" flex items-center justify-between p-4 shadow-lg navbar dark-green-border bg-gray-50">
        {/* Logo */}
        <div className="flex items-center ">
          <img src={logo} alt="Logo" className="h-8 mr-2 ml-10 shadow-lg" />
         
        </div>
        {/* Signup Link */}
        <p className="text-sm">Don't have an account? <Link to={"/provider/register"} className="text-blue-500">Sign up</Link></p>
      </div>
      {/* Main Content Section */}
      <div className="flex-1 flex dark-green-border">
        {/* Picture */}
        <div className="bg-cover dark-green-border bg-center w-1/2" style={{ backgroundImage: `url(${LoginPic})` }}></div>
        {/* Form */}
        <div className="flex-1 flex justify-center items-center dark-green-border ">
          <div className="w-full max-w-md shadow-md p-8 rounded-md dark-green-border">
          <div className="flex items-center justify-center mb-2">
            <img src={logo} alt="Logo" className="h-8" />
         
          </div>
            <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
            <form  onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Username</label>
                <input type="email" id="email" placeholder='Enter your email' className="w-full px-3 py-2 border  bg-gray-100 rounded-full focus:outline-none"
                 value={values.email}
                 onChange={handleChange} />
                {errors.email && touched.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                <input type="password" id="password" placeholder='Enter password'  className="w-full px-3 py-2 border  bg-gray-100 rounded-full focus:outline-none" 
                value={values.password}
                onChange={handleChange} />
                 {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
              </div>
              <button type="submit" className="w-full login-button text-white py-2 px-4 rounded-md ">Login</button>
              {isLoading ? <Spinner /> : null}
            </form>
            <div className="mt-4 text-center">
              <a href="#" className="text-blue-500">Forgot password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
