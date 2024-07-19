import React from 'react';
import { useLocation } from 'react-router-dom';
import {WorkSpace} from '../../../types/Spaces/space'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SpaceMap from "../../../component/common/Spaces/SpaceMap";
import editLogo from "../../../assets/images/edit.png"
import Notifications from "../../../component/chat/Notifications"
import officeImage from "../../../assets/images/office room.jpg";
import './SpacePageDetails.css'

const ImageSlider: React.FC<{ data: WorkSpace }> = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === data.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [data.images.length]);


 


  return (
    <div className="w-full h-64 mt-4">
      <img
        src={data.images[currentImageIndex]}
        alt={data.spaceName}
        className="w-full h-64 object-cover"
      />
    </div>
  );
};

const SpacePageDetails: React.FC = () => {
  const location = useLocation();
  const { data } = location.state as { data: WorkSpace };

  const imageUrls = [
    officeImage,
    officeImage,
    officeImage,
    officeImage,
    officeImage,
    officeImage,
    officeImage,
    officeImage,
    officeImage

];

  const totalMessages = imageUrls.length; // Example total number of user messages

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 ">
      <div className="mt-4 flex justify-between items-center">
        <div>
        <h1 className="text-3xl font-semibold">{data.spaceName}</h1>
        </div>
        <div>
        <div className="flex items-center justify-between gap-6">
      <Notifications imageUrls={imageUrls} totalMessages={totalMessages} />
      <button className="text-xl text-customGreen font-semibold flex items-center">
        Edit <img src={editLogo} alt="Edit Icon" className="ml-2 w-5 h-5" />
      </button>
    </div>
        </div>
        
      </div>
      
      <ImageSlider data={data} />
      <p className="mt-4">{data.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="px-2 py-1 text-xs  dark:bg-customGreen dark:text-gray-50">{data.spaceType}</span>
          <span className="text-xs ml-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 h-5" />
            {data.areaName}, {data.district}, {data.state}, {data.country}
          </span>
        </div>
        <span className="t text-black font-bold dark:text-black">
          Charge per hour: ₹{data.chargePerHour}
        </span>
      </div>
      {/* Add more details as necessary */}
      <div>
                        <SpaceMap
                            latitude={data.latitude}
                            longitude={data.longitude}
                        />
                    </div>
    </div>
  );
};

export default SpacePageDetails;