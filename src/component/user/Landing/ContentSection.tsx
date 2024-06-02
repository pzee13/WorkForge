import React from 'react';
import officeSpace from "../../../assets/images/office room.jpg";
import meetingRoom from "../../../assets/images/meeting room.jpg";
import trainingSpace from "../../../assets/images/Training room.jpg";
import deskSpace from "../../../assets/images/deslk.jpeg";

const ContentSections = ({ imageSrc, heading, paragraph, isReverse }) => {
  return (
    <div className={`flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row ${isReverse ? 'lg:flex-row-reverse' : ''}`}>
      <img src={imageSrc} alt="" className="h-80 dark:bg-gray-500 aspect-video" />
      <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-50">
        <span className="text-xs uppercase dark:text-gray-600">Join, it's free</span>
        <h3 className="text-3xl font-bold">{heading}</h3>
        <p className="my-6 dark:text-gray-600">{paragraph}</p>
        <button type="button" className="self-start">Action</button>
      </div>
    </div>
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
    <section className="p-4 lg:p-8 dark:bg-customGreen dark:text-gray-800">
      <div className="container mx-auto space-y-12">
        {sections.map((section, index) => (
          <ContentSections
            key={index}
            imageSrc={section.imageSrc}
            heading={section.heading}
            paragraph={section.paragraph}
            isReverse={section.isReverse}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentSection;
