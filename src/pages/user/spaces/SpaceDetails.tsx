// src/pages/user/Spaces/SpaceDetails.tsx
import React from 'react';
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../../../component/user/navbar/Navbar";
import Footer from "../../../component/user/Footer/Footer";
import SpaceDetailsMap from "../../../component/common/Spaces/SpaceDetailsMap";
import ImageContainer from '../../../component/common/ImageContainer';

const SpaceDetails = () => {
    const location = useLocation();
   
    const { data } = location.state;

    const { register, handleSubmit, watch } = useForm();

    const onSubmit = (formData) => {
        console.log(formData);
    }; 

    const moveInTime = watch("moveInTime", "09:00");
    const moveOutTime = watch("moveOutTime", "18:00");

    // Function to calculate total cost
    const calculateTotal = (moveIn, moveOut) => {
        const moveInHour = parseInt(moveIn, 10);
        const moveOutHour = parseInt(moveOut, 10);
        const hours = moveOutHour - moveInHour;
        return hours > 0 ? hours * data.chargePerHour : 0;
    };

    const totalCost = calculateTotal(moveInTime, moveOutTime);

    // Generate hour options from 09:00 to 18:00
    const hourOptions = [];
    for (let i = 9; i <= 18; i++) {
        hourOptions.push(`${i}:00`);
    }

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <>
            <Navbar />
            <div className="bg-gray-50">
                <ImageContainer images={data.images} />
            </div>
            <div className="flex justify-center dark:bg-gray-50">
                <div className="w-10/12 shadow-lg">
                    <div className="flex justify-between r px-4 py-2">
                        <div>
                            <h2 className="text-5xl text-customGreen font-bold mb-4">{data.spaceName}</h2>
                            <h3 className=" text-secondGreen font-bold"><span className="dark:text-gray-800 font-bold">Type: </span>{data.spaceType}</h3>
                            <h3 className=" text-secondGreen font-bold"><span className="dark:text-gray-800 font-bold">Contact No: </span>{data.contactNumber}</h3>
                        </div>
                        
                        <div className="flex flex-col max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 dark:divide-gray-300 dark:bg-customGreen dark:text-white">
                            <h2 className="text-2xl font-semibold">Booking Details</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="pt-4 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="bookingDate">Select Date</label>
                                        <input 
                                            type="date" 
                                            id="bookingDate" 
                                            {...register("bookingDate")} 
                                            className="border rounded text-customGreen"
                                            min={minDate}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="moveInTime">Move In Time</label>
                                        <select 
                                            id="moveInTime" 
                                            {...register("moveInTime")} 
                                            defaultValue="09:00" 
                                            className="border rounded text-customGreen"
                                            required
                                        >
                                            {hourOptions.slice(0, -1).map((time, index) => (
                                                <option key={index} value={time.split(':')[0]}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="moveOutTime">Move Out Time</label>
                                        <select 
                                            id="moveOutTime" 
                                            {...register("moveOutTime")} 
                                            defaultValue="18:00" 
                                            className="border rounded text-customGreen"
                                            required
                                        >
                                            {hourOptions.slice(1).map((time, index) => (
                                                <option key={index} value={time.split(':')[0]}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Charge Per Hour</span>
                                        <span>₹ {data.chargePerHour}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Available Spaces</span>
                                        <span>{data.availableSpaces}</span>
                                    </div>
                                </div>
                                <div className="pt-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>₹{totalCost}</span>
                                    </div>
                                </div>
                                <div className="pt-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span>Total</span>
                                        <span className="font-semibold">₹ {totalCost}</span>
                                    </div>
                                    <button type="submit" className="w-full py-2 font-semibold border rounded dark:bg-accent dark:text-customGreen dark:border-green-600">Proceed to Checkout</button>
                                </div>
                            </form>
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
