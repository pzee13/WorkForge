import React, { useState } from 'react';
import LoginPic from '../../../assets/images/loginFormPic.jpg';
import './Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleLoginSubmit(e) {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    } else {
      setPasswordError('');
    }

    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div className=" flex items-center justify-between p-4 shadow-lg bg-gray-50">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="h-8 mr-2" />
          <h1 className="text-xl font-bold">YourApp</h1>
        </div>
        {/* Signup Link */}
        <p className="text-sm">Don't have an account? <a href="/provider/register" className="text-blue-500">Sign up</a></p>
      </div>
      {/* Main Content Section */}
      <div className="flex-1 flex">
        {/* Picture */}
        <div className="bg-cover bg-center w-1/2" style={{ backgroundImage: `url(${LoginPic})` }}></div>
        {/* Form */}
        <div className="flex-1 flex justify-center items-center ">
          <div className="w-full max-w-md shadow-md p-8 rounded-md">
            <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Username</label>
                <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <p className="text-red-500 mt-1">{passwordError}</p>}
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
