// import React, { useEffect, useState, ChangeEvent } from 'react';
// import './SpacePage.css';
// import CurrentSpaces from '../../../component/provider/spaces/CurrentSpaces';
// import { useMySpacesMutation } from '../../../slices/providerApiSlice';
// import { useSelector } from 'react-redux';
// import { RootState } from "../../../app/store";

// export interface WorkSpace {
//   createdAt: Date;
//   id: string;
//   providerId: string;
//   spaceName: string;
//   spaceType: string;
//   state: string;
//   district: string;
//   country: string;
//   areaName: string;
//   buildingName: string;
//   description: string;
//   floor: string;
//   images: string[];
//   chargePerHour: number;
//   availableSpaces: number;
//   isAccepted: boolean;
//   contactNumber: string;
//   facilities: string[];
//   rentalAgreement: string;
//   latitude: number;
//   longitude: number;
// }

// const SpacesPage: React.FC = () => {
//   const [spaces, setSpaces] = useState<WorkSpace[]>([]);
//   const [fetchSpaces] = useMySpacesMutation();
//   const { providerInfo } = useSelector((state: RootState) => state.auth);
//   const providerID = providerInfo?._id;

//   useEffect(() => {
//     const fetchAndFilterSpaces = async () => {
//       try {
//         const response = await fetchSpaces("").unwrap();
//         const acceptedSpaces = response.data.filter((space: WorkSpace) => space.isAccepted);
//         const providerSpaces = acceptedSpaces.filter((space: WorkSpace) => space.providerId === providerID);
//         setSpaces(providerSpaces);
//       } catch (error) {
//         console.error('Error fetching spaces:', error);
//       }
//     };

//     fetchAndFilterSpaces();
//   }, [fetchSpaces, providerID]);

//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [filterByDate, setFilterByDate] = useState<string>('');
//   const [filterBySpaceType, setFilterBySpaceType] = useState<string>('');
//   const [filterByCountry, setFilterByCountry] = useState<string>('');
//   const [filterByState, setFilterByState] = useState<string>('');
//   const [filterByDistrict, setFilterByDistrict] = useState<string>('');
//   const [filterByAreaName, setFilterByAreaName] = useState<string>('');
//   const [filterByCharge, setFilterByCharge] = useState<string>('');

//   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
//   const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>, filterSetter: React.Dispatch<React.SetStateAction<string>>) => filterSetter(e.target.value);

//   const getUniqueValues = (array: WorkSpace[], key: keyof WorkSpace) => {
//     return [...new Set(array.map(item => item[key]))];
//   };

//   const spaceTypes = getUniqueValues(spaces, 'spaceType');
//   const countries = getUniqueValues(spaces, 'country');
//   const states = getUniqueValues(spaces, 'state');
//   const districts = getUniqueValues(spaces, 'district');
//   const areaNames = getUniqueValues(spaces, 'areaName');

//   const filteredSpaces = spaces.filter((space: WorkSpace) => {
//     const matchesSearchTerm = space.spaceName.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDate = filterByDate === '' || new Date(space.createdAt).getFullYear().toString() === filterByDate;
//     const matchesSpaceType = filterBySpaceType === '' || space.spaceType === filterBySpaceType;
//     const matchesCountry = filterByCountry === '' || space.country === filterByCountry;
//     const matchesState = filterByState === '' || space.state === filterByState;
//     const matchesDistrict = filterByDistrict === '' || space.district === filterByDistrict;
//     const matchesAreaName = filterByAreaName === '' || space.areaName === filterByAreaName;
//     const matchesCharge = filterByCharge === '' || space.chargePerHour <= parseFloat(filterByCharge);

//     return matchesSearchTerm && matchesDate && matchesSpaceType && matchesCountry && matchesState && matchesDistrict && matchesAreaName && matchesCharge;
//   });

//   return (
//     <div className="overflow-hidden scrollbar-hide">
//       <div className="p-2 mt-2">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="p-2 border"
//         />
//         <select value={filterByDate} onChange={(e) => handleFilterChange(e, setFilterByDate)} className="p-2 border ml-2 custom-select">
//           <option value="" className="custom-option">All Dates</option>
//           <option value="2021" className="custom-option">2021</option>
//           <option value="2022" className="custom-option">2022</option>
//           <option value="2023" className="custom-option">2023</option>
//         </select>
//         <select value={filterBySpaceType} onChange={(e) => handleFilterChange(e, setFilterBySpaceType)} className="p-2 border ml-2 custom-select">
//           <option value="" className="custom-option">All Types</option>
//           {spaceTypes.map((type) => (
//             <option key={type as string} value={type as string} className="custom-option">{type}</option>
//           ))}
//         </select>
//         <select value={filterByCountry} onChange={(e) => handleFilterChange(e, setFilterByCountry)} className="p-2 border ml-2 custom-select">
//           <option value="" className="custom-option">All Countries</option>
//           {countries.map((country) => (
//             <option key={country as string} value={country as string} className="custom-option">{country}</option>
//           ))}
//         </select>
//         <select value={filterByState} onChange={(e) => handleFilterChange(e, setFilterByState)} className="p-2 border ml-2 custom-select">
//           <option value="" className="custom-option">All States</option>
//           {states.map((state) => (
//             <option key={state as string} value={state as string} className="custom-option">{state}</option>
//           ))}
//         </select>
//         <select value={filterByDistrict} onChange={(e) => handleFilterChange(e, setFilterByDistrict)} className="p-2 border ml-2 custom-select">
//           <option value="" className="custom-option">All Districts</option>
//           {districts.map((district) => (
//             <option key={district as string} value={district as string} className="custom-option">{district}</option>
//           ))}
//         </select>
//         <select value={filterByAreaName} onChange={(e) => handleFilterChange(e, setFilterByAreaName)} className="p-2 border ml-2 custom-select">
//           <option value="" className="custom-option">All Areas</option>
//           {areaNames.map((areaName) => (
//             <option key={areaName as string} value={areaName as string} className="custom-option">{areaName}</option>
//           ))}
//         </select>
//       </div>
//       <div className="h-[500px] overflow-y-scroll scrollbar-hide p-2 mt-10 space-y-4">
//         {filteredSpaces.map((space: WorkSpace) => (
//           <CurrentSpaces key={space.id} space={space} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SpacesPage;


import React, { useEffect, useState, ChangeEvent } from 'react';
import './SpacePage.css';
import CurrentSpaces from '../../../component/provider/spaces/CurrentSpaces';
import { useMySpacesMutation } from '../../../slices/providerApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from "../../../app/store";

export interface WorkSpace {
  createdAt: Date;
  id: string;
  providerId: string;
  spaceName: string;
  spaceType: string;
  state: string;
  district: string;
  country: string;
  areaName: string;
  buildingName: string;
  description: string;
  floor: string;
  images: string[];
  chargePerHour: number;
  availableSpaces: number;
  isAccepted: boolean;
  contactNumber: string;
  facilities: string[];
  rentalAgreement: string;
  latitude: number;
  longitude: number;
}

const SpacesPage: React.FC = () => {
  const [spaces, setSpaces] = useState<WorkSpace[]>([]);
  const [fetchSpaces] = useMySpacesMutation();
  const { providerInfo } = useSelector((state: RootState) => state.auth);
  const providerID = providerInfo?._id;

  useEffect(() => {
    const fetchAndFilterSpaces = async () => {
      try {
        const response = await fetchSpaces("").unwrap();
        const acceptedSpaces = response.data.filter((space: WorkSpace) => space.isAccepted);
        const providerSpaces = acceptedSpaces.filter((space: WorkSpace) => space.providerId === providerID);
        setSpaces(providerSpaces);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    };

    fetchAndFilterSpaces();
  }, [fetchSpaces, providerID]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterByDate, setFilterByDate] = useState<string>('');
  const [filterBySpaceType, setFilterBySpaceType] = useState<string>('');
  const [filterByCountry, setFilterByCountry] = useState<string>('');
  const [filterByState, setFilterByState] = useState<string>('');
  const [filterByDistrict, setFilterByDistrict] = useState<string>('');
  const [filterByAreaName, setFilterByAreaName] = useState<string>('');
  const [filterByCharge] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>, filterSetter: React.Dispatch<React.SetStateAction<string>>) => filterSetter(e.target.value);

  const getUniqueValues = (array: WorkSpace[], key: keyof WorkSpace) => {
    return [...new Set(array.map(item => item[key]))];
  };

  const spaceTypes = getUniqueValues(spaces, 'spaceType');
  const countries = getUniqueValues(spaces, 'country');
  const states = getUniqueValues(spaces, 'state');
  const districts = getUniqueValues(spaces, 'district');
  const areaNames = getUniqueValues(spaces, 'areaName');

  const filteredSpaces = spaces.filter((space: WorkSpace) => {
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
          className="p-2 border"
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
            <option key={type as string} value={type as string} className="custom-option">{String(type)}</option>
          ))}
        </select>
        <select value={filterByCountry} onChange={(e) => handleFilterChange(e, setFilterByCountry)} className="p-2 border ml-2 custom-select">
          <option value="" className="custom-option">All Countries</option>
          {countries.map((country) => (
            <option key={country as string} value={country as string} className="custom-option">{String(country)}</option>
          ))}
        </select>
        <select value={filterByState} onChange={(e) => handleFilterChange(e, setFilterByState)} className="p-2 border ml-2 custom-select">
          <option value="" className="custom-option">All States</option>
          {states.map((state) => (
            <option key={state as string} value={state as string} className="custom-option">{String(state)}</option>
          ))}
        </select>
        <select value={filterByDistrict} onChange={(e) => handleFilterChange(e, setFilterByDistrict)} className="p-2 border ml-2 custom-select">
          <option value="" className="custom-option">All Districts</option>
          {districts.map((district) => (
            <option key={district as string} value={district as string} className="custom-option">{String(district)}</option>
          ))}
        </select>
        <select value={filterByAreaName} onChange={(e) => handleFilterChange(e, setFilterByAreaName)} className="p-2 border ml-2 custom-select">
          <option value="" className="custom-option">All Areas</option>
          {areaNames.map((areaName) => (
            <option key={areaName as string} value={areaName as string} className="custom-option">{String(areaName)}</option>
          ))}
        </select>
      </div>
      <div className="h-[500px] overflow-y-scroll scrollbar-hide p-2 mt-10 space-y-4">
        {filteredSpaces.map((space: WorkSpace) => (
          <CurrentSpaces key={space.id} space={space} />
        ))}
      </div>
    </div>
  );
};

export default SpacesPage;
