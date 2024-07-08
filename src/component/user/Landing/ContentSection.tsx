import React from 'react';
import { motion } from 'framer-motion';
import officeSpace from "../../../assets/images/office room.jpg";
import meetingRoom from "../../../assets/images/meeting room.jpg";
import trainingSpace from "../../../assets/images/Training room.jpg";
import deskSpace from "../../../assets/images/deskSpace.jpg";
import './ContentSection.css'; // Import CSS file for styling

const ContentSections = ({ imageSrc, heading, paragraph, isReverse, animationDelay, index }) => {
  const variants = {
    hidden: {
      x: -1000 , // Even indexes slide in from left, odd from right
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: animationDelay,
        duration: 3,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={`flex flex-col overflow-hidden rounded-md shadow-2xl lg:flex-row ${isReverse ? 'lg:flex-row-reverse' : ''}`}
    >
      <img src={imageSrc} alt="" className="h-80 dark:bg-gray-500 bg-gradient-to-t shadow-2xl aspect-video" />
      <div className="flex flex-col justify-center  flex-1 p-6 bg-gray-50 ">
        <span className="text-xs uppercase dark:text-white">Join, it's free</span>
        <h3 className="text-3xl font-bold text-customGreen">{heading}</h3>
        <p className="my-6 dark:text-customGreen">{paragraph}</p>
        <button type="button" className="self-start text-white">Action</button>
      </div>
    </motion.div>
  );
};

const ContentSection = () => {
  const sections = [
    {
      imageSrc: officeSpace,
      heading: "Office Space",
      paragraph: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquam possimus quas, error esse quos.',
      isReverse: false,
    },
    {
      imageSrc: meetingRoom,
      heading: "Meeting Room",
      paragraph: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquam possimus quas, error esse quos.',
      isReverse: true,
    },
    {
      imageSrc: deskSpace,
      heading: "Desk Space",
      paragraph: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquam possimus quas, error esse quos.',
      isReverse: false,
    },
    {
      imageSrc: trainingSpace,
      heading: "Training Space",
      paragraph: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquam possimus quas, error esse quos.',
      isReverse: true,
    },
  ];

  return (
    <section className="p-4 lg:p-8  bg-opacity-50 dark:text-gray-800 shadow-5xl">
      <div className="container mx-auto space-y-12 shadow-5xl">
        {sections.map((section, index) => (
          <ContentSections
            key={index}
            imageSrc={section.imageSrc}
            heading={section.heading}
            paragraph={section.paragraph}
            isReverse={section.isReverse}
            animationDelay={index * 2} // Adjust the delay as needed
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentSection;
