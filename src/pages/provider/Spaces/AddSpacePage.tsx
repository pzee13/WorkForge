// src/pages/provider/Spaces/AddSpacePage.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SpaceSidebar from '../../../component/provider/sideBar/SpaceSidebar';
import Navbar from '../../../component/provider/navbar/Navbar';
import Footer from '../../../component/provider/footer/Footer';
import './AddSpacePage.css';

const AddSpacePage: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="page-layout">
                <SpaceSidebar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddSpacePage;
