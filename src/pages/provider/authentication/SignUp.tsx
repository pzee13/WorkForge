import { useState } from 'react';
import './SignUp.css'
import { useFormik } from "formik";
import { setRegister,clearRegister } from '../../../slices/authSlice';
import { useProviderRegisterMutation,
  useSendOtpToProviderEmailMutation,
  useProviderOtpVerificationMutation } from '../../../slices/providerApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MyError,FormValues,OtpResponse } from '../../../utils/validations/commonVaild';
import { validationSchema } from '../../../utils/validations/yupValidation'
import { CustomModal } from '../../../component/common/Modal/CustomModal';
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../../../app/store'
import OtpInput from 'react-otp-input'
import logo from '../../../assets/images/Set Space-logo/default.png'
import signUpImage from '../../../assets/images/Signup-user/coworking-sighnup.jpg'

 
function SignUp() {

  const [otp, setOtp] = useState("");
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendOtpToEmail] = useSendOtpToProviderEmailMutation();
  const {registerInfo} = useSelector((state :RootState)=>state.auth);
  const [otpVerification] = useProviderOtpVerificationMutation()
  const [registration] = useProviderRegisterMutation()

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
          const { name, email } = values;
              const response:OtpResponse = await sendOtpToEmail({ name ,email});
              console.log(response)
              setIsModalOpen(true);
      } catch (error) {
        setIsModalOpen(false);
        dispatch(clearRegister());
        toast.error((error as MyError)?.data?.message || (error as MyError)?.error );
      }
    }
  });

  
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
             navigate('/provider/login');
            }else{
              console.log("hai")
              toast.error('invalid otp');
            }
         }else{
          console.log('otp verification failed');
          toast.error('otp verification failed');
         }
    } catch (error) {
      setIsModalOpen(false);
      toast.error((error as MyError)?.data?.message || (error as MyError)?.error );
    }
}

 
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 shadow-lg bg-gray-50">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <h1 className="text-xl font-bold">YourApp</h1>
        </div>
        {/* Login Link */}
        <p className="text-sm">Already have an account? <Link to='/provider/login' className="text-blue-500">Login</Link></p>
      </div>
      {/* Main Content Section */}
      <div className="flex-1 flex overflow-hidden">
        {/* Picture */}
        <div className="bg-cover bg-center w-1/2">
        <img src={signUpImage} alt="Image" className="w-full h-full object-cover" />
        </div>
        {/* Form */}
        <div className="flex-1 flex justify-center items-center ">
          <div className="w-full max-w-md shadow-md p-8 rounded-md">
            <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input type="text" id="name" placeholder="Name" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={values.name} onChange={handleChange} />
                {errors.name && touched.name && (
                      <div className="text-red-500 text-sm">{errors.name}</div>
                    )}
              </div>
              <div className="mb-4">
                <input type="email" id="email" placeholder="Email" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={values.email} onChange={handleChange}  />
                {errors.email && touched.email && (
                      <div className="text-red-500 text-sm">{errors.email}</div>
                    )}
              </div>
              <div className="mb-4">
                <input type="tel" id="mobile" placeholder="Mobile Number" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={values.mobile} onChange={handleChange} />
                {errors.mobile && touched.mobile && (
                      <div className="text-red-500 text-sm">{errors.mobile}</div>
                    )}
              </div>
              <div className="mb-4">
                <input type="password" id="password" placeholder="Password" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={values.password} onChange={handleChange} />
                {errors.password && touched.password && (
                      <div className="text-red-500 text-sm">{errors.password}</div>
                    )}
              </div>
              <div className="mb-8">
                <input type="password" id="confirmPassword" placeholder="Confirm Password" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={values.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && touched.confirmPassword && (
                      <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
                    )}
              </div>
              <button type="submit" className="w-full signup-button  text-white py-2 px-4 rounded-full " >Sign Up</button>
            </form>
          </div>
        </div>
      </div>
      <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col items-center mt-10 px-6 gap-10">
                    <h2 className="font-gillroy text-2xl font-semibold md:text-3xl">Matrify OTP Verification</h2>
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
                    <div className="flex justify-between w-full">
                        <p>Remaining Time: 01:00</p>
                        <a href="#" className="text-green-900">Resend OTP?</a>
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
