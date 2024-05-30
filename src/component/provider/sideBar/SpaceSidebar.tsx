import React from 'react';
import { Link } from 'react-router-dom';
import './SpaceSideBar.css'

const SpaceSidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/provider/addSpace/addLocation" className='text-white'>Add Space</Link>
        </li>
        <li>
          <Link to="/provider/currentSpaces" className='text-white'>Current Spaces</Link>
        </li>
      </ul>
    </div>
  );
};

export default SpaceSidebar;