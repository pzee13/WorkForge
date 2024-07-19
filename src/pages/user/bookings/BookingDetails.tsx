import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBookingsMutation , useGetSpaceUserMutation,useCancelBookingMutation } from '../../../slices/userApiSlice';
import { WorkSpace } from "../../../types/spaces/space"
import SpaceMap from "../../../component/common/spaces/SpaceMap"
import Navbar from "../../../component/user/navbar/Navbar";
import Footer from "../../../component/user/footer/Footer";
// import {motion } from "framer-motion"

interface Booking {
    _id: string;
    spaceId: string;
    providerId: string;
    userId: string;
    spaceName: string;
    bookingDate: Date;
    paidDate: Date;
    moveInTime: string;
    moveOutTime: string;
    chargePerHour: number;
    noOfSpaces: number;
    totalPrice: number;
    totalPaid: number;
    paymentId: string;
    isPaid: boolean;
}

const BookingDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [getBooking] = useGetBookingsMutation();
    const [getSpaceUser] = useGetSpaceUserMutation();
    const [cancelBooking] = useCancelBookingMutation();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [space, setSpace] = useState<WorkSpace | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await getBooking(id).unwrap();
                setBooking(response.data[0]);
                console.log("bookingdetaisl",response.data[0])
                const spaceResponse = await getSpaceUser('').unwrap();
                console.log(spaceResponse)
                const matchedSpace = spaceResponse.data.find((space: WorkSpace) => space._id === response.data[0].spaceId);
                if (matchedSpace) {
                    setSpace(matchedSpace);
                } else {
                    setError('Space corresponding to booking not found');
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch booking or space details');
                setLoading(false);
            }
        };

        fetchBooking();
    }, [getBooking, getSpaceUser, id]);

    const formattedBookingDate = booking ? new Date(booking.bookingDate).toLocaleDateString() : '';

    const handleCancelBooking = async () => {
        try {
            // Perform backend validation if cancellation is allowed
            const today = new Date();
            if (booking && booking.bookingDate > today) {
                const cancelResponse = await cancelBooking({ bookingId: booking._id }).unwrap();
                // Assuming cancelBooking mutation returns updated booking or success message
                console.log('Booking canceled successfully', cancelResponse);
                // Update local state or notify user
            } else {
                // Handle case where cancellation is not allowed
                setError('Booking cannot be canceled as the date has passed.');
            }
        } catch (err) {
            setError('Failed to cancel booking');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!booking || !space) {
        return <div>No booking or space details found</div>;
    }

    return (
       
        <div>
            <Navbar />
            <section className="dark:bg-gray-50 pt-10 dark:text-gray-800">
	<div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
		<a rel="noopener noreferrer"  className="block max-w-sm items-center gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50">
			<img src={space.images[0]} alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500" />
			<div className="p-6 space-y-2 bg-white lg:col-span-5">
				<h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">{space.spaceName}</h3>
				<span className="text-xs dark:text-gray-600">Booked On:{formattedBookingDate}</span>
				<p>Total Amount :<span className='font-bold text-customGreen'> ₹{booking.totalPrice}</span></p>
                <p>Move in Time :<span className='font-bold text-customGreen'> {booking.moveInTime}</span></p>
                <p>Move out Time :<span className='font-bold text-customGreen'> {booking.moveOutTime}</span></p>
			</div>
		</a>
		<div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<a rel="noopener noreferrer" href="#" className="max-w-sm  group hover:no-underline focus:no-underline dark:bg-gray-50">
				<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={space.images[1]} />
				
			</a>
			<a  className="max-w-sm  group hover:no-underline focus:no-underline dark:bg-gray-50">
				<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={space.images[2]} />
				
			</a>
			<a  className="max-w-sm  group hover:no-underline focus:no-underline dark:bg-gray-50">
				<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={space.images[3]} />
				
			</a>
			
		</div>
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
                    <a className="block max-w-full gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50">
                        <div className="lg:col-span-6 w-full">
                        {/* <motion.div

    className="rounded-md shadow-md dark:bg-secondGray dark:text-gray-800  mt-4 cursor-pointer lg:my-16"
    initial={{ opacity: 4, scale: 1, y: 3, boxShadow: "0 0 0 rgba(6, 71, 73, 0)" }}
    whileHover={{ rotateX: 35, boxShadow: "0 12px 24px rgba(6, 71, 73, 0.2)" }}
    animate={{ opacity: 0.5, scale: 1, y: 4 }}
    transition={{ duration: 1 }}
    style={{ boxShadow: "0 0 0 rgba(6, 71, 73, 0)" }}
  > */}
                            <SpaceMap
                                latitude={space.latitude}
                                longitude={space.longitude}
                            
                            />
                            {/* </motion.div> */}
                        </div>
                        <div className="p-6 space-y-2 lg:col-span-6">
                            <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">Location</h3>
                            <span className="text-xs dark:text-gray-600">{formattedBookingDate}</span>
                            <p>Area Name: {space.areaName}</p>
                            <p>District :{space.district}</p>
                            <p>State :{space.state}</p>
                            <p>Country :{space.country}</p>
                        </div>
                    </a>
                </div>
                <div className="flex justify-center">
                        <button onClick={handleCancelBooking} type="button"  className="px-6 py-3 text-sm font-bold rounded-md hover:underline dark:bg-red-500 dark:text-white">
                            Cancel Booking
                        </button>
                    </div>
	</div>
</section>
            {/* Add more booking details here */}
            <Footer/>
        </div>
    );
};

export default BookingDetails;