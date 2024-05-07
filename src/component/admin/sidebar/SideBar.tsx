import React from 'react';

const SideBar: React.FC = () => {
  return (
    <div className="bg-black h-screen w-64 flex flex-col justify-between rounded-lg shadow-lg  from-black to-transparent">
      <div>
        {/* Sidebar logo or title */}
        <h1 className="text-white text-xl font-semibold p-4">Admin Panel</h1>
        {/* Sidebar links */}
        <ul className="space-y-4 mt-4">
          <li>
            <a href="#" className="block text-white px-4 py-2 transition duration-300 hover:bg-gray-300 hover:text-black rounded-md font-medium">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block text-white px-4 py-2 transition duration-300 hover:bg-gray-300 hover:text-black rounded-md font-medium">Users</a>
          </li>
          <li>
            <a href="#" className="block text-white px-4 py-2 transition duration-300 hover:bg-gray-300 hover:text-black rounded-md font-medium">Settings</a>
          </li>
        </ul>
      </div>
      {/* Sidebar footer */}
      <div className="text-white text-xs text-center pb-4">© 2024 My Admin</div>
    </div>
  );
};

export default SideBar;
