import React from "react";

function LandingImage({ imageUrl }) {
  return (
    <div className="relative">
      {/* Image */}
      <img src={imageUrl} alt="Main Image" className="w-full h-820 object-cover" />
    </div>
  );
}

export default LandingImage;
