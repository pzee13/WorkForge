// src/components/Navbar.tsx
import React from 'react';

const NavBar: React.FC = () => {
  return (
    <div className="bg-white h-16 shadow-md flex justify-between items-center px-4 rounded-b-lg">
      {/* Navbar logo */}
      <h1 className="text-xl font-semibold">My Admin</h1>
      {/* Navbar links or actions */}
      <ul className="flex space-x-4">
        <li>
          <a href="#" className="text-gray-600 hover:text-black transition duration-300">Home</a>
        </li>
        <li>
          <a href="#" className="text-gray-600 hover:text-black transition duration-300">About</a>
        </li>
        <li>
          <a href="#" className="text-gray-600 hover:text-black transition duration-300">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
