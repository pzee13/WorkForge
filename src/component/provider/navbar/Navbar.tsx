import { useState, useEffect } from 'react';
import logo from '../../../assets/images/Set Space-logo/default.png';
import { RootState } from "../../../app/store"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useProviderLogoutMutation } from '../../../slices/providerApiSlice';
import { providerLogout } from '../../../slices/authSlice';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {providerInfo} = useSelector((state:RootState) => state.auth);
  const [logOut] = useProviderLogoutMutation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = async () => {
    try {
      setShowModal(false);
      navigate('/provider');
      dispatch(providerLogout());
      await logOut('').unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav
      className={`fixed bg-gray-100 top-0 left-0 right-0 z-50 flex justify-center items-center p-2 md:p-4 ${
        isScrolled ? 'bg-white shadow-lg' : ''
      } ${isScrolled ? '' : 'md:ml-10 md:mr-10'} ${isScrolled ? '' : 'mt-4'} ${isScrolled ? '' : 'rounded-full'}`}
    >
        
            
      <div className="flex items-center justify-center">
        <a href="#" className="mr-6 md:mr-20">
          Home
        </a>
        <a href="#" className="mr-6 md:mr-20">About</a>
      </div>
      <div className="flex justify-center items-center">
        <img src={logo} alt="Logo" className="max-w-12 mr-6 md:mr-20" />
      </div>
      <div className="flex items-center justify-center">
        <a href="#" className="mr-6 md:mr-20">
          Spaces
        </a>
        {providerInfo?(
           <button onClick={handleLogout}>Logout</button>
         ):(
            <Link to="/provider/login">Login</Link>
            )}
      </div>
     
       
        



        
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
