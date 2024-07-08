import React, { useEffect, useState } from 'react';
import Navbar from "../../../component/user/navbar/Navbar";
import { RootState } from '../../../app/store'
import { useSelector } from 'react-redux';
import homePageImage from '../../../assets/images/LandingUser/img2.png';
import image1 from "../../../assets/svgs/image.svg"
import SpaceList from "../../../component/user/landing/SpaceList"
import { useGetSpacesMutation,useGetSpaceTypesMutation } from "../../../slices/userApiSlice";
import LandingPageCard from '../../../component/user/landing/LandingPageCard'; 
import RatedSpaces from '../../../component/user/landing/RatedSpaces';
import officeSpace from "../../../assets/images/office room.jpg"
import meetingRoom from "../../../assets/images/meeting room.jpg";
import trainingSpace from "../../../assets/images/Training room.jpg";
import deskSpace from "../../../assets/images/deskSpace.jpg";


export function UserHome() {
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const userId = userInfo?._id;

    const [spaces, setSpaces] = useState([]);
    const [spaceTypess, setSpaceTypes] = useState([]);
    const [getSpaces] = useGetSpacesMutation();
    const [getSpaceTypes] = useGetSpaceTypesMutation();

    useEffect(() => {
        const fetchSpaces = async () => {
            try {
                const response = await getSpaces({}).unwrap();
                console.log('API Response:', response.data);
                const latestSpaces = response.data.slice(0, 10); // Get the latest 10 spaces
                setSpaces(latestSpaces);
            } catch (error) {
                console.error('Failed to fetch spaces:', error);
            }
        };

        const fetchSpaceTypes = async () => {
            try {
                const response = await getSpaceTypes({}).unwrap();
                console.log('API Response:', response.data);
                setSpaceTypes(response.data);
            } catch (error) {
                console.error('Failed to fetch space types:', error);
            }
        };

        fetchSpaces();
        fetchSpaceTypes();
    }, [getSpaces, getSpaceTypes]);

    const spaceTypes = [
        {
          imageSrc: officeSpace,
          heading: "Office Space",
          paragraph: 'Our office spaces offer a professional, productive environment with modern amenities, high-speed internet, and ergonomic furniture for startups, small businesses, and freelancers.',
        //   isReverse: false,
        },
        {
          imageSrc: meetingRoom,
          heading: "Meeting Room",
          paragraph: 'Our meeting rooms provide a professional setting with state-of-the-art audio-visual equipment and high-speed internet, ideal for client meetings, team discussions, and brainstorming sessions.',
        //   isReverse: true,
        },
        {
          imageSrc: deskSpace,
          heading: "Desk Space",
          paragraph: 'Our desk spaces offer a flexible, affordable workspace with high-speed internet and ergonomic seating, perfect for freelancers, remote workers, and entrepreneurs.',
        //   isReverse: false,
        },
        {
          imageSrc: trainingSpace,
          heading: "Training Space",
          paragraph: 'Our training spaces are equipped with modern presentation tools and comfortable seating, ideal for workshops, training sessions, and seminars.',
        //   isReverse: true,
        },
      ];

    console.log("space",spaces)

    console.log("prId", userId);
    return (
        <>
            <Navbar />

            <SpaceList spaces={spaces}/>

            <LandingPageCard spaceTypes={spaceTypes}/>

            <RatedSpaces spaces={spaces} />

     
   

    <section className="bg-darkGreen overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
            <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
                <div className="absolute bottom-0 right-0 hidden lg:block">
                    <img className="object-contain w-auto h-96" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/curved-lines.png" alt="" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
                    <h1 className="text-4xl font-bold text-white sm:text-6xl xl:text-8xl">
                        Book your Space <br />
                        Fast and Easy.
                    </h1>
                    <p className="mt-8 text-xl text-white">We help you to make your remote work life easier. Build a distraction free working experience.</p>

                    {/* <form action="#" method="POST" className="max-w-xl mx-auto mt-8 bg-white lg:mx-0 sm:bg-transparent lg:mt-12 rounded-xl">
                        <div className="p-4 sm:p-2 sm:bg-white sm:border-2 sm:border-transparent sm:rounded-full sm:focus-within:border-orange-500 sm:focus-within:ring-1 sm:focus-within:ring-orange-500">
                            <div className="flex flex-col items-start sm:flex-row">
                                <div className="flex-1 w-full min-w-0">
                                    <div className="relative text-gray-400 focus-within:text-gray-600">
                                        <label className="sr-only"></label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter email to get started"
                                            className="block w-full px-4 py-4 text-base text-center text-black placeholder-gray-500 transition-all duration-200 border-transparent rounded-full sm:text-left focus:border-transparent focus:ring-0 caret-orange-500"
                                            
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-orange-500 border border-transparent rounded-full sm:w-auto sm:ml-4 sm:mt-0 hover:bg-orange-600 focus:bg-orange-600">
                                    Try 14 days free
                                </button>
                            </div>
                        </div>
                    </form> */}
                    {/* <p className="mt-5 text-base text-black">Instant access . No credit card required</p> */}
                </div>

                <div className="absolute right-0 z-10 -bottom-16 lg:top-24 lg:-left-20">
                    <img className="w-32 h-32 md:w-40 md:h-40" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/circular-text.png" alt="" />
                </div>
            </div>

            <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-5/12">
                <div className="absolute inset-0">
                    <img className="object-cover w-full h-full " src={homePageImage} alt="" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center">
                            <svg className="w-10 h-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                            </svg>
                            <h2 className="font-bold text-white text-7xl ml-2.5">395</h2>
                        </div>
                        <p className="max-w-xs mt-1.5 text-xl text-white">Professionals have organized their desk via PostCra</p>
                    </div>
                </div>
            </div>
        </div>
    </section>



                    <section className="dark:bg-gray-100 dark:text-gray-800">
                        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                            <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                                <h1 className="text-5xl font-bold leading-none sm:text-6xl">Ac mattis
                                    <span className="dark:text-green-600">senectus</span> erat pharetra
                                </h1>
                                <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer
                                    <br className="hidden md:inline lg:hidden" />turpis pulvinar, est scelerisque ligula sem
                                </p>
                                <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                                    <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded dark:bg-green-600 dark:text-gray-50">Suspendisse</a>
                                    <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800">Malesuada</a>
                                </div>
                            </div>
                            <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                                <img src={image1} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                            </div>
                        </div>
                    </section>
             
          
        </>
    );
}
