import React from 'react';
import { Outlet } from 'react-router-dom';
import SpaceSidebar from '../../../component/provider/sideBar/SpaceSidebar';
import Navbar from '../../../component/provider/navbar/Navbar';
import Footer from '../../../component/provider/footer/Footer';

const AddSpacePage: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row h-[calc(100vh)]">
                <SpaceSidebar />
                <div className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddSpacePage;
