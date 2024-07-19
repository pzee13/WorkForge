import { SpaceTypeProps } from "../../../types/Landing/Landing";

function SpaceTypeCard({ imageUrl, text }: SpaceTypeProps) {
  return (
    <div className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 rounded-lg m-2">
      {/* Image */}
      <img src={imageUrl} alt="Card" className="w-full h-auto rounded-lg" />

      {/* Text rectangle box */}
      <div className="absolute bottom-0 right-0  rounded-lg p-2 m-2 font-bold text-gray-700">
        {text}
      </div>
    </div>
  );
}

export default SpaceTypeCard;
