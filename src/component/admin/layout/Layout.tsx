import React, { ReactNode } from 'react';
import NavBar from '../navbar/NavBar';
import SideBar from '../sidebar/SideBar';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <NavBar />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
