import { useFormik } from "formik";
import { setProviderCredentials } from "../../../slices/authSlice"
import { useProviderLoginMutation } from '../../../slices/providerApiSlice';
import { loginValidation } from "../../../utils/validations/yupValidation";
import { AdminLogins,MyError } from '../../../utils/validations/commonVaild';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/images/Set Space-logo/default.png'
import { Link } from 'react-router-dom'
import LoginPic from '../../../assets/images/loginFormPic.jpg';
import './Login.css'

function Login() {
  const dispatch = useDispatch();
  const [login] = useProviderLoginMutation();
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
          dispatch(setProviderCredentials({ ...res.data}));
          navigate('/provider/home')
          toast.success(res.message);
        } catch (err) {
          toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        }
      },
    });

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div className=" flex items-center justify-between p-4 shadow-lg bg-gray-50">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <h1 className="text-xl font-bold">YourApp</h1>
        </div>
        {/* Signup Link */}
        <p className="text-sm">Don't have an account? <Link to={"/provider/register"} className="text-blue-500">Sign up</Link></p>
      </div>
      {/* Main Content Section */}
      <div className="flex-1 flex">
        {/* Picture */}
        <div className="bg-cover bg-center w-1/2" style={{ backgroundImage: `url(${LoginPic})` }}></div>
        {/* Form */}
        <div className="flex-1 flex justify-center items-center ">
          <div className="w-full max-w-md shadow-md p-8 rounded-md">
            <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
            <form  onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Username</label>
                <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                 value={values.email}
                 onChange={handleChange} />
                {errors.email && touched.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" 
                value={values.password}
                onChange={handleChange} />
                 {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
              </div>
              <button type="submit" className="w-full login-button text-white py-2 px-4 rounded-md ">Login</button>
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
