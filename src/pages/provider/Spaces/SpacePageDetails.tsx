
import { useLocation } from 'react-router-dom';

const SpacePageDetails = () => {

  const location = useLocation();
  
  const { data } = location.state;



  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold">{data.spaceName}</h1>
      <img src={data.images[0]} alt={data.spaceName} className="w-full h-64 object-cover mt-4" />
      <p className="mt-4">{data.description}</p>
      <div className="mt-4">
        <span className="px-2 py-1 text-xs rounded-full dark:bg-customGreen dark:text-gray-50">{data.spaceType}</span>
        <span className="text-xs ml-4">{data.state}</span>
      </div>
      {/* Add more details as necessary */}
    </div>
  );
};

export default SpacePageDetails;
