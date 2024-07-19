import { SpaceTypeProps } from '../../../types/Landing/Landing';

function ImageTextCard({ imageUrl, text }: SpaceTypeProps) {
  return (
    <div className="relative flex items-center justify-center bg-gray-200 mt-10 mx-20"> 
      <div className="absolute inset-0 backdrop-filter backdrop-blur-md"></div> 
      <div className="z-10 bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row relative">
        <div className="w-full md:w-1/2">
          <img src={imageUrl} alt="Image" className="w-full h-auto shadow-xl" />
        </div>
        <div className="p-4 w-full md:w-1/2 flex items-center justify-center">
          <p className="text-3xl md:text-6xl font-semibold text-center text-shadow-xl font-lato text-black">{text}</p> 
        </div>
      </div>
    </div>
  );
}

export default ImageTextCard;
