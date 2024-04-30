import Navbar from "../../../component/user/navbar/Navbar";
import LandingImage from "../../../component/user/Landing/LandingImage";
import landImage from "../../../assets/images/landinimage.jpg"
import LandingCard from "../../../component/user/Landing/LandingCard";
import workIcon from "../../../assets/images/working_141927.png";
import clock from "../../../assets/images/clock_2838773.png"
import assistance from "../../../assets/images/information_4444458.png"
import beverages from "../../../assets/images/beverages_2389011.png"



export function Landing(){


    return(
        <>
        <Navbar/>
        <LandingImage imageUrl={landImage} />
        <div className="flex justify-center items-center mt-20">
            <p className="text-5xl font-lato font-bold">Find a suitable place to work here</p>
        </div>
        <div className="flex justify-center items-center mt-4">
            <p className="text-lg font-lato text-gray-600">There are over 1000+ workspaces ready to go for your taste</p>
        </div>
        <div className="flex justify-around mt-8">
        {/* First Card */}
        <LandingCard
          logo={clock}
          heading="Card 1"
          subtext="Description of Card 1"
        />
        {/* Second Card */}
        <LandingCard
          logo={workIcon}
          heading="Card 2"
          subtext="Description of Card 2"
        />
        {/* Third Card */}
        <LandingCard
          logo={beverages}
          heading="Card 3"
          subtext="Description of Card 3"
        />
        {/* Fourth Card */}
        <LandingCard
          logo={assistance}
          heading="Card 4"
          subtext="Description of Card 4"
        />
      </div>
        </>
    )
}