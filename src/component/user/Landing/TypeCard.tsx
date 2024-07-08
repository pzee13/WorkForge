import React from 'react';


export interface SpaceTypes {
    imageSrc: string;
    heading: string;
    paragraph: string;
   
  }


const TypeCard: React.FC<SpaceTypes> = ({ imageSrc, heading, paragraph }) => {
  return (
    <div className="overflow-hidden transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
      <div className="px-4 py-5 sm:p-5">
        <div className="flex items-start lg:items-center">
          <a href="#" title="" className="shrink-0">
            <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover" src={imageSrc} />
          </a>
          <div className="flex-1 ml-4 lg:ml-6">
           
            <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
             
                {heading}
          
            </p>
            <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
              {paragraph}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeCard;