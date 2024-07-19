import  { useEffect, useState } from 'react';
import Navbar from "../../../component/user/navbar/Navbar";
import Footer from "../../../component/user/Footer/Footer";
import { RootState } from '../../../app/store'
import { useSelector } from 'react-redux';
import homePageImage from '../../../assets/images/LandingUser/img2.png';
// import image1 from "../../../assets/svgs/image.svg"
import SpaceList from "../../../component/user/Landing/SpaceList"
import { useGetSpacesMutation,useGetSpaceTypesMutation } from "../../../slices/userApiSlice";
import LandingPageCard from '../../../component/user/Landing/LandingPageCard'; 
import RatedSpaces from '../../../component/user/Landing/RatedSpaces';
import officeSpace from "../../../assets/images/office room.jpg"
import meetingRoom from "../../../assets/images/meeting room.jpg";
import trainingSpace from "../../../assets/images/Training room.jpg";
import increase from "../../../assets/svgs/increase.png";
import LocationCard from '../../../component/user/Landing/LocationCard'
// import bgstyle from "../../../assets/svgs/pngwing.com.png"
import deskSpace from "../../../assets/images/deskSpace.jpg";
import './UserHome.css'
import mumbaiImage from "../../../assets/images/States/Mumbai.jpg";
import delhiImage from "../../../assets/images/States/delhi.jpg"
import bengaluruImage from "../../../assets/images/States/Bengaluru.jpg";
import hyderabadImage from "../../../assets/images/States/Hyderabad.jpg";
import chennaiImage from "../../../assets/images/States/chennai.jpg";
import kolkataImage from "../../../assets/images/States/Kolkata.jpg";
import puneImage from "../../../assets/images/States/Pune.jpg"
import ahmedabadImage from "../../../assets/images/States/ahmedabad.jpg";
import jaipurImage from "../../../assets/images/States/Jaipur.jpg";
import kochiImage from "../../../assets/images/States/Kochi.jpg";

import Faq from "../../../component/user/Landing/Faq";


export function UserHome() {
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const userId = userInfo?._id;

    const [spaces, setSpaces] = useState([]);
    // const [spaceTypess, setSpaceTypes] = useState([]);
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
                // setSpaceTypes(response.data);
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

      const indianCities = [
        {
            id: 1,
            imageUrl: mumbaiImage,
            name: 'Mumbai'
        },
        {
            id: 2,
            imageUrl: delhiImage,
            name: 'Delhi'
        },
        {
            id: 3,
            imageUrl: bengaluruImage,
            name: 'Bengaluru'
        },
        {
            id: 4,
            imageUrl: hyderabadImage,
            name: 'Hyderabad'
        },
        {
            id: 5,
            imageUrl: chennaiImage,
            name: 'Chennai'
        },
        {
            id: 6,
            imageUrl: kolkataImage,
            name: 'Kolkata'
        },
        {
            id: 7,
            imageUrl: puneImage,
            name: 'Pune'
        },
        {
            id: 8,
            imageUrl: ahmedabadImage,
            name: 'Ahmedabad'
        },
        {
            id: 9,
            imageUrl: jaipurImage,
            name: 'Jaipur'
        },
        {
            id: 10,
            imageUrl: kochiImage,
            name: 'Kochi'
        }
    ];

    interface FaqItem {
        question: string;
        answer: string;
        open: boolean;
    }

    const faqs: FaqItem[] = [
        {
            question: 'How do I book a coworking space?',
            answer: 'To book a coworking space, navigate to our website, browse workspaces, select your desired location and Types, and proceed with the booking process.',
            open: false
        },
        {
            question: 'What amenities are included in the coworking spaces?',
            answer: 'Our coworking spaces come equipped with high-speed internet, comfortable workstations,unlimited beverages,restroom facilities, and more to support your work needs.',
            open: false
        },
        {
            question: 'Can I modify or cancel my booking?',
            answer: 'Yes, you can modify or cancel your booking through your account dashboard. Please check our cancellation policy for details.',
            open: false
        },
        {
            question: 'How can I contact support if I encounter issues?',
            answer: 'If you encounter any issues or have questions, you can reach our support team through our contact page or by emailing support@setspace47.com.',
            open: false
        }
    ];



    
    console.log("space",spaces)

    console.log("prId", userId);
    return (
        <>
            <Navbar />

            <SpaceList spaces={spaces}/>

            <LandingPageCard spaceTypes={spaceTypes}/>

           
            
        <div className='mt-20'>
            <div className="max-w-md mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Popular Cities</h2>
                    <p className="mt-2 text-base font-normal leading-7 text-gray-600">Explore Diverse Coworking Environments Worldwide.</p>
            </div>

            <div className="scroll-container">
  <div className="scroll-content flex w-full gap-6 pb-8 mt-12  sm:mt-16 lg:mt-5 snap-x">
    {indianCities.concat(indianCities).map((post, index) => (
      <LocationCard
        key={`${post.id}-${index}`}
        imageUrl={post.imageUrl}
        title={post.name}
      />
    ))}
  </div>
</div>

          
          </div>


          <RatedSpaces spaces={spaces} />

         
   

    <section className="bg-white overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
            <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-6/12">
                {/* <div className="absolute bottom-0 right-0 hidden lg:block">
                    <img className="object-contain w-auto h-96" src={bgstyle} alt="" />
                </div> */}

                {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div> */}

                <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
                    <h1 className="text-4xl font-bold text-darkGreen sm:text-6xl xl:text-8xl">
                      Join Our Community <br />
                      <span className='text-2xl font-bold sm:text-3xl xl:text-5xl'>Be a Part of Something Bigger</span>
                    </h1>
                    

                    <div className="relative mt-10 inline-flex group">
                        <div className=""></div>
                        <button
                            title=""
                            className="inline-flex relative items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-extrabold text-white transition-all duration-200 bg-darkGreen border border-transparent rounded-lg hover:bg-darkGreenHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkGreen"
                        >
                            JOIN
                        </button>
                    </div>


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

            <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-6/12">
                <div className="absolute inset-0">
                    <img className="object-cover w-full h-full " src={homePageImage} alt="" />
                </div>

                {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div> */}

                <div className="absolute bottom-0 left-0">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center">
                            {/* <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                            </svg> */}
                            <img className='w-20 h-20 text-orange-500' src={increase} alt="" />
                            <h2 className="font-bold text-darkGreen text-7xl ml-2.5">395</h2>
                        </div>
                        <p className="max-w-xs mt-1.5 text-xl font-bold text-black">Join a growing network of hundreds of dedicated space providers </p>
                    </div>
                </div>
            </div>
        </div>
    </section>



                
    <Faq faqs={faqs} />
    
          <Footer />
        </>
    );
}
