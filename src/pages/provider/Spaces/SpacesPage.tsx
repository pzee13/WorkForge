import React, { useEffect, useState } from 'react';
import './SpacePage.css';
import CurrentSpaces from '../../../component/provider/spaces/CurrentSpaces';
import { useMySpacesMutation } from '../../../slices/providerApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from "../../../app/store";




const SpacesPage = () => {
  const [spaces, setSpaces] = useState([]);
  const [fetchSpaces] = useMySpacesMutation();
  const { providerInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchAndFilterSpaces = async () => {
      try {
        const response = await fetchSpaces("").unwrap();
        const acceptedSpaces = response.data.filter(space => space.isAccepted);
        const providerSpaces = acceptedSpaces.filter(space => space.providerId === providerInfo._id);
        setSpaces(providerSpaces);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    };

    fetchAndFilterSpaces();
  }, [fetchSpaces, providerInfo]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterByDate, setFilterByDate] = useState('');
  const [filterBySpaceType, setFilterBySpaceType] = useState('');
  const [filterByCountry, setFilterByCountry] = useState('');
  const [filterByState, setFilterByState] = useState('');
  const [filterByDistrict, setFilterByDistrict] = useState('');
  const [filterByAreaName, setFilterByAreaName] = useState('');
  const [filterByCharge, setFilterByCharge] = useState('');

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e, filterSetter) => filterSetter(e.target.value);

  // Extract unique values for each filter category
  const getUniqueValues = (array, key) => {
    return [...new Set(array.map(item => item[key]))];
  };

  const spaceTypes = getUniqueValues(spaces, 'spaceType');
  const countries = getUniqueValues(spaces, 'country');
  const states = getUniqueValues(spaces, 'state');
  const districts = getUniqueValues(spaces, 'district');
  const areaNames = getUniqueValues(spaces, 'areaName');

  const filteredSpaces = spaces.filter((space) => {
    const matchesSearchTerm = space.spaceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterByDate === '' || new Date(space.createdAt).getFullYear().toString() === filterByDate;
    const matchesSpaceType = filterBySpaceType === '' || space.spaceType === filterBySpaceType;
    const matchesCountry = filterByCountry === '' || space.country === filterByCountry;
    const matchesState = filterByState === '' || space.state === filterByState;
    const matchesDistrict = filterByDistrict === '' || space.district === filterByDistrict;
    const matchesAreaName = filterByAreaName === '' || space.areaName === filterByAreaName;
    const matchesCharge = filterByCharge === '' || space.chargePerHour <= parseFloat(filterByCharge);

    return matchesSearchTerm && matchesDate && matchesSpaceType && matchesCountry && matchesState && matchesDistrict && matchesAreaName && matchesCharge;
  });

  return (
    <div className="overflow-hidden scrollbar-hide">
      <div className="p-2 mt-2">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border "
        />
         <select value={filterByDate} onChange={(e) => handleFilterChange(e, setFilterByDate)} className="p-2 border ml-2 custom-select">
          <option value="" className="custom-option">All Dates</option>
          <option value="2021" className="custom-option">2021</option>
          <option value="2022" className="custom-option">2022</option>
          <option value="2023" className="custom-option">2023</option>
        </select>
        <select value={filterBySpaceType} onChange={(e) => handleFilterChange(e, setFilterBySpaceType)} className="p-2 border ml-2 custom-select">
          <option value="" className="custom-option">All Types</option>
          {spaceTypes.map((type) => (
            <option key={type} value={type} className="custom-option">{type}</option>
          ))}
        </select>
        <select value={filterByCountry} onChange={(e) => handleFilterChange(e, setFilterByCountry)} className="p-2 border ml-2 custom-select">
          <option value="" className="custom-option">All Countries</option>
          {countries.map((country) => (
            <option key={country} value={country} className="custom-option">{country}</option>
          ))}
        </select>
        <select value={filterByState} onChange={(e) => handleFilterChange(e, setFilterByState)} className="p-2 border ml-2 custom-select">
          <option value="" className="custom-option">All States</option>
          {states.map((state) => (
            <option key={state} value={state} className="custom-option">{state}</option>
          ))}
        </select>
        <select value={filterByDistrict} onChange={(e) => handleFilterChange(e, setFilterByDistrict)} className="p-2 border ml-2 custom-select">
          <option value="" className="custom-option">All Districts</option>
          {districts.map((district) => (
            <option key={district} value={district} className="custom-option">{district}</option>
          ))}
        </select>
        <select value={filterByAreaName} onChange={(e) => handleFilterChange(e, setFilterByAreaName)} className="p-2 border ml-2 custom-select">
          <option value="" className="custom-option">All Areas</option>
          {areaNames.map((areaName) => (
            <option key={areaName} value={areaName} className="custom-option">{areaName}</option>
          ))}
        </select>
      </div>
      <div className="h-[500px] overflow-y-scroll scrollbar-hide p-2 mt-10 space-y-4">
        {filteredSpaces.map((space) => (
          <CurrentSpaces key={space._id} space={space} />
        ))}
      </div>
    </div>
  );
};

export default SpacesPage;
