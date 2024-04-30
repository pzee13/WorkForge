import Navbar from "../../../component/user/navbar/Navbar";
import LandingImage from "../../../component/user/Landing/LandingImage";
import landImage from "../../../assets/images/landinimage.jpg";
import LandingCard from "../../../component/user/Landing/LandingCard";
import workIcon from "../../../assets/images/working_141927.png";
import clock from "../../../assets/images/clock_2838773.png";
import assistance from "../../../assets/images/information_4444458.png";
import beverages from "../../../assets/images/beverages_2389011.png";
import SpaceTypeCard from "../../../component/user/Landing/SpaceTypeCard";
import officeImage from "../../../assets/images/office room.jpg";
import meetImage from "../../../assets/images/meeting room.jpg";
import trainImage from "../../../assets/images/Training room.jpg";
import deskImage from "../../../assets/images/deslk.jpeg";
import officeSpace from "../../../assets/images/icons8-company-100.png"
import meetingRoom from "../../../assets/images/icons8-meeting-100.png"
import deskSpace from "../../../assets/images/icons8-desk-64.png"
import trainingSpace from "../../../assets/images/icons8-training-100.png"
import LandingPagecards from "../../../component/user/Landing/LandingPageCards";
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' }}
  };

export function Landing() {
   
  return (
    <>
      <Navbar />
      <LandingImage image={landImage} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}>
                <div className="flex justify-center items-center mt-8 md:mt-20">
                    <p className="text-3xl md:text-5xl font-lato font-bold">
                    Find a suitable place to work here
                    </p>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <p className="text-base md:text-lg font-lato text-gray-600">
                    There are over 1000+ workspaces ready to go for your taste
                    </p>
                </div>
      </motion.div>
      <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >
            <div className="flex flex-col md:flex-row justify-around mt-8 md:mt-16">
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
      </motion.div>
      <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >
                <div className="flex justify-center items-center mt-8 md:mt-20">
                    <p className="text-3xl md:text-5xl font-lato font-bold">
                    Spaces we put forward to you
                    </p>
                </div>
                <div className="flex justify-center items-center mt-4 mb-10">
                    <p className="text-base md:text-lg font-lato text-gray-600">
                    We work with 500+ space owners to set workSpace in different parts of
                    the world. We can help to find the best working spaces for your needs.
                    </p>
                </div>
      </motion.div>
      <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >
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
      </motion.div>
      <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >
                <div className="flex flex-col md:flex-row justify-around mt-8 md:mt-16 mb-20">
                        {/* First Card */}
                        <LandingCard
                        logo={officeSpace}
                        heading="Office Space"
                        subtext="Description of Card 1"
                        />
                        {/* Second Card */}
                        <LandingCard
                        logo={trainingSpace}
                        heading="Training Room"
                        subtext="Description of Card 2"
                        />
                        {/* Third Card */}
                        <LandingCard
                        logo={meetingRoom}
                        heading="Meeting Room"
                        subtext="Description of Card 3"
                        />
                        {/* Fourth Card */}
                        <LandingCard
                        logo={deskSpace}
                        heading="Desk Space"
                        subtext="Description of Card 4"
                        />
                </div>
      </motion.div>
      <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex justify-center" 
            >
                <LandingPagecards  headerText="Your Header Text"
                    subText="Your Subtext"
                    images={[officeImage, meetImage, trainImage, deskImage]}/>
      </motion.div>
    </>
  );
}
