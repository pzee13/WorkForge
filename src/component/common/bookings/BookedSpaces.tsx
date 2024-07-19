import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface Booking {
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

interface RatedSpaceProps {
    booking: Booking;
    images: string;
}

const BookedSpaces: React.FC<RatedSpaceProps> = ({ booking,images }) => {
    const navigate = useNavigate();
    const formattedBookingDate = new Date(booking.bookingDate).toLocaleDateString()

    const handleNavigation = () => {
        navigate(`/bookingDetails/${booking._id}`);
    };
    return (
        <div className="relative group bg-white shadow-2xl" onClick={handleNavigation}>
            <div className="overflow-hidden h-48"> {/* Fixed height for the image container */}
                <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125" src={images} alt={booking.spaceName} />
            </div>
            {booking.bookingDate && (
                <div className="absolute left-3 top-3 bg-black">
                    <p className={`sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs text-white font-bold tracking-wide uppercase rounded-full  `}>
                    Booked on: {formattedBookingDate}
                    </p>
                </div>
            )}
            <div className="flex items-start justify-between mt-4  space-x-4">
                <div>
                    <h3 className="text-xs ml-2 font-bold text-customGreen sm:text-sm ">
                        <a  title={booking.spaceName}>
                            {booking.spaceName}
                            <span className="absolute inset-0" aria-hidden="true"></span>
                        </a>
                    </h3>
                    <div className="flex items-center mt-2.5 ml-2 space-x-px">
                        {/* {Array.from({ length: 5 }, (_, index) => (
                            <svg
                                key={index}
                                className={`w-3 h-3 text-yellow-400  sm:w-4 sm:h-4`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                            </svg>
                        ))} */}
                        Move In Time:{booking.moveInTime}
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-gray-900 mr-2 sm:text-sm">${booking.totalPaid}</p>
                    <div className="flex items-center mt-2.5 mr-2 space-x-px">
                        {/* {Array.from({ length: 5 }, (_, index) => (
                            <svg
                                key={index}
                                className={`w-3 h-3 text-yellow-400  sm:w-4 sm:h-4`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                            </svg>
                        ))} */}
                        Move Out Time:{booking.moveOutTime}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default BookedSpaces;
