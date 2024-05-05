import {  useEffect, useState } from "react";
import { validateEmail } from '../../../utils/validations/emailValidation';
import { validatePassword } from '../../../utils/validations/passwordValidation';
import { validationSchema } from "../../../utils/validations/yupvalidation";
import './SignUp.css';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Login() {
  const [data, setData] = useState('');
  const [password, setPassword] = useState('');
  const [dataError, setDataError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDataError("");
      setPasswordError("");
    }, 5000); // Clear errors after 5 seconds

    // Cleanup function to clear timeout on unmount
    return () => clearTimeout(timeoutId);
  }, [dataError, passwordError]);

  function validate(field: string, value: string) {
    if (field === "data") {
        if (value.trim() === "") {
            setDataError("This field is required");
        } else if (validateEmail(value)) {
            
            setDataError("");
        } else {
            setDataError("Invalid email or phone number");
            
        }
        setData(value);
    } else if (field === "password") {
        if (!validatePassword(value)) {
            setPasswordError("Password must be at least 6 characters long");
        } else {
          setPasswordError("");
        }
        setPassword(value);
    }
  }

  function handleLoginSubmit() {
    if (!data) {
      setDataError("Invalid email or phone number");
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      alert("Login successful!"); // api of successful login
    }
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
        {/* Sign Up Link */}
        <p className="text-sm">Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
      </div>
      {/* Main Content Section */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form */}
        <div className="flex-1 flex justify-center items-center ">
        <div className="w-full max-w-md shadow-md p-8 rounded-md">
  <h2 className="text-3xl font-bold text-center mb-8">Login</h2> {/* Increased space */}
  <form onSubmit={handleLoginSubmit}>
    <div className="mb-8"> {/* Increased space */}
      <input type="email" id="email" placeholder="Email" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={data}
                                onChange={(e) => validate("data", e.target.value)} />
      {dataError && <p className="text-red-500 mt-1">{dataError}</p>}
    </div>
    <div className="mb-8"> {/* Increased space */}
      <input type="password" id="password" placeholder="Password" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none"  value={password}
                                onChange={(e) => validate("password", e.target.value)} />
      {passwordError && <p className="text-red-500 mt-1">{passwordError}</p>}
    </div>
    <button type="submit" className="w-full signup-button align-middle text-white py-2 px-4 rounded-full mb-8" style={{ width: '120px', height: '40px', margin: '20px auto', marginLeft: 'auto', marginRight: '10px' }} >Login</button> {/* Decreased width and height */}
  </form>
</div>

        </div>
        {/* Picture */}
        <div className="hidden lg:block bg-cover bg-center w-1/2">
          <img src="/path/to/image.jpg" alt="Image" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Login;
