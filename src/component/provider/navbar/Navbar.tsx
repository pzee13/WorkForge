import { useState, useEffect } from 'react';
import logo from '../../../assets/images/Set Space-logo/default.png';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <a href="#">Login</a>
      </div>
    </nav>
  );
}

export default Navbar;
