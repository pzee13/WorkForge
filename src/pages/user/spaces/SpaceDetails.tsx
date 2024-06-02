// src/pages/user/Spaces/SpaceDetails.tsx
import React from 'react';
import { useLocation } from "react-router-dom";
import Navbar from "../../../component/user/navbar/Navbar";
import Footer from "../../../component/user/Footer/Footer";
import SpaceDetailsMap from "../../../component/common/Spaces/SpaceDetailsMap";
import ImageContainer from '../../../component/common/ImageContainer';

const SpaceDetails = () => {
    const location = useLocation();
    const { data } = location.state;

    return (
        <>
            <Navbar />
            
                    <div className="bg-accent">
                        <ImageContainer images={data.images} />
                    </div>
                    <div className="flex justify-center dark:bg-gray-100">
                <div className="w-10/12 shadow-lg">
                    <div className="flex justify-between items-center px-4 py-2">
                        <div>
                            <h2 className="text-5xl text-customGreen font-bold mb-4">{data.spaceName}</h2>
                            <h3 className=" text-secondGreen font-bold"><span className="dark:text-gray-800 font-bold">Type: </span>{data.spaceType}</h3>
                        </div>
                        <div className="flex items-center dark:text-gray-800  font-bold">
                            <span className="dark:text-gray-800 font-semibold">Price Per Hour  : </span>
                            <span className="text-3xl text-customGreen font-semibold mr-1"> &#8377;</span>
                            <span className="text-3xl text-customGreen font-extrabold">{  data.chargePerHour}</span>
                        </div>
                    </div>
                    <div>
                        <SpaceDetailsMap
                            spaceName={data.spaceName}
                            availableSpaces={data.availableSpaces}
                            areaName={data.areaName}
                            district={data.district}
                            state={data.state}
                            country={data.country}
                            buildingName={data.buildingName}
                            floor={data.floor}
                            latitude={data.latitude}
                            longitude={data.longitude}
                        />
                    </div>
                    <div>
                    <section className="m-4 md:m-8 dark:bg-gray-100 dark:text-gray-800">
                        <div className="container p-4 mx-auto my-6 space-y-1 text-center">
                            <span className="text-xs font-semibold tracking-wider uppercase dark:text-secondGreen">Want to know more</span>
                            <h2 className="pb-3 text-3xl font-bold md:text-4xl text-customGreen">Description</h2>
                            <p>{data.description}</p>
                        </div>
                    </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SpaceDetails;
