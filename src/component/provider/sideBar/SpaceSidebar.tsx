import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SpaceSideBar.css';

const SpaceSidebar: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <div className="h-[500px] p-3 space-y-2 mt-20 w-80 ml-10 dark:bg-customGreen dark:text-white shadow-xl rounded-lg">
      <div className="flex items-center p-2 space-x-4">
        <div>
          <h2 className="text-lg text-bg-gray-50 font-semibold">Manage Spaces</h2>
          <span className="flex items-center space-x-1">
            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">View profile</a>
          </span>
        </div>
      </div>
      <div className="divide-y dark:divide-gray-300">
        <ul className="pt-2 space-y-1 text-sm">
          <li className={`${activeLink === '/provider/addSpace/addLocation' ? 'bg-gray-50 text-customGreen' : 'dark:bg-customGreen dark:text-white'} font-bold shadow-2xl mb-10 rounded-lg`}>
            <Link 
              to="/provider/addSpace/addLocation" 
              onClick={() => handleLinkClick('/provider/addSpace/addLocation')}
              className="flex items-center text-center p-2 space-x-3 rounded-md"
            >
              <span>Add Space</span>
            </Link>
          </li>
        </ul>
        <ul className="pt-4 pb-2 space-y-1 text-sm">
          <li className={`${activeLink === '/provider/addSpace/currentSpaces' ? 'bg-gray-50 text-customGreen' : 'dark:bg-customGreen dark:text-white'} font-bold shadow-2xl rounded-lg`}>
            <Link 
              to="/provider/addSpace/currentSpaces" 
              onClick={() => handleLinkClick('/provider/addSpace/currentSpaces')}
              className="flex items-center text-center p-2 space-x-3 rounded-md"
            >
              <span>Current Spaces</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SpaceSidebar;
