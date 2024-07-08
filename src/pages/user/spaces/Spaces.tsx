import React, { useState, useEffect } from "react";
import Navbar from "../../../component/user/navbar/Navbar";
import Footer from "../../../component/user/footer/Footer";
import { useGetSpacesMutation } from "../../../slices/userApiSlice";
import { IoSearchOutline, IoChevronDown } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import signUpImage from '../../../assets/images/LandingUser/imagehome123.jpg';
import { useGetSpaceTypesMutation } from "../../../slices/userApiSlice";
import { toast } from "react-toastify";
import './Spaces.css'; // Ensure to create a CSS file for additional styling if needed
import { SpaceType } from "../../../types/spaces/spaceType";
import dropImage from '../../../assets/images/Set Space-logo/down-chevron.png'
import SpaceCard from "../../../component/user/landing/SpaceCard"


function Spaces() { 

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [spaces, setSpaces] = useState([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage: number = 4;
  const [spaceTypeFilter, setSpaceTypeFilter] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [spaceTypes, setSpaceTypes] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [getSpaces] = useGetSpacesMutation();
  const [getSpaceTypeData] = useGetSpaceTypesMutation();


  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSpaces() {
      try {
        const res = await getSpaces({
          page: currentPage,
          perPage: itemsPerPage,
          spaceType: spaceTypeFilter,
          state: stateFilter,
          search: searchQuery,
        }).unwrap();
        setSpaces(res.data);
        const stateNames = res.data.map((type) => type.state).filter((value, index, self) => self.indexOf(value) === index);
        setStates(stateNames); // Set the unique states data
        setTotalPages(Math.ceil(res.total / itemsPerPage));
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    }

    fetchSpaces();
  }, [currentPage, spaceTypeFilter, stateFilter, searchQuery, getSpaces]);

  const handlePageChange = (pageNumber: number) => { 
    setCurrentPage(pageNumber);
  };

  const handleSpaceTypeChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSpaceTypeFilter(event.currentTarget.value);
  };

  const handleStateChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setStateFilter(event.currentTarget.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };



  useEffect(() => {
    const fetchSpaceTypes = async () => {
      try {
        const response = await getSpaceTypeData("").unwrap();
        const spaceTypeNames = response.data.map((type: SpaceType) => type.spaceTypeName);
        setSpaceTypes(spaceTypeNames); // Set the space types data

        
      } catch (error) {
        console.error("Error fetching space types:", error);
        toast.error("Failed to fetch space types.");
      }
    };
    fetchSpaceTypes();
  }, [getSpaceTypeData]);
  
  return (
    <>
      <Navbar />
      
          <div className="relative rounded-md ">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />

{/* Text overlay */}


{/* Image with gradient shadow */}
<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80"></div>
  <img
    src={signUpImage}
    alt="Sign Up"
    className="w-full object-cover"
  />

<div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center">
  <p className="text-white text-lg md:text-xl lg:text-4xl font-bold p-4">
    Here you can find and explore various coworking spaces that suit your needs and preferences.
  </p>
</div>
</div>


            {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-5xl font-extrabold text-white mt-5">
                <span className=" px-5 py-2 rounded-lg">
                  OUR
                </span>
              </h1>
              <h1 className="text-5xl text-white font-extrabold mt-3">
                SPACES
              </h1>
            </div> */}
          </div>
          

          {/* <div className="py-4 px-8 flex items-center justify-between text-dark-green font-bold">
            <div className="flex items-center space-x-2">
              <select
                id="spaceType"
                value={spaceTypeFilter}
                onChange={handleSpaceTypeChange}
                className="  text-dark-green px-2 py-1 appearance-none focus:outline-none focus:border-none"
              >
                <option value="" className="flex items-center">
                  Space Type
                  <span className="ml-2 text-white"><IoChevronDown /></span>
                </option>
                {spaceTypes.map((spaceType, index) => (
                  <option key={index} value={spaceType}>
                    {spaceType}
                  </option>
                ))}
              </select>
           
              <select
                id="state"
                value={stateFilter}
                onChange={handleStateChange}
                className=" bg-customGreen text-white  px-2 py-1 appearance-none focus:border-none focus:outline-none"
              >
                <option value="" className="flex items-center">
                  State
                  <img src={dropImage} alt="" />
                </option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <div className="absolute right-3  transform  pointer-events-none">
              
              </div>
            </div>
            <div className="flex items-center">
            
            </div>

         
            <fieldset className="w-full space-y-1 ml-6 dark:text-gray-800">
	<label htmlFor="Search" className="hidden">Search</label>
	<div className="relative">
		<span className="absolute inset-y-0 left-0 flex items-center pl-2">
			<button type="button" title="search" className="p-1 focus:outline-none focus:ring">
				<svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-800">
					<path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
				</svg>
			</button>
		</span>
		<input type="search" name="Search" placeholder="Search..." className="w-32 py-2 pl-10 text-sm sm:w-auto focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-violet-600"    value={searchQuery}
                  onChange={handleSearch} />
	</div>
</fieldset>
         
          </div> */}

<div className="py-4 px-8 flex items-center justify-between text-dark-green font-bold">
    <div className="flex items-center space-x-2">
        <div className="relative">
            <select
                id="spaceType"
                value={spaceTypeFilter}
                onChange={handleSpaceTypeChange}
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-customGreen border border-gray-300 rounded-s-lg hover:bg-customGreen focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-customGreen dark:hover:bg-customGreen dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            >
                <option value="" className="flex items-center">
                    Space Type
                </option>
                {spaceTypes.map((spaceType, index) => (
                    <option key={index} value={spaceType}>
                        {spaceType}
                    </option>
                ))}
            </select>
        </div>

        <div className="relative">
            <select
                id="state"
                value={stateFilter}
                onChange={handleStateChange}
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-customGreen border border-gray-300 rounded-s-lg hover:bg-customGreen focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-customGreen dark:hover:bg-customGreen dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            >
                <option value="" className="flex items-center">
                    State
                </option>
                {states.map((state, index) => (
                    <option key={index} value={state}>
                        {state}
                    </option>
                ))}
            </select>
        </div>
    </div>
    
    <div className="relative w-full max-w-lg mx-auto ml-4">
        <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-white bg-customGreen rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-bg-customGreen dark:bg-customGreen dark:border-customGreen dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:border-green-900"
            placeholder="Search Spaces..."
            required
            value={searchQuery}
            onChange={handleSearch}
        />
       
    </div>
</div>



          <div className="flex justify-center relative bg-gray-50">
          {/* <img
          src={signUpImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover bg-gradient-to-r from-black to-transparent brightness-50"
        /> */}
       
        <div className="w-11/12 ">
        

          <div className="relative ">
          
     
          {spaces.length ?(

            <div className="relative z-20">
              {loading ? (
                // Loading placeholders
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-14 px-3 gap-4">
                  {[...Array(itemsPerPage)].map((_, index) => (
                    <div key={index} className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800 overflow-hidden mt-4 cursor-pointer mx-2 lg:my-16 group">
                      <div className="w-full h-36 object-cover object-center rounded-t-md dark:bg-gray-500 animate-pulse"></div>
                      <div className="flex flex-col justify-between p-6 space-y-8">
                        <div className="space-y-2">
                        <div className="w-full h-6 rounded dark:bg-gray-300 animate-pulse"></div>
                          <div className="w-full h-6 rounded dark:bg-gray-300 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Render space cards
            
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  px-3 gap-6">
              {spaces.map((space, index) => (
  <motion.div
    onClick={() => navigate("/spaceDetails", { state: { data: space } })}
    key={space._id}
    className="max-w-xs rounded-md shadow-md dark:bg-secondGray dark:text-gray-800 overflow-hidden mt-4 cursor-pointer mx-2 lg:my-16"
    initial={{ opacity: 0, scale: 0.5, y: 100, boxShadow: "0 0 0 rgba(6, 71, 73, 0)" }}
    whileHover={{ rotateX: -20, boxShadow: "0 12px 24px rgba(6, 71, 73, 0.2)" }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    style={{ boxShadow: "0 0 0 rgba(6, 71, 73, 0)" }}
  >
    {/* <img
      className="w-full h-36 object-cover object-center rounded-t-md dark:bg-gray-500"
      src={space.images[2]}
      alt="Space"
    />
    <div className="flex flex-col justify-between p-6 space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-dark-green text-center">{space.spaceName.toUpperCase()}</h2>
        <p className="flex items-center text-dark-green text-sm justify-center ">
          <FontAwesomeIcon icon={faBuilding} className="mr-2" />
          {space.spaceType}
        </p>
        <p className="text-xs text-dark-green flex items-center justify-center ">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 h-5" />
          {space.areaName}, {space.state}
        </p>
      </div>
    </div> */}
    <SpaceCard key={space._id} space={space}/>
  </motion.div>
))}



                </div>
              
              )}
            </div>

):(
  <section className="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
  <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-400">
      <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
      <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
      <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
      <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
    </svg>
    <p className="text-3xl"><span className="text-4xl text-customGreen font-extrabold">Sorry , </span>looks like our services are currently not available for you</p>
    <a rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded dark:bg-customGreen dark:text-gray-50">Back to homepage</a>
  </div>
</section>
)}
            
            <div className="flex justify-center space-x-1 dark:text-gray-800 mt-4">
      <button
        title="previous"
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-customGreen dark:border-gray-100 disabled:opacity-50"
      >
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          title={`Page ${page}`}
          className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border bg-customGreen rounded shadow-md ${
            currentPage === page
              ? 'dark:bg-gray-50 dark:text-violet-600 dark:border-violet-600'
              : 'dark:bg-customGreen  dark:text-white dark:border-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        title="next"
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center text-white w-8 h-8 py-0 border rounded-md shadow-md bg-customGreen dark:border-gray-100 disabled:opacity-50"
      >
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Spaces;