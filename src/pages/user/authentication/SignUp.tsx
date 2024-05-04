import { useState } from 'react';
import './SignUp.css'
import { validateEmail } from '../../../utils/validations/emailValidation';
import { validateName } from '../../../utils/validations/nameValidation';
import { validatePhone } from '../../../utils/validations/mobileValidation';
import { validatePassword } from '../../../utils/validations/passwordValidation';
import { CustomModal } from '../../../component/common/Modal/CustomModal';
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input'
 
function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [otp, setOtp] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  function validate(field: string, value: string) {
        if (field === "name") {
            
            
            if(!validateName(value)){
              setNameError("Name is invalid");
            }else{
              setNameError("");
            }
            setName(value);
        }

        if (field === "email") {
              if(!validateEmail(value)){
                setEmailError("Email is invalid");
              }else{
                setEmailError("");
              }
              setEmail(value);
          }
          
        if (field === "phone") {
            if(!validatePhone(value)){
              setMobileError("Phone number is invalid");
            }else{
              setMobileError("");
            }
            setMobile(value);
        }
        if (field === "password") {
            if(!validatePassword(value)){
              setPasswordError("Password is invalid");
            }else{
              setPasswordError("");
            }
            setPassword(value);
        }
        if (field === "confirmPassword") {
            if(value !== password){
              setConfirmPasswordError("Password doesn't match");
            }else{
              setConfirmPasswordError("");
            }
            setConfirmPassword(value);
        }
    }


    function handleSignupSubmit() {
      if(!name ||!email || !mobile || !password){
        setConfirmPasswordError("Please fill all the fields");
    }else{
      setConfirmPasswordError("");
        alert("api called.....");
        setIsModalOpen(true);
    }
  }

  function handleOTPVerification(){
    navigate("/user/login");
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 shadow-lg bg-gray-50">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="h-8 mr-2" />
          <h1 className="text-xl font-bold">YourApp</h1>
        </div>
        {/* Login Link */}
        <p className="text-sm">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
      </div>
      {/* Main Content Section */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form */}
        <div className="flex-1 flex justify-center items-center ">
          <div className="w-full max-w-md shadow-md p-8 rounded-md">
            <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
            <form >
              <div className="mb-4">
                <input type="text" id="name" placeholder="Name" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={name} onChange={(e) => validate("name",e.target.value)} />
                {nameError && <p className="text-red-500 mt-1">{nameError}</p>}
              </div>
              <div className="mb-4">
                <input type="email" id="email" placeholder="Email" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={email} onChange={(e) => validate("email",e.target.value)} />
                {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
              </div>
              <div className="mb-4">
                <input type="tel" id="mobile" placeholder="Mobile Number" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={mobile} onChange={(e) => validate("phone",e.target.value)} />
                {mobileError && <p className="text-red-500 mt-1">{mobileError}</p>}
              </div>
              <div className="mb-4">
                <input type="password" id="password" placeholder="Password" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={password} onChange={(e) => validate("password",e.target.value)} />
                {passwordError && <p className="text-red-500 mt-1">{passwordError}</p>}
              </div>
              <div className="mb-8">
                <input type="password" id="confirmPassword" placeholder="Confirm Password" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={confirmPassword} onChange={(e) => validate("confirmPassword",e.target.value)} />
                {confirmPasswordError && <p className="text-red-500 mt-1">{confirmPasswordError}</p>}
              </div>
              <button type="submit" className="w-full signup-button  text-white py-2 px-4 rounded-full " onClick={handleSignupSubmit}>Sign Up</button>
            </form>
          </div>
        </div>
        {/* Picture */}
        <div className="hidden lg:block bg-cover bg-center w-1/2">
          <img src="/path/to/image.jpg" alt="Image" className="w-full h-full object-cover" />
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
                        numInputs={4}
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
