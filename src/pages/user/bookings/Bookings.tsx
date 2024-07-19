import React, { useEffect, useState } from 'react';
import { useGetBookingsMutation, useGetSpaceUserMutation } from '../../../slices/userApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import Navbar from "../../../component/user/navbar/Navbar";
import Footer from "../../../component/user/footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import BookedSpaces from "../../../component/common/bookings/BookedSpaces";
import { motion } from "framer-motion";

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

export interface Space {
  _id: string;
  spaceName: string;
  images: string[];
  areaName:string;
  isAccepted: boolean;
}

const Bookings: React.FC = () => {
  const [getBookings] = useGetBookingsMutation();
  const [getSpaceUser] = useGetSpaceUserMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const userID = userInfo?._id;
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  // const [error, setError] = useState<string | null>(null); // Track error state
  const [showActiveBookings, setShowActiveBookings] = useState(true); // State to toggle between active and past bookings

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true)// Set loading state to true before fetching
      // setError(null); // Clear previous errors

      try {
        const response = await getBookings("").unwrap();
        console.log('API Response:', response.data);
        setUserBookings(response.data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        // setError('Failed to fetch bookings');
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    const fetchSpaces = async () => {
      setIsLoading(true); // Set loading state to true before fetching
      // setError(null); // Clear previous errors

      try {
        const response = await getSpaceUser("").unwrap();
        console.log('API Response:', response.data);
        setSpaces(response.data.filter((space: Space) => space.isAccepted));
      } catch (error) {
        console.error('Failed to fetch spaces:', error);
        // setError('Failed to fetch spaces');
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    if (userID) {
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000)); // 1000ms delay

      // Fetch bookings and spaces, but wait for the delay to complete
      Promise.all([delayPromise, fetchBookings(), fetchSpaces()]).then(() => {
        setIsLoading(false); // Set loading state to false after fetching and delay
      });
    }
  }, [userID, getBookings, getSpaceUser]);

 // Show loading indicator

  const getSpaceDetails = (spaceId: string) => {
    const space = spaces.find(space => space._id === spaceId);
    return space ? { image: space.images[0], spaceName: space.spaceName ,areaName:space.areaName } : { image: '', spaceName: '',areaName:'' };
  };

  const filteredBookings = userBookings.filter(booking => {
    const bookingDate = new Date(booking.bookingDate);
    return showActiveBookings ? bookingDate >= new Date() : bookingDate < new Date();
  });


  const renderSkeletons = () => {
   
    return Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800 overflow-hidden mt-4 cursor-pointer mx-2 lg:my-16 group">
      <div className="w-full h-36 object-cover object-center rounded-t-md dark:bg-gray-500 animate-pulse"></div>
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
        <div className="w-full h-6 rounded dark:bg-gray-300 animate-pulse"></div>
          <div className="w-full h-6 rounded dark:bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </div>
    ));
    
  };


  return (
    <>
      <Navbar />
      <section className="py-12 mt-10 sm:mt-10 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              className={`bg-customGreen text-white w-36 ${showActiveBookings ? 'font-bold' : ''}`} 
              onClick={() => setShowActiveBookings(true)}
            >
              Active Bookings
            </button>
            <button 
              className={`bg-customGreen text-white w-36 ${!showActiveBookings ? 'font-bold' : ''}`} 
              onClick={() => setShowActiveBookings(false)}
            >
              Past Bookings
            </button>
          </div>

      
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {showActiveBookings ? 'Your Upcoming Bookings' : 'Your Past Bookings'}
            </h2>
            <p className="mt-4 text-base font-normal leading-7 text-gray-600">
              {showActiveBookings ? 'Your currently active bookings' : 'Your past bookings'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6  lg:mt-8 lg:gap-4 lg:grid-cols-4">
             {isLoading ? (
             
              renderSkeletons()
              
            ) : (
              filteredBookings.map((booking) => {
                const { image, spaceName, areaName } = getSpaceDetails(booking.spaceId);
                return (
                  <motion.div

    className=" rounded-sm shadow-md  overflow-hidden mt-4 bg-customGreen cursor-pointer mx-2 h-80 lg:my-16"
    initial={{ opacity: 0, scale: 0.9, y: 100, boxShadow: "0 0 0 rgba(6, 71, 73, 0)" }}
    whileHover={{ rotateX: -20, boxShadow: "0 12px 24px rgba(6, 71, 73, 0.2)" }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5,delay: 0.1}}
    style={{ boxShadow: "0 0 0 rgba(6, 71, 73, 0)" }}
  >
                  <BookedSpaces key={booking._id} booking={{ ...booking, spaceName }} images={image} />
                  <p className='text-white flex justify-center p-1 item-center'><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 h-5" /> {areaName}</p>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Bookings;
