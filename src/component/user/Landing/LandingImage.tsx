import { LandingImages } from "../../../types/Landing/Landing";

function LandingImage({image}:LandingImages) {
  return (
    <div className="relative ">
      {/* Image */}
      <img src={image} alt="Main Image" className="w-full h-96 object-fill " />
    </div>
  );
}

export default LandingImage;
