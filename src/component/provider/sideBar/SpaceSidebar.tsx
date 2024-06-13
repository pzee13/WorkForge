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
       
        <div>
            <h2 className="text-lg font-semibold">Manage Spaces</h2>
            <span className="flex items-center space-x-1">
                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">View profile</a>
            </span>
        </div>
    </div>
    <div className="divide-y dark:divide-gray-300">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="dark:bg-black dark:text-white">
                <Link  to="/provider/addSpace/addLocation"  className="flex items-center text-center p-2 space-x-3 rounded-md">
                   
                    <span>Add Space</span>
                </Link>
            </li>
            <li className="dark:bg-black dark:text-white">
                <Link to="/provider/currentSpaces"  className="flex items-center text-center p-2 space-x-3 rounded-md">
                    
                    <span>Current Spaces</span>
                </Link>
            </li>
           
        </ul>
        <ul className="pt-4 pb-2 space-y-1 text-sm">
            
        </ul>
    </div>
</div>
  );
};

export default SpaceSidebar;