import Navbar from "../../../component/user/navbar/Navbar";
import LandingImage from "../../../component/user/Landing/LandingImage";
import landImage from "../../../assets/images/landinimage.jpg"
import LandingCard from "../../../component/user/Landing/LandingCard";
import workIcon from "../../../assets/images/working_141927.png";
import clock from "../../../assets/images/clock_2838773.png"
import assistance from "../../../assets/images/information_4444458.png"
import beverages from "../../../assets/images/beverages_2389011.png"
import SpaceTypeCard from "../../../component/user/Landing/SpaceTypeCard";
import officeImage from "../../../assets/images/office room.jpg"
import meetImage from "../../../assets/images/meeting room.jpg"
import trainImage from "../../../assets/images/Training room.jpg"
import deskImage from "../../../assets/images/deslk.jpeg"


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
                heading="Flexible Time"
                subtext="Description of Card 1"
                />
                {/* Second Card */}
                <LandingCard
                logo={workIcon}
                heading="Wide range of spaces"
                subtext="Description of Card 2"
                />
                {/* Third Card */}
                <LandingCard
                logo={beverages}
                heading="Unlimited beverages"
                subtext="Description of Card 3"
                />
                {/* Fourth Card */}
                <LandingCard
                logo={assistance}
                heading="24/7 assistance"
                subtext="Description of Card 4"
                />
            </div>
            <div className="flex justify-center items-center mt-20">
                <p className="text-5xl font-lato font-bold">Spaces we put forward to you</p>
            </div>
            <div className="flex justify-center items-center mt-4 mb-10">
                <p className="text-lg font-lato text-gray-600">We work with 500+ space owners to set workSpace in differnet parts of the world. We can help to find best working spaces for your needs.</p>
            </div>
            <div className="flex flex-wrap justify-center">
                {/* Top row */}
                <div className="flex justify-center space-x-4">
                    <SpaceTypeCard imageUrl={meetImage} text="Meeting room" />
                    <SpaceTypeCard imageUrl={deskImage} text="Desk Space" />
                </div>

                {/* Bottom row */}
                <div className="flex justify-center space-x-4">
                    <SpaceTypeCard imageUrl={trainImage} text="Training Room" />
                    <SpaceTypeCard imageUrl={officeImage} text="Office room" />
                </div>
            </div>
        </>
    )
}