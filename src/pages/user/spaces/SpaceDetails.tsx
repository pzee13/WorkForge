// src/pages/user/Spaces/SpaceDetails.tsx
import React,{useEffect,useState } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import { useForm,SubmitHandler } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from "../../../app/store";
import { setBooking } from '../../../slices/booking';
import Navbar from "../../../component/user/navbar/Navbar";
import Footer from "../../../component/user/footer/Footer";
import SpaceDetailsMap from "../../../component/common/spaces/SpaceDetailsMap";
import ImageContainer from '../../../component/common/ImageContainer';
import { useBookSpaceMutation } from '../../../slices/userApiSlice';
import Facilities from '../../../component/common/spaces/Facilities'
import { TextGenerateEffect } from "../../../component/ui/TextGenerateEffect";
import SkeletonLoader from '../../../component/user/loader/SkeletonLoader'
import { MdTimeToLeave } from 'react-icons/md';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


 interface BookingFormData {
    bookingDate: string;
    moveInTime: string;
    moveOutTime: string;
  }

const SpaceDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); 
    const [bookingDetails, setBookingDetails] = useState<any>(null)
    const dispatch = useDispatch();
    const { data } = location.state;
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const userID = userInfo ? userInfo._id : '';
    const [bookSpace] = useBookSpaceMutation()

    useEffect(() => {
        // Simulate loading delay (remove this in production)
        const timeout = setTimeout(() => {
            setLoading(false); // Set loading state to false after timeout
        }, 1000); // Adjust timeout as needed

        // Clear timeout on component unmount to avoid memory leaks
        return () => clearTimeout(timeout);
    }, []); // Run effect only once on component mount

    const { register, handleSubmit, watch, setError, clearErrors } = useForm<BookingFormData>();


  

    const onSubmit: SubmitHandler<BookingFormData> = (formData) => {
        if (!userID) {
            // Handle the case where userID is undefined or null
            console.error("User ID is not available");
            navigate('/login')
            return;
          }

          const moveInHour = parseInt(formData.moveInTime, 10);
          const moveOutHour = parseInt(formData.moveOutTime, 10);
  
          if (moveInHour >= moveOutHour) {
              setError("moveOutTime", {
                  type: "manual",
                  message: "Move out time must be later than move in time"
              });
              return;
          }
  
          clearErrors("moveOutTime");

        // Dispatch the setBooking action
        const bookingData = {
            spaceName:data.spaceName,
            spaceId: data._id,
            providerId: data.providerId,
            userId: userID,
            bookingDate: new Date(formData.bookingDate),
            moveInTime: formData.moveInTime,
            moveOutTime: formData.moveOutTime,
            chargePerHour: data.chargePerHour,
            totalPrice: calculateTotal(formData.moveInTime, formData.moveOutTime),
            areaName: data.areaName,
            district: data.district,
            state: data.state,
            country: data.country,
            contactNumber: data.contactNumber
        };

        dispatch(setBooking(bookingData));
        
        setBookingDetails(bookingData)
        // Navigate to the checkout page
        setShowModal(true)
        
    }; 

    const confirm = async () => {
        try {
            const response = await bookSpace(bookingDetails); // Pass the booking details to the mutation
            // Handle the response as needed
            console.log(response);
            // After successful booking, navigate to the checkout page
            navigate('/checkout');
        } catch (error) {
            // Handle any errors that occur during booking
            console.error('Error booking space:', error);
            // Optionally, show an error message to the user
        }
    };


    const moveInTime = watch("moveInTime", "09:00");
    const moveOutTime = watch("moveOutTime", "18:00");

    

    // Function to calculate total cost
    const calculateTotal = (moveIn:string, moveOut:string) => {
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

    const facilitiesData = [
        { name: 'Ea et neque distinctio', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-violet-600"><path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path><polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon></svg> },
        { name: 'Quaerat obcaecati voluptatem', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-violet-600"><path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path><polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon></svg> },
        // Add more facilities data as needed
      ];

    return (
        <>
            <Navbar />
            

            <div className="bg-gray-50">
                    <ImageContainer images={data.images} loading={loading} />
                </div>
            
            <div className="flex justify-center dark:bg-gray-50">
                <div className="w-10/12 shadow-lg">
            
              
                
                    <div className="flex justify-between r px-4 py-2">
                        <div>
                            <h2 className="text-5xl text-customGreen font-bold mb-4"><TextGenerateEffect words={data.spaceName} /></h2>
                            <h3 className=" text-secondGreen font-bold"><span className="dark:text-gray-800 font-bold">Type: </span>{data.spaceType}</h3>
                            <h3 className=" text-secondGreen font-bold"><span className="dark:text-gray-800 font-bold">Contact No: </span>{data.contactNumber}</h3>
                            
                        </div>
                        
                        <div className="flex flex-col shadow-3xl rounded-lg max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 dark:divide-gray-300 dark:bg-customGreen dark:text-white">
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

       
                    {showModal && (
    <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="flex flex-col gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 dark:bg-gray-50 dark:text-gray-800">
                    <h2 className="text-xl font-semibold">Booking Details</h2>
                    <ul className="space-y-4">
                        <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                            <div className="flex w-full space-x-2 sm:space-x-4">
                                <img className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={data.images[0]} alt="Polaroid camera" />
                                <div className="flex flex-col justify-between w-full pb-4">
                                    <div className="flex justify-between w-full pb-2 space-x-2">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-semibold leading-snug">{bookingDetails.spaceName}</h3>
                                            <p className="text-sm dark:text-gray-600">{bookingDetails.bookingDate.toDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold">{bookingDetails.chargePerHour}</p>
                                           
                                        </div>
                                    </div>
                                    <div className="flex text-sm divide-x">
                                        <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                                            <AccessTimeIcon/>
                                            <span>Move In Time:<strong>{bookingDetails.moveInTime}:00</strong></span>
                                        </button>
                                        <button type="button" className="flex items-center px-2 py-1 space-x-1">
                                           <MdTimeToLeave/>
                                            <span>Move Out Time:<strong>{bookingDetails.moveOutTime}:00</strong></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="space-y-1 text-right">
                        <p>Total amount: <span className="font-semibold">₹{bookingDetails.totalPrice}</span></p>
                        <p className="text-sm dark:text-gray-600"> including bevarges and facilities</p>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button onClick={() => setShowModal(false)} type="button" className="px-6 py-2 border rounded-md dark:border-violet-600">
                            Back to Details
                        </button>
                        <button onClick={confirm} type="button" className="px-6 py-2 border rounded-md dark:bg-customGreen dark:text-gray-50 dark:border-violet-600">
                            <span className="sr-only sm:not-sr-only">Continue to </span> Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}

                    
                 
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
                                <p>  <TextGenerateEffect words={data.description} /></p>
                            </div>
                        </section>
                    </div>
                    <div>
                    `       <Facilities facilities={facilitiesData} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SpaceDetails;
