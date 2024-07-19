import React from 'react';
import RatedSpace from './RatedSpace'; // Adjust the import path as needed

interface Space {
    _id: string;
    images: string[];
    spaceName: string;
    description: string;
    areaName: string;
    chargePerHour: string;
    spaceType: string;
}

interface SpaceListProps {
    spaces: Space[];
}

const RatedSpaces: React.FC<SpaceListProps>  = ({ spaces }) => {
 
    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our Top Rated Spaces</h2>
                    <p className="mt-4 text-base font-normal leading-7 text-gray-600">Discover our highly-rated coworking spaces, carefully curated to provide the perfect environment for productivity and collaboration. Book your ideal workspace today and experience the best in comfort and convenience.</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
                    {spaces.map((space) => (
                        <RatedSpace key={space._id} space={space} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RatedSpaces;
