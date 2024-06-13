import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ImageContainer = ({ images,loading }) => {

   

    if (!images || images.length === 0) {
        return <p>No images available</p>;
    }

    // Split the images into displayed images and carousel images
    const displayedImages = images.slice(0, 5);
    const carouselImages = images.slice(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <section className="py-6 mt-20 dark:bg-gray-50 dark:text-gray-900">
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden shadow-lg dark:bg-gray-500 h-96 rounded-lg">
                    <Slider {...settings} className="h-full">
                        {carouselImages.map((image, index) => (
                            <div key={index} className="w-full h-full ">
                                <img
                                    src={image}
                                    alt={`Carousel Image ${index}`}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                    <div className="grid grid-rows-2 gap-2 h-96">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="relative overflow-hidden shadow-sm dark:bg-gray-50 rounded-lg">
                                <img
                                    src={displayedImages[1]}
                                    alt="Image 1"
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                            <div className="relative overflow-hidden shadow-sm dark:bg-gray-50 rounded-lg">
                                <img
                                    src={displayedImages[2]}
                                    alt="Image 2"
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="relative overflow-hidden shadow-sm dark:bg-gray-50 rounded-lg">
                                <img
                                    src={displayedImages[3]}
                                    alt="Image 3"
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                            <div className="relative overflow-hidden shadow-sm dark:bg-gray-50 rounded-lg">
                                <img
                                    src={displayedImages[0]}
                                    alt="Image 4"
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImageContainer;
