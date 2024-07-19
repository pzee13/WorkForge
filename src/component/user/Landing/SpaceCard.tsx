import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';

interface Space {
    id?: string;
    images: string[];
    spaceName: string;
    description: string;
    areaName: string;
    chargePerHour: number;
    spaceType: string;
}

interface SpaceCardProps {
    space: Space;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
    return (
        <div className="space-card">
            <div className="relative flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow w-60 md:w-80 h-96 group rounded-xl hover:shadow-lg hover:-translate-y-1">
                <a className="block h-48 w-full overflow-hidden">
                    <img
                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                        src={space.images[0]}
                        alt={space.spaceName}
                    />
                </a>
                <div className="flex-1 px-4 py-2 sm:p-4 overflow-hidden">
                
                        <div className="flex justify-between">
                            <p className="text-lg font-bold text-gray-900">{space.spaceName}</p>
                            
                            <p className="text-sm mt-1 font-bold text-customGreen"> <FontAwesomeIcon icon={faBuilding} className="mr-2" />{space.spaceType}</p>
                        </div>
                        <p className="mt-2 text-sm font-normal leading-6 text-gray-500 line-clamp-3">{space.description}</p>
                    
                </div>
                <div className="px-4 py-2 mt-auto border-t border-gray-100 sm:px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 h-5" />
                                    {space.areaName}
                                
                            </p>
                            <span className="text-sm font-medium text-gray-900">•</span>
                            <p className="text-sm font-medium text-gray-900">{space.chargePerHour}₹</p>
                        </div>
                        <a href="#" title="" className="" role="button">
                            <svg
                                className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <line x1="17" y1="7" x2="7" y2="17"></line>
                                <polyline points="8 7 17 7 17 16"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpaceCard;
