import { useState } from 'react';
import './SearchComponent.css'

function SearchComponent() {
  // States for selected location, date, and type of space
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [spaceType, setSpaceType] = useState('');

  // Function to handle search submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search submitted:', { location, date, spaceType });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 form-container">
        {/* Location input */}
        <div className="flex items-center">
          <label htmlFor="location" className='text-white'>Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            placeholder='Enter location'
            onChange={(e) => setLocation(e.target.value)}
            className="ml-2 border border-solid border-gray-900 rounded-md "
          />
        </div>

        {/* Date input */}
        <div className="flex items-center">
          <label htmlFor="date" className='text-white'>Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="ml-2 rounded-md"
          />
        </div>

        {/* Type of Space input */}
        <div className="flex items-center">
          <label htmlFor="spaceType" className='text-white'>Type of Space:</label>
          <select
            id="spaceType"
            value={spaceType}
            onChange={(e) => setSpaceType(e.target.value)}
            className="ml-2 rounded-md"
          >
            <option value="">Select</option>
            <option value="office">Office</option>
            <option value="meeting">Meeting Room</option>
            <option value="event">Event Space</option>
          </select>
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-center"> {/* Added this div */}
          <button type="submit" className="search-button text-white px-4 py-2 rounded-lg">Search</button>
        </div>
        
       
      </form>
    </div>
  );
}

export default SearchComponent;
