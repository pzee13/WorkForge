
import { LandingCardProps } from "../../../types/Landing/Landing";
import './LandingCard.css'

function LandingCard({ logo, heading, subtext }: LandingCardProps) {
  return (
    <div className="  bg-opacity-50  rounded-lg  p-6 w-80"> {/* Adjust width here */}
      {/* Logo */}
      {logo && <img src={logo} alt="Logo" className="w-16 mx-auto  mb-8 card" />}

      {/* Heading */}
      <h2 className="text-xl font-bold text-center mb-5 dark:text-gray-50">{heading}</h2>

      {/* Subtext */}
      <p className="text-sm text-gray-300 text-center">{subtext}</p>
    </div>
   );
}
 
export default LandingCard;
