import {  useEffect, useState } from "react";
import { validateEmail } from '../../../utils/validations/emailValidation';
import { validatePassword } from '../../../utils/validations/passwordValidation';
import './SignUp.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleLoginSubmit(e) {
    e.preventDefault();

    // Validation logic here

    // Example validation for email
    if (email.trim() === '') {
      setEmailError('Please enter your email');
      return;
    } else {
      setEmailError('');
    }

    // Example validation for password
    if (password.trim() === '') {
      setPasswordError('Please enter your password');
      return;
    } else {
      setPasswordError('');
    }

    // If all validations pass, you can proceed with login logic
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
      <input type="email" id="email" placeholder="Email" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
      {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
    </div>
    <div className="mb-8"> {/* Increased space */}
      <input type="password" id="password" placeholder="Password" className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
      {passwordError && <p className="text-red-500 mt-1">{passwordError}</p>}
    </div>
    <button type="submit" className="w-full signup-button align-middle text-white py-2 px-4 rounded-full mb-8" style={{ width: '120px', height: '40px', margin: '20px auto', marginLeft: 'auto', marginRight: '10px' }}>Login</button> {/* Decreased width and height */}
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
