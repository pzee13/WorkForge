import { RectangularComponentProps } from "../../../types/Landing/Landing";
import './LandingPageCards.css'


function LandingPageCards({ headerText, subText, images }: RectangularComponentProps) {
  return (
    <div className="flex items-center landing-card">
      {/* Left side content */}
      <div className="flex flex-col ">
        {images.slice(0, 2).map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} className="w-full h-64 m-2" />
        ))}
      </div>

      <div className="flex flex-col ">
        {images.slice(2).map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 3}`} className="w-full h-64 m-2" />
        ))}
      </div>

      {/* Right side text */}
      <div className="p-4 w-1/2">
        <h2 className="text-6xl font-semibold mb-2">{headerText}</h2>
        <p className="text-gray-600">{subText}</p>
      </div>
    </div>
  );
}

  export default LandingPageCards;