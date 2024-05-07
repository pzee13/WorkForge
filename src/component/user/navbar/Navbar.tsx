import { useState } from 'react';
import logo from '../../../assets/images/Set Space-logo/default.png'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-4 md:px-20">
      {/* Left side logo */}
      <div className="flex items-center flex-shrink-0">
        <img src={logo} alt="Logo" style={{ width: '150px', height: '50px', maxWidth: '100%', maxHeight: 'auto' }} />
      </div>

     
      <div className="md:hidden">
        <button onClick={toggleAccordion} className="block text-gray-800 hover:text-gray-600 focus:outline-none">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Right side links and login */}
      {isOpen ? (
        <div className="w-full flex-grow md:flex md:items-center md:w-auto">
          <div className="text-sm md:flex-grow">
            <a href="#home" className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-gray-600 mr-4 font-lato">
              Home
            </a>
            <a href="#workspace" className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-gray-600 mr-4 font-lato">
              Workspace
            </a>
            <a href="#contacts" className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-gray-600 mr-4 font-lato">
              Contacts
            </a>
            <Link to={'/user/login'} className="block mt-4 md:inline-block md:mt-0 text-sm text-gray-800 hover:text-gray-600 font-lato">
              Login
            </Link>
          </div>
        </div>
      ) : (
        <div className="hidden md:block">
          <div className="text-sm">
            <a href="#home" className="inline-block text-gray-800 hover:text-gray-600 mr-10 font-lato">
              Home
            </a>
            <a href="#workspace" className="inline-block text-gray-800 hover:text-gray-600 mr-10 font-lato">
              Workspace
            </a>
            <a href="#contacts" className="inline-block text-gray-800 hover:text-gray-600 mr-10 font-lato">
              Contacts
            </a>
            <Link to={'/user/login'} className="inline-block text-sm text-gray-800 hover:text-gray-600 font-lato">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
