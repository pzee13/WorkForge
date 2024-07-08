import Navbar from "../../../component/provider/navbar/Navbar";
import PlandImage from '../../../assets/images/cowomen-ZKHksse8tUU-unsplash.jpg';
// import ImageTextCard from "../../../component/provider/Landing/ImageTextCard";
// import Expertise from '../../../assets/images/smartworks-coworking-cW4lLTavU80-unsplash.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import Instructions from '../../../assets/images/guide.png';
import { motion } from 'framer-motion';
import LandingPageCards from "../../../component/user/landing/LandingPageCards";
import imageA from '../../../assets/images/myhq-workspaces-Becc3eg9-l0-unsplash.jpg'
import imageB from '../../../assets/images/rodeo-project-management-software-PYqzYhTNjho-unsplash.jpg'
import imageC from '../../../assets/images/copernico-TSYQ5stQVjg-unsplash.jpg'
import imageD from '../../../assets/images/johanna-adriaansen-XfC8MMTiEfw-unsplash.jpg'
import SpaceCard from "../../../component/provider/landing/SpaceCard";
import officeSpace from "../../../assets/images/icons8-company-100.png"
import meetingRoom from "../../../assets/images/icons8-meeting-100.png"
import deskSpace from "../../../assets/images/icons8-desk-64.png"
import trainingSpace from "../../../assets/images/icons8-training-100.png"
import Footer from '../../../component/provider/footer/Footer'


const containerVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' }}
  };

export function LandingProvider() {
  return (
    <>
      <Navbar />
    
      <div className="relative">
        <img src={PlandImage} alt="Plan Image" />
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <p className="text-lg md:text-xl">Are you a Space owner?</p>
          <div className="flex items-center">
            <a href="#" className="text-4xl md:text-5xl font-italic text-green-500">Provide Space <FontAwesomeIcon icon={faHandPointRight} className="ml-2" /></a>
          </div>
        </div>
      </div>
      <div className="flex justify-center dark:bg-white">
                <div className="w-11/12 shadow-2xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}>

      <img src={Instructions} className="w-full h-auto mt-10" alt="Instructions" /> {/* Add responsive styling */}
      
      </motion.div>
      <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex justify-center mt-10" 
            >
                <LandingPageCards  headerText="Space of every shape,size and location"
                    subText="With over several locations all over india we have offices, coworking spaces, and meeting rooms in every major town, city, and transport hub.
                    Whether you work alone, you're growing a start-up, or you're running the world's most successful corporation our network makes it possible to work near clients, colleagues, or family.."
                    images={[imageA, imageB, imageC, imageD]}/>
      </motion.div>
      <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex justify-center" 
            >
                <div className="flex flex-col md:flex-row justify-around mt-8 md:mt-16 mb-20">
                        {/* First Card */}
                        <SpaceCard
                        logo={officeSpace}
                        heading="Office Space"
                        subtext="Description of Card 1"
                        />
                        {/* Second Card */}
                        <SpaceCard
                        logo={trainingSpace}
                        heading="Training Room"
                        subtext="Description of Card 2"
                        />
                        {/* Third Card */}
                        <SpaceCard
                        logo={meetingRoom}
                        heading="Meeting Room"
                        subtext="Description of Card 3"
                        />
                        {/* Fourth Card */}
                        <SpaceCard
                        logo={deskSpace}
                        heading="Desk Space"
                        subtext="Description of Card 4"
                        />
                </div>
            </motion.div>
            </div>
            </div>
            <Footer />
            
    </>
  );
}
