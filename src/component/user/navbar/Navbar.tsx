import { useState } from 'react';
import { RootState } from "../../../app/store"
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../assets/images/Set Space-logo/realLogo/png/logo-no-background.png'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../../slices/userApiSlice';
import { userLogout } from '../../../slices/authSlice';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for the logout modal
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state:RootState) => state.auth);
  const [logOut] = useLogoutMutation();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = async () => {
    try {
      setShowModal(false);
      navigate('/user/');
      dispatch(userLogout());
      await logOut('').unwrap();
    } catch (error) {
      console.error(error);
    }
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
        {userInfo ? (
          <div className="text-sm md:flex-grow">
            <a href="#home" className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-gray-600 mr-4 font-lato">
              Home
            </a>
            <Link to={'/user/spaces'} className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-gray-600 mr-4 font-lato">
              Workspace
            </Link>
            <a href="#contacts" className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-gray-600 mr-4 font-lato">
              Contacts
            </a>
            <button onClick={handleLogout} className="inline-block text-sm text-gray-800 hover:text-gray-600 font-lato">
              Logout
            </button>
          </div>
          ) : (
            <div className="text-sm md:flex-grow">
            <a href="#" className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-gray-600 mr-4 font-lato">
              Home
            </a>
            <a href="#" className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-gray-600 mr-4 font-lato">
              Workspace
            </a>
            <a href="#" className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-gray-600 mr-4 font-lato">
              Contacts
            </a>
            <Link to={'/user/login'} className="block mt-4 md:inline-block md:mt-0 text-sm text-gray-800 hover:text-gray-600 font-lato">
              Login
            </Link>
          </div>
          )}
        </div>
      ) : (
        <div className="hidden md:block">
          {userInfo ? (
          <div className="text-sm">
            <a href="#home" className="inline-block text-gray-800 hover:text-gray-600 mr-10 font-lato">
              Home
            </a>
            <Link to={'/user/spaces'}  className="inline-block text-gray-800 hover:text-gray-600 mr-10 font-lato">
              Workspace
            </Link>
            <a href="#contacts" className="inline-block text-gray-800 hover:text-gray-600 mr-10 font-lato">
              Contacts
            </a>
            <button onClick={handleLogout} className="inline-block text-sm text-gray-800 hover:text-gray-600 font-lato">
              Logout
            </button>

          </div>
           ) : (
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
           )}
        </div>
      )}

{showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Are you sure you want to logout?</h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={confirmLogout} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#49735A] text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Logout
                </button>
                <button onClick={() => setShowModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
