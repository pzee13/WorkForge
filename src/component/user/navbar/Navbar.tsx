import { useState,useEffect } from 'react';
import { RootState } from "../../../app/store"
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../assets/images/Set Space-logo/realLogo/png/logo-no-background.png'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../../slices/userApiSlice';
import { userLogout } from '../../../slices/authSlice';
import ProfileIcon from "../../../assets/images/Set Space-logo/profile3.png"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for the logout modal
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state:RootState) => state.auth);
  const [logOut] = useLogoutMutation();
  let timer: ReturnType<typeof setTimeout>;
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    clearTimeout(timer);
    if (!isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);
  

  const handleLogout = () => {
    setShowDropdown(false); // Close dropdown when logging out
    setShowModal(true);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    clearTimeout(timer)
    if (!showDropdown) {
      timer = setTimeout(() => {
        setShowDropdown(false);
      }, 2500);
    }
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
    <header className="p-4 dark:bg-gray-100 dark:text-gray-800">
      <div className="container flex justify-between h-16 mx-auto">
        {/* Left side logo */}
        <div className="flex items-center flex-shrink-0">
          <img src={logo} alt="Logo" style={{ width: '150px', height: '50px', maxWidth: '100%', maxHeight: 'auto' }} />
        </div>

        

        <button type="button" className="p-4 lg:hidden" onClick={toggleAccordion}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Right side links and login */}
        <div className={`hidden lg:flex items-stretch space-x-3 ${isOpen ? 'flex' : 'hidden'}`}>
        <Link
        to="/user/home"
        className={`flex items-center px-4 -mb-1 border-b-2 ${
          activeLink === '/user/home' ? 'dark:text-customGreen dark:border-customGreen' : 'dark:border-transparent'
        }`}
        onClick={() => handleLinkClick('/user/home')}
      >
        Home
      </Link>
      <Link
        to="/user/spaces"
        className={`flex items-center px-4 -mb-1 border-b-2 ${
          activeLink === '/user/spaces' ? 'dark:text-customGreen dark:border-customGreen' : 'dark:border-transparent'
        }`}
        onClick={() => handleLinkClick('/user/spaces')}
      >
        Workspace
      </Link>
      <Link
        to="/contacts"
        className={`flex items-center px-4 -mb-1 border-b-2 ${
          activeLink === '/contacts' ? 'dark:text-customGreen dark:border-customGreen' : 'dark:border-transparent'
        }`}
        onClick={() => handleLinkClick('/contacts')}
      >
        Contacts
      </Link>
      </div>

        <div className="flex items-center md:space-x-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="submit" title="Search" className="p-1 focus:outline-none focus:ring">
                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-800">
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input type="search" name="Search" placeholder="Search..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50" />
          </div>

          {userInfo ? (
             <button
             onClick={toggleDropdown}
             className="text-white  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
             type="button"
           ><img src={ProfileIcon} alt="" /></button>
           

          ) : (
            <Link to={'/user/login'} className="px-6 py-2 font-semibold rounded dark:bg-customGreen dark:text-gray-50">Login</Link>
          )}

        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden mt-2  bg-customGreen">
          <Link to={'home'} className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Home</Link>
          <Link to={'spaces'} className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Workspace</Link>
          <Link to={'contacts'} className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Contacts</Link>
        </div>
      )}

      {showDropdown && (
  <div
    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-customGreen dark:divide-gray-600 absolute top-14 right-0"
  >
    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div>{userInfo.name}</div>
      <div className="font-medium truncate">{userInfo.email}</div>
    </div>
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
      <li>
        <Link to={'profile'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          Profile
        </Link>
      </li>
      <li>
        <Link to={'bookings'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          My Bookings
        </Link>
      </li>
      <li>
        <Link to={'wallet'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          Wallet
        </Link>
      </li>
    </ul>
    <div className="py-2">
      <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
        Sign out
      </button>
    </div>
  </div>
)}

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="flex flex-col gap-2 p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
                <h2 className="text-xl font-semibold leading-tight tracking-wide">Do you want to Sign Out</h2>
                <p className="flex-1 dark:text-gray-600">Aenean sed adipiscing diam donec adipiscing tristique risus. Donec pretium vulputate sapien nec sagittis aliquam malesuada.
                  <a href="#" rel="noopener noreferrer" className="font-semibold dark:text-violet-600">Learn more</a>
                </p>
                <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
                  <button onClick={() => setShowModal(false)} className="px-6 py-2 rounded-sm">Cancel</button>
                  <button onClick={confirmLogout} className="px-6 py-2 rounded-sm shadow-sm dark:bg-customGreen dark:text-gray-50">Sign Out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;


// {userInfo ? (
//   <button onClick={handleLogout} className="px-6 py-2 font-semibold rounded  dark:text-gray-50"><img src={ProfileIcon} alt="" /></button>
// ) : (
//   <Link to={'/user/login'} className="px-6 py-2 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Login</Link>
// )}