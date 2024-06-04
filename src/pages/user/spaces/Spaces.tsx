import React, { useState, useEffect } from "react";
import Navbar from "../../../component/user/navbar/Navbar";
import Footer from "../../../component/user/Footer/Footer";
import { useGetSpacesMutation } from "../../../slices/userApiSlice";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import { AddSpaceForms } from '../../../utils/validations/commonVaild';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import signUpImage from '../../../assets/images/LandingUser/fotor-ai-20240519165821.jpg';

import './Spaces.css'; // Ensure to create a CSS file for additional styling if needed

function Spaces() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [spaces, setSpaces] = useState([])
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage: number = 4;
  const [spaceTypeFilter, setSpaceTypeFilter] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [getSpaces] = useGetSpacesMutation();

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
        setTotalPages(Math.ceil(res.total / itemsPerPage));
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

  const spaceTypes: string[] = ["Office Space", "Meeting Room", "Training Room", "Desk Space"];
  const states: string[] = ["California", "New York", "Texas", "Florida", "Illinois"];

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
  <span className="ml-2">&#9660;</span>
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
            className=" bg-customGreen text-white rounded-lg px-2 py-1 appearance-none focus:border-none focus:outline-none"
          >
           <option value="" className="flex items-center">
  State
  <span className="ml-2">&#9660;</span>
</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
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
        
        <div className="relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:px-14 px-3">
  {spaces.map((space) => (
    <div
      onClick={() => navigate("/user/spaces/spaceDetails", { state: { data: space } })}
      key={space._id}
      className="max-w-xs  rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800 overflow-hidden mt-4 cursor-pointer mx-2 lg:my-16 group"
    >
      <img
        className="w-full h-36 object-cover object-center rounded-t-md dark:bg-gray-500"
        src={space.images[2]}
        alt="Space"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold  text-dark-green text-center">{space.spaceName.toUpperCase()}</h2>
          <p className="flex items-center text-dark-green text-sm justify-center ">
                <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                {space.spaceType}
              </p>
          <p className="text-xs text-dark-green flex items-center justify-center ">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 h-5" />
                {space.areaName}, {space.state}
              </p>
        </div>
        <button 
          type="button" 
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-customGreen dark:text-gray-50"
          onClick={()=>navigate("/spaceDetails",{ state: { data: space } })} key={space._id}>
          View Details
        </button>
      </div>
    </div>
  ))}
</div>

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
      </div>
      <Footer />
    </>
  );
}

export default Spaces;