
import { useFormik } from "formik";
import { setCredential } from "../../../slices/authSlice"
import { useLoginMutation } from '../../../slices/userApiSlice';
import { loginValidation } from "../../../utils/validations/yupValidation";
import { AdminLogins,MyError } from '../../../utils/validations/commonVaild';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/images/Set Space-logo/default.png'
import signUpImage from '../../../assets/images/Signup-user/coworking-sighnup.jpg'
import { Link } from 'react-router-dom'
import './SignUp.css';

function Login() {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
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
          dispatch(setCredential({ ...res.data}));
          navigate('/user/home')
          toast.success(res.message);
        } catch (err) {
          toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        }
      },
    });
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 shadow-lg bg-gray-50">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2 ml-10" />
         
        </div>
        {/* Sign Up Link */}
        <p className="text-sm">Don't have an account? <Link to={'/user/register'} className="text-blue-500">Sign Up</Link></p>
      </div>
      {/* Main Content Section */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form */}
        <div className="flex-1 flex justify-center items-center ">
        <div className="w-full max-w-md shadow-md p-8 rounded-md">
          <div className="">
             <img src={logo} alt="Logo" className="h-8 " />
          </div>
       
              <h2 className="text-3xl font-bold text-center mb-8">Login</h2> 
              <form onSubmit={handleSubmit} className="text-center">
                <div className="mb-8"> 
                  <input type="email" id="email" placeholder="Email" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" 
                  name="email"
                  value={values.email}
                  onChange={handleChange} />
                  {errors.email && touched.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
                </div>
                <div className="mb-8"> 
                  <input type="password" id="password" placeholder="Password" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" 
                    name="password"
                    value={values.password}
                    onChange={handleChange} />
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                </div>
                <button type="submit" className="w-full signup-button align-middle text-white py-2 px-4 rounded-full mb-8" style={{ width: '120px', height: '40px', margin: '20px auto', marginRight: '10px' }} >Login</button> 
              </form>
            </div>

        </div>
        {/* Picture */}
        <div className="hidden lg:block bg-cover bg-center w-1/2">
          <img src={signUpImage} alt="Image" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Login;
