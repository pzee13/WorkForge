import React from 'react';
import { Link } from 'react-router-dom';
import './SpaceSideBar.css'

const SpaceSidebar: React.FC = () => {
  return (
    // <div className="sidebar flex justify-center h-96 ">
    //   <ul>
    //     <li>
    //       <Link to="/provider/addSpace/addLocation" className='text-white'>Add Space</Link>
    //     </li>
    //     <li>
    //       <Link to="/provider/currentSpaces" className='text-white'>Current Spaces</Link>
    //     </li>
    //   </ul>
    // </div>

    <div className="h-96 p-3 space-y-2 mt-20 w-60 ml-20 bg-customGreen dark:text-white">
    <div className=" flex items-center p-2 space-x-4">
        <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
        <div>
            <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
            <span className="flex items-center space-x-1">
                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">View profile</a>
            </span>
        </div>
    </div>
    <div className="divide-y dark:divide-gray-300">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="dark:bg-gray-100 dark:text-white">
                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-white">
                      
                    </svg>
                    <span>Dashboard</span>
                </a>
            </li>
           
        </ul>
        <ul className="pt-4 pb-2 space-y-1 text-sm">
            
        </ul>
    </div>
</div>
  );
};

export default SpaceSidebar;