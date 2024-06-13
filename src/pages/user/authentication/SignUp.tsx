import { useState,useEffect } from 'react';
import './SignUp.css'
import { useFormik } from "formik";
import { setRegister,clearRegister } from '../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {useRegisterMutation,
  useOtpVerificationMutation,
  useSendOtpToEmailMutation,} from '../../../slices/userApiSlice';
import { MyError,FormValues,OtpResponse } from '../../../utils/validations/commonVaild';
import { validationSchema } from '../../../utils/validations/yupValidation'
import { CustomModal } from '../../../component/common/Modal/CustomModal';
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../../../app/store'
import OtpInput from 'react-otp-input'
import signUpImage from '../../../assets/images/userLogin/fotor-ai-20240516113630.jpg'
import logo from '../../../assets/images/Set Space-logo/realLogo/png/logo-no-background.png'
import Spinner from '../../../component/user/Loader/Spinner'

function SignUp() {



  const [otp, setOtp] = useState("");
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [timer, setTimer] = useState(60); // 60 seconds
  const [resendDisabled, setResendDisabled] = useState(false); // Control resend button state
  const [otpError, setOtpError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendOtpToEmail] = useSendOtpToEmailMutation();
  const {registerInfo} = useSelector((state :RootState)=>state.auth);
  const [otpVerification] = useOtpVerificationMutation()
  const [registration] = useRegisterMutation()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && resendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendDisabled(false); // Enable resend button when timer expires
    }

    return () => clearInterval(interval);
  }, [timer, resendDisabled]);

  const startTimer = () => {
    setResendDisabled(true); // Disable resend button
    setTimer(60); // Reset timer
  };

  const initialValues : FormValues= {
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    
  };



  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues:initialValues,
    validationSchema:validationSchema,
    onSubmit: async (values) =>{
       dispatch(setRegister({...values}));
       
        try {
          setIsLoading(true);
          const { name, email } = values;
              const response:OtpResponse = await sendOtpToEmail({ name ,email});
              startTimer();
              console.log(response)
              setIsModalOpen(true);
      } catch (error) {
        setIsModalOpen(false);
        dispatch(clearRegister());
        toast.error((error as MyError)?.data?.message || (error as MyError)?.error );
      }finally {
        setIsLoading(false); 
      }
    }
  });

  const clearOtpError = () => {
    setTimeout(() => {
      setOtpError("");
    }, 3000);
  };


  async function handleOTPVerification(){
    try {
      
      const {email}:any = registerInfo;
      const res:any = await otpVerification({otp,email});
      if(res.data.success){
            const {name,email,mobile,password,confirmPassword}:any = registerInfo;
            const registrationRes:any = await registration({name,email,mobile,password,confirmPassword});
            if(registrationRes.data.success){
              setIsModalOpen(false);
              toast.success(registrationRes.data.message)
             navigate('/login');
            }else{
              console.log("hai")
              setOtpError('Invalid OTP');
              toast.error('invalid otp');
            }
         }else{
          console.log('otp verification failed');
          setOtpError('OTP verification failed');
          toast.error('otp verification failed');
          clearOtpError();
         }
    } catch (error) {
      // setIsModalOpen(false);
      setOtpError('Invalid OTP verification failed');
      toast.error((error as MyError)?.data?.message || (error as MyError)?.error );
      clearOtpError();
    }
}

async function handleResendOTP() {
  try {
    const { name, email } = values; // Assuming values are accessible here
    await sendOtpToEmail({ name, email });
    startTimer(); // Start timer when OTP is resen
  } catch (error) {
    toast.error((error as MyError)?.data?.message || (error as MyError)?.error);
  }
}
  

  return (
    <div className="flex flex-col h-screen overflow-hidden">
    
      <div className="flex items-center justify-between navbar p-4 shadow-lg bg-">
  
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2 ml-10" />
          
        </div>
       
        <p className="text-sm text-white">Already have an account? <Link to={'/login'} className='text-green-400'>Login</Link></p>
      </div>
   
      <div className="flex-1 flex cont overflow-hidden">
  
        <div className="flex-1 flex justify-center  items-center dark-green-border">
        <div
    className="absolute inset-0 bg-cover bg-center w-full h-full  z-0"
    style={{ backgroundImage: `url(${signUpImage})`,
    transform: "scaleX(-1)", }}
  >

<div className="absolute inset-0 bg-black opacity-50"></div>
  </div>
          
  <div className="w-full max-w-md shadow-lg bg-white p-8 rounded-md z-10">
    <div className="flex justify-center items-center mb-4 ">
      <img src={logo} alt="Logo" className="h-8 " />
    </div>
    <h2 className="text-2xl font-bold text-center mb-8 text-green-950">
      Create your Account
    </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input type="text" id="name" placeholder="Name" className="w-full shadow-lg px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={values.name} onChange={handleChange} />
                {errors.name && touched.name && (
                      <div className="text-red-500 text-sm">{errors.name}</div>
                    )}
              </div>
              <div className="mb-4">
                <input type="email" id="email" placeholder="Email" className="w-full shadow-lg px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={values.email} onChange={handleChange} />
                {errors.email && touched.email && (
                      <div className="text-red-500 text-sm">{errors.email}</div>
                    )}
              </div>
              <div className="mb-4">
                <input type="tel" id="mobile" placeholder="Mobile Number" className="w-full shadow-lg px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={values.mobile} onChange={handleChange} />
                {errors.mobile && touched.mobile && (
                      <div className="text-red-500 text-sm">{errors.mobile}</div>
                    )}
              </div>
              <div className="mb-4">
                <input type="password" id="password" placeholder="Password" className="w-full shadow-lg px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={values.password} onChange={handleChange} />
                {errors.password && touched.password && (
                      <div className="text-red-500 text-sm">{errors.password}</div>
                    )}
              </div>
              <div className="mb-8">
                <input type="password" id="confirmPassword" placeholder="Confirm Password" className="w-full shadow-lg px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={values.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && touched.confirmPassword && (
                      <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
                    )}
              </div>
              <button type="submit" className="w-full signup-button shadow-lg text-white py-2 px-4 rounded-full " >Sign Up</button>
              {isLoading ? <Spinner /> : null}
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
      <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col items-center mt-10 px-6 gap-10">
                    <h2 className="font-gillroy text-2xl font-semibold md:text-3xl">SetSpace OTP Verification</h2>
                    <p className="text-lg">Please enter the OTP (one time password) send to your registered phone number to complete the verification.</p>
                    <div className="h-[50px] w-full flex items-center justify-center">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} 
                        style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "5px",
                            border: "1px solid #49735A",
                            fontSize: "20px",
                            fontWeight: "bold",
                            textAlign: "center",
                            marginRight: "10px",
                            marginLeft: "10px",
                            outline: "none",
                        }}/>}
                    />
                    </div>
                    {otpError && <div className="text-red-500">{otpError}</div>}
                    <div className="flex justify-between w-full">
  <p>Remaining Time: {timer} sec</p>
  <button
    className="text-green-900" 
    onClick={handleResendOTP} 
    disabled={resendDisabled}
  >
    Resend OTP
  </button>
</div>
                    <div className="flex justify-between w-full gap-4">
                        <button 
                            className="w-1/2 px-5 py-3 rounded-md bg-[#49735A] text-white font-semibold hover:bg-[#dbdbdb]"
                            onClick={handleOTPVerification}
                        >
                        Verify
                        </button>
                        <button 
                            className="w-1/2 border-[#49735A] border-[1px] rounded-md"
                             onClick={() => setIsModalOpen(false)}
                        >
                        Cancel
                        </button>
                    </div>
                </div>
            </CustomModal>
    </div>
  );
}

export default SignUp;
