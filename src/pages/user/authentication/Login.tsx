
import { useFormik } from "formik";
import { useState } from 'react'
import { setCredential } from "../../../slices/authSlice"
import { useLoginMutation,useGoogleAuthMutation,useForgotPasswordMutation } from '../../../slices/userApiSlice';
import { loginValidation } from "../../../utils/validations/yupValidation";
import { AdminLogins,MyError } from '../../../utils/validations/commonVaild';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/images/Set Space-logo/realLogo/png/logo-no-background.png'
import signUpImage from '../../../assets/images/userLogin/LoginAi.jpg'
import { Link } from 'react-router-dom'
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Spinner from '../../../component/user/Loader/Spinner'
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { CustomModal } from '../../../component/common/Modal/CustomModal';

import './SignUp.css';

function Login() {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [googleAuth] = useGoogleAuthMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation() 
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

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
          const { password, email } = values; 
          const res = await login({ password, email }).unwrap();
          dispatch(setCredential({ ...res.data}));
          navigate('/user/home')
          toast.success(res.message);
        } catch (err) {
          toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        }finally {
        setIsLoading(false); // Set loading state to false when login process ends
      }
      },
    });

    interface DecodedCredential {
      name: string;
      email: string;
    }

    const openForgotModal = () => {
      setIsForgotModalOpen(true);
    };

    const closeForgotModal = () => {
      setIsForgotModalOpen(false);
    };


    const initialValuesForgot = {
      email: '',
    };
  
    const { values: forgotValues, handleChange: handleChangeForgot, handleSubmit: handleSubmitForgot, errors: forgotErrors, touched: forgotTouched } = useFormik({
      initialValues: initialValuesForgot, // Use initialValuesForgot for the forgot password form
      onSubmit: async (values) => {
        try {
          const res = await forgotPassword({ email: values.email }).unwrap();
          toast.success(res.message);
          setIsForgotModalOpen(false);
        } catch (err) {
          toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        }
      },
    });


  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 navbar shadow-lg ">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2 ml-10 " />
         
        </div>
        {/* Sign Up Link */}
        <p className="text-sm text-white">Don't have an account? <Link to={'/user/register'} className="text-green-500">Sign Up</Link></p>
      </div>
      {/* Main Content Section */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form */}
        <div className="flex-1 flex justify-center cont items-center shadow-lg">
        <div className="w-full max-w-md shadow-lg bg-white p-8 rounded-md">
          <div className="flex justify-center items-center mb-4 ">
             <img src={logo} alt="Logo" className="h-8 " />
          </div>
       
              <h2 className="text-2xl font-bold text-center mb-8 text-green-950">Sign in to your account</h2> 
              <form onSubmit={handleSubmit} className="text-center ">
              <div className="mb-8  input-with-icon"> 
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Email" 
                    className="w-full px-3 py-2 bg-gray-200 rounded-full focus:outline-none shadow-lg" 
                    name="email" 
                    value={values.email} 
                    onChange={handleChange} 
                  />
                  <FaEnvelope className="input-icon mr-4" />
                  {errors.email && touched.email && (
                                    <div className="text-red-500">{errors.email}</div>
                                  )}
                </div>
                <div className="mb-4  items-center input-with-icon"> 
                  <input 
                    type="password" 
                    id="password" 
                    placeholder="Password" 
                    className="w-full px-3 py-2 bg-gray-200 rounded-full focus:outline-none shadow-lg" 
                    name="password" 
                    value={values.password} 
                    onChange={handleChange} 
                  />
                  <FaLock className="input-icon mr-4" />
                  {errors.password && touched.password && (
                                    <div className="text-red-500 ">{errors.password}</div>
                                  )}
                </div>

                <div className="text-right">
                <button type="button" className="text-green-400" onClick={openForgotModal}>Forgot Password?</button>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full items-center signup-button align-middle text-white py-2 px-4 rounded-full mb-8 relative" 
                  style={{ width: '120px', height: '40px', margin: '20px auto', marginRight: '10px' }} 
                >
                  {isLoading ? <Spinner/> : 'Login'}
                </button>

                
                <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12 justify-center">
                
                <GoogleLogin
              onSuccess={async (credentialResponse) => {
                if (credentialResponse && credentialResponse.credential) {
                  const credentialResponseDecoded = jwtDecode(
                    credentialResponse.credential
                  ) as DecodedCredential;

                  const { name, email } = credentialResponseDecoded;

                  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                  let password = '';
                
                  for (let i = 0; i < 6; i++) {
                    const randomIndex = Math.floor(Math.random() * charset.length);
                    password += charset.charAt(randomIndex);
                  }

                  try {
                    const res = await googleAuth({ name, email, password}).unwrap();
                    dispatch(setCredential({ ...res.data }));
                    toast.success(res.message);
                    navigate('/user/home')
                  } catch (err) {
                    toast.error(
                      (err as MyError)?.data?.message ||
                        (err as MyError)?.error
                    );
                  }
                  console.log(credentialResponseDecoded);
                } else {
                  console.log("Credential not found");
                }
              }}
              onError={() => {
                toast.error("Login failed");
              }}
            />
            </div> 
              </form>
            </div>

       

        </div>
        {/* Picture */}
        <div className="hidden lg:block bg-cover bg-center w-1/2 relative" style={{ position: 'relative' }}> {/* Add relative positioning */}
        {/* Apply a semi-transparent overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-6xl font-bold font-montserrat">Unlock Spaces</h1> {/* Adjust font size and style as needed */}
            <h2 className="text-6xl font-bold mb-4 font-roboto">Elevate Experiences</h2> {/* Adjust font size and style as needed */}
          </div>
        </div>
        <img src={signUpImage} alt="Image" className="mb-20 w-full h-full shadow-lg" />
      </div>


      </div>
      <CustomModal
        isOpen={isForgotModalOpen}
        onRequestClose={closeForgotModal}
      >
        {/* Modal body */}
        <div className="modal-content">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 mb-4" />
         
        </div>
        <h1 className="mb-4 text-4xl font-bold">Forgot Password?</h1>
        <p className="text-lg">Please enter your email address below. We will send you a password reset link to your email.</p>
        <form onSubmit={handleSubmitForgot}>
          <div className="form-group mb-4">
            <label className="form-label" htmlFor="email">Email</label>
            <div className="has-icon-left">
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                value={forgotValues.email}
                onChange={handleChangeForgot}
                placeholder="Enter your email"
              />
              <FaEnvelope className="form-icon" />
            </div>
            {forgotErrors.email && forgotTouched.email && <div className="text-red-500">{forgotErrors.email}</div>}
          </div>
          <button type="submit" className="btn btn-submit">Submit</button>
        </form>
      </div>
      </CustomModal>
    </div>

    
  );
}

export default Login;
