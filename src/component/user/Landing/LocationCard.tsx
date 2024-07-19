import React from 'react';

type LocattionCardProps = {
    imageUrl: string;

    title: string;
   
};

const LocationCard: React.FC<LocattionCardProps> = ({ imageUrl, title }) => {
    return (
        <div className="relative snap-center scroll-ml-6 shrink-0  first:pl-6 last:pr-6">
            <div className="overflow-hidden w-[300px] lg:w-[260px]  transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                <div className="px-4 py-5 sm:p-5 bg-gray-50">
                    <div className="flex items-start lg:items-center">
                        <a  title={title} className="shrink-0">
                            <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"  src={imageUrl} alt={title} />
                        </a>

                        <div className="flex-1 ml-4 lg:ml-6">
                           
                            <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                                <a  title={title} className="">
                                    {title}
                                </a>
                            </p>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationCard;
