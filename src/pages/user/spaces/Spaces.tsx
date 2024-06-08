import React, { useState, useEffect } from "react";
import Navbar from "../../../component/user/navbar/Navbar";
import Footer from "../../../component/user/Footer/Footer";
import { useGetSpacesMutation } from "../../../slices/userApiSlice";
import { IoSearchOutline, IoChevronDown } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import signUpImage from '../../../assets/images/LandingUser/fotor-ai-20240519165821.jpg';
import { useGetSpaceTypesMutation } from "../../../slices/adminApiSlice";
import { toast } from "react-toastify";
import './Spaces.css'; // Ensure to create a CSS file for additional styling if needed
import { SpaceType } from "../../../types/Spaces/spaceType";
import dropImage from '../../../assets/images/Set Space-logo/down-chevron.png'


function Spaces() {
  const [showSearchInput, setShowSearchInput] = useState(false);
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

  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
    if (!showSearchInput) {
      const searchInput = document.getElementById("searchInput");
      if (searchInput) {
        searchInput.focus();
      }
    }
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
      <div className="flex justify-center dark:bg-gray-100">
        <div className="w-11/12 shadow-2xl ">
          <div className="relative rounded-md ">
            <img
              src={signUpImage}
              alt=""
              className="h-80 w-full object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-5xl font-extrabold text-white mt-5">
                <span className=" px-5 py-2 rounded-lg">
                  OUR
                </span>
              </h1>
              <h1 className="text-5xl text-white font-extrabold mt-3">
                SPACES
              </h1>
            </div>
          </div>

          <div className="py-4 px-8 flex items-center justify-between text-dark-green  shadow-lg bg-customGreen">
            <div className="flex items-center space-x-2">
              <select
                id="spaceType"
                value={spaceTypeFilter}
                onChange={handleSpaceTypeChange}
                className=" bg-customGreen text-white rounded-lg px-2 py-1 appearance-none focus:outline-none focus:border-none"
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
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-white">
                  <IoChevronDown />
                </span>
              <select
                id="state"
                value={stateFilter}
                onChange={handleStateChange}
                className=" bg-customGreen text-white rounded-lg px-2 py-1 appearance-none focus:border-none focus:outline-none"
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
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={dropImage} alt="dropdown icon" className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-center">
              <button
                className="text-customGreen font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-white"
                onClick={handleSearchClick}
              >
                {showSearchInput ? "X" : <IoSearchOutline />}
              </button>
            </div>

            {showSearchInput && (
              <div className="bg-grey-100 rounded-md">
                <input
                  type="text"
                  id="searchInput"
                  className="focus:outline-none transition  border-grey-600"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            )}
          </div>

          <div className="relative dark:bg-gray-100">
     
          {spaces.length ?(

            <div className="relative z-20">
              {loading ? (
                // Loading placeholders
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-14 px-3">
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
            
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-14 px-3">
              {spaces.map((space, index) => (
  <motion.div
    onClick={() => navigate("spaceDetails", { state: { data: space } })}
    key={space._id}
    className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800 overflow-hidden mt-4 cursor-pointer mx-2 lg:my-16"
    initial={{ opacity: 0, scale: 0.5, y: 100, boxShadow: "0 0 0 rgba(6, 71, 73, 0)" }}
    whileHover={{ rotateX: -20, boxShadow: "0 12px 24px rgba(6, 71, 73, 0.2)" }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    style={{ boxShadow: "0 0 0 rgba(6, 71, 73, 0)" }}
  >
    <img
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
    </div>
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