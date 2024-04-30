import { RectangularComponentProps } from "../../../types/Landing/Landing";

function LandingPageCards({ headerText, subText, images }:RectangularComponentProps) {
    return (
      <div className="flex items-center">
        {/* Left side content */}
        <div className="flex flex-col">
          {images.slice(0, 2).map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} className="w-64 h-64 m-2" />
          ))}
        </div>
  
        <div className="flex flex-col">
          {images.slice(2).map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 3}`} className="w-64 h-64 m-2" />
          ))}
        </div>
        
  
        {/* Right side images */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{headerText}</h2>
          <p className="text-gray-600">{subText}</p>
        </div>
      </div>
    );
  }
  
  export default LandingPageCards;