
import React from 'react';
import image from '../../../assets/images/space/space-banner.png'

const DefaultContent: React.FC = () => {
    return (
        <div className="flex flex-col  items-center justify-center h-full">
        <img src={image} alt="Default" className="mb-4 w-1/2 h-auto" />
        <h2 className="text-4xl font-semibold text-center ml-6 text-customGreen">Add and Manage your Spaces</h2>
    </div>
    );
};

export default DefaultContent;
