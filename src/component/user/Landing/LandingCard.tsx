
import { LandingCardProps } from "../../../types/Landing/Landing";

function LandingCard({ logo, heading, subtext }: LandingCardProps) {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 w-80 mt-10"> {/* Adjust width here */}
      {/* Logo */}
      {logo && <img src={logo} alt="Logo" className="w-16 mx-auto mb-6" />}

      {/* Heading */}
      <h2 className="text-xl font-bold text-center mb-5">{heading}</h2>

      {/* Subtext */}
      <p className="text-sm text-gray-600 text-center">{subtext}</p>
    </div>
  );
}

export default LandingCard;
