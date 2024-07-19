import React from 'react';
import TypeCard from '../../../component/user/landing/TypeCard'
import { SpaceTypes} from "../../../types/spaces/spaceType"
import SpaceIcon from '../../../assets/images/LandingUser/coworking-space.png'


interface LandingPageCardProps {
    spaceTypes: SpaceTypes[];
}

const LandingPageCard: React.FC<LandingPageCardProps> = ({ spaceTypes }) => {
    return (
        <div className="relative bg-gray-50 shadow-md">
            <section className="relative bg-gray-50">
                <div className="absolute inset-0">
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50"></div>
                </div>
                <div className="relative mx-auto max-w-7xl bg-gray-50 lg:grid lg:grid-cols-2">
                    <div className="flex items-center px-4 pb-16 bg-gray-50  sm:px-6 lg:px-8 lg:pb-24 xl:pr-12">
                        <div className="max-w-lg mx-auto lg:mx-0">
                          
                            <img
                    className="inline w-auto h-20 sm:justify-center md:h-20 lg:h-32"
                    src={SpaceIcon}
                    alt="shape-1"
                  />
                            <h1 className="mt-10 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                            Spaces we put forward to you
                            </h1>
                            <p className="mt-6 text-base font-normal leading-7 text-gray-500">
                            We work with 500+ space owners to set workSpace in different parts of
                            the world. We can help to find the best working spaces for your needs.
                            </p>
                            <div className="relative inline-flex mt-10 group">
                                <div className="absolute transition-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
                                <a
                                    title=""
                                    className="inline-flex relative items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                    role="button"
                                >
                                   Explore
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex items-center px-4 py-16 bg-gray-50 sm:px-6 lg:pb-24 xl:pl-12">
                        <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
                            <p className="text-2xl font-bold text-darkGreen">Space Types we Offer</p>
                            <div className="mt-6 space-y-5">
                                {spaceTypes.map((spaceType, index) => (
                                        <TypeCard
                                            key={index}
                                            imageSrc={spaceType.imageSrc}
                                            heading={spaceType.heading}
                                            paragraph={spaceType.paragraph}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPageCard;