// import React from 'react';
// import { Link } from 'react-router-dom';

// function LandingImage({ image }: LandingImages) {
//   return (
//     <div className="relative py-12 bg-gray-900 sm:py-16 lg:py-20 xl:pt-32 xl:pb-44">
//       {/* Hidden image for large screens with gradient overlay */}
//       <div className="absolute inset-0 hidden lg:block">
//         <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent" />
//         <img
//           className="object-cover object-right-bottom w-full h-full"
//           src={image}
//           alt=""
//         />
//       </div>

//       {/* Content section */}
//       <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
//         <div className="max-w-xl mx-auto lg-shadow-2xl text-center lg:max-w-md xl:max-w-lg lg:text-left lg:mx-0">
//           <h1 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl xl:leading-tight">
//             Explore different Workspace with us that suits your comfort
//           </h1>
//           <p className="mt-8 text-base font-normal leading-7 text-white lg:max-w-md xl:pr-0 lg:pr-16">
//             From flexible desks to private offices, find spaces that cater to your professional requirements. Our comprehensive listings feature amenities such as high-speed internet, ergonomic furniture, and collaborative environments, ensuring you can focus on what matters most.
//           </p>

//           <div className="flex items-center justify-center mt-8 space-x-5 xl:mt-16 lg:justify-start">
//             <Link
//               to="/spaces"
//               title=""
//               className="
//                 inline-flex
//                 items-center
//                 justify-center
//                 px-3
//                 py-3
//                 text-base
//                 font-bold
//                 leading-7
//                 text-gray-900
//                 transition-all
//                 duration-200
//                 bg-white
//                 border border-transparent
//                 rounded-md
//                 sm:px-6
//                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
//                 hover:bg-gray-200
//               "
//               role="button"
//             >
//               Explore Spaces Now
//             </Link>

//             <a
//               href="#"
//               title=""
//               className="
//                 inline-flex
//                 items-center
//                 justify-center
//                 px-2
//                 py-3
//                 text-base
//                 font-bold
//                 leading-7
//                 text-white
//                 transition-all
//                 duration-200
//                 bg-transparent
//                 border border-transparent
//                 rounded-md
//                 sm:px-4
//                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-700
//                 hover:bg-gray-700
//               "
//               role="button"
//             >
//               Trending Spaces
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Visible image for small screens */}
//       <div className="mt-8 lg:hidden">
//         <img
//           className="object-cover w-full h-full"
//           src={image}
//           alt=""
//         />
//       </div>
//     </div>
//   );
// }

// export default LandingImage;


// import React from 'react';
// import { Link } from 'react-router-dom';

// function LandingImage({ image }) {
//   return (
//     <div className="relative py-12 bg-gray-900 sm:py-16 lg:py-20 xl:pt-32 xl:pb-44">
//       {/* Hidden image for large screens with gradient overlay */}
//       <div className="absolute inset-0 hidden lg:block">
//         <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent" />
//         <img
//           className="object-cover object-right-bottom w-full h-full"
//           src={image}
//           alt=""
//         />
//       </div>

//       {/* Content section */}
//       <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
//         <div className="max-w-xl mx-auto lg:max-w-md xl:max-w-lg lg:text-left lg:mx-0">
//           <h1 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl xl:leading-tight">
//             Explore different Workspace with us that suits your comfort
//           </h1>
//           <p className="mt-8 text-base font-normal leading-7 text-white lg:max-w-md xl:pr-0 lg:pr-16">
//             From flexible desks to private offices, find spaces that cater to your professional requirements. Our comprehensive listings feature amenities such as high-speed internet, ergonomic furniture, and collaborative environments, ensuring you can focus on what matters most.
//           </p>

//           <div className="flex items-center justify-center mt-8 space-x-5 xl:mt-16 lg:justify-start">
//             <Link
//               to="/spaces"
//               title=""
//               className="
//                 inline-flex
//                 items-center
//                 justify-center
//                 px-3
//                 py-3
//                 text-base
//                 font-bold
//                 leading-7
//                 text-gray-900
//                 transition-all
//                 duration-200
//                 bg-white
//                 border border-transparent
//                 rounded-md
//                 sm:px-6
//                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
//                 hover:bg-gray-200
//               "
//               role="button"
//             >
//               Explore Spaces Now
//             </Link>

//             <a
//               href="#"
//               title=""
//               className="
//                 inline-flex
//                 items-center
//                 justify-center
//                 px-2
//                 py-3
//                 text-base
//                 font-bold
//                 leading-7
//                 text-white
//                 transition-all
//                 duration-200
//                 bg-transparent
//                 border border-transparent
//                 rounded-md
//                 sm:px-4
//                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-700
//                 hover:bg-gray-700
//               "
//               role="button"
//             >
//               Trending Spaces
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Visible image for small screens */}
//       <div className="absolute inset-0 lg:hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent lg:hidden" />
//         <img
//           className="object-cover w-full h-full"
//           src={image}
//           alt=""
//         />
//       </div>
//     </div>
//   );
// }

// export default LandingImage;


// import React, { useState, useEffect } from 'react';
// import officeSpace from "../../../assets/images/LandingUser/img1.png";
// import { Link } from 'react-router-dom';

// function LandingImage({ image }) {
//   const [showRotatingImage, setShowRotatingImage] = useState(true);

//   // Function to toggle visibility of rotating image
//   const toggleRotatingImage = () => {
//     setShowRotatingImage(!showRotatingImage);
//   };

//   // Use useEffect to toggle the rotating image every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       toggleRotatingImage();
//     }, 3000); // Adjust the interval time as needed

//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <div className="relative py-12 bg-gray-900 sm:py-16 lg:py-20 xl:pt-32 xl:pb-44">
//       {/* Hidden image for large screens with gradient overlay */}
//       <div className="relative h-full overflow-hidden lg:hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent" />
//         <img
//           className="object-cover w-full h-full"
//           src={image}
//           alt=""
//         />
//       </div>

//       {/* Content and animation section */}
//       <div className="relative flex items-center px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
//         {/* Animation on the right side */}
//         <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-1/3 lg:w-1/2 xl:w-1/3">

//         {showRotatingImage && (
//             <img
//               className="absolute w-12 h-12 transform rotate-45 transition duration-1000 ease-in-out"
//               style={{ opacity: showRotatingImage ? 1 : 0 }}
//               src={officeSpace}
//               alt="Rotating Image"
//             />
//           )}
//           <div className="absolute w-20 h-20 bg-white rounded-full animate-pulse opacity-75"></div>
//           <div className="absolute w-16 h-16 bg-white rounded-full animate-pulse opacity-50"></div>
//           <div className="absolute w-12 h-12 bg-white rounded-full animate-pulse opacity-25"></div>
//         </div>

//         {/* Content section */}
//         <div className="relative z-10 max-w-xl mx-auto lg:max-w-md xl:max-w-lg lg:text-left lg:mx-0">
//           <h1 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl xl:leading-tight">
//             Explore different Workspace with us that suits your comfort
//           </h1>
//           <p className="mt-8 text-base font-normal leading-7 text-white lg:max-w-md xl:pr-0 lg:pr-16">
//             From flexible desks to private offices, find spaces that cater to your professional requirements. Our comprehensive listings feature amenities such as high-speed internet, ergonomic furniture, and collaborative environments, ensuring you can focus on what matters most.
//           </p>

//           <div className="flex items-center justify-center mt-8 space-x-5 xl:mt-16 lg:justify-start">
//             <Link
//               to="/spaces"
//               title=""
//               className="
//                 inline-flex
//                 items-center
//                 justify-center
//                 px-3
//                 py-3
//                 text-base
//                 font-bold
//                 leading-7
//                 text-gray-900
//                 transition-all
//                 duration-200
//                 bg-white
//                 border border-transparent
//                 rounded-md
//                 sm:px-6
//                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
//                 hover:bg-gray-200
//               "
//               role="button"
//             >
//               Explore Spaces Now
//             </Link>

//             <a
//               href="#"
//               title=""
//               className="
//                 inline-flex
//                 items-center
//                 justify-center
//                 px-2
//                 py-3
//                 text-base
//                 font-bold
//                 leading-7
//                 text-white
//                 transition-all
//                 duration-200
//                 bg-transparent
//                 border border-transparent
//                 rounded-md
//                 sm:px-4
//                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-700
//                 hover:bg-gray-700
//               "
//               role="button"
//             >
//               Trending Spaces
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Visible image for large screens */}
//       <div className="absolute inset-0 hidden lg:block">
//         <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent" />
//         <img
//           className="object-cover object-right-bottom w-full h-full"
//           src={image}
//           alt=""
//         />
//       </div>
//     </div>
//   );
// }

// export default LandingImage;


import React, { useState, useEffect } from 'react';
import officeSpace from "../../../assets/images/LandingUser/image.png";
import deskSpace from '../../../assets/images/LandingUser/image2.png';
import { Link } from 'react-router-dom';

function LandingImage({ image }) {
  const [showOfficeSpace, setShowOfficeSpace] = useState(true);

  // Function to toggle between officeSpace and deskSpace
  const toggleImages = () => {
    setShowOfficeSpace((prev) => !prev);
  };

  // Use useEffect to toggle images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      toggleImages();
    }, 2500); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-12 bg-gray-900 sm:py-16 lg:py-20 xl:pt-32 xl:pb-44">
      {/* Hidden image for large screens with gradient overlay */}
      <div className="relative h-full overflow-hidden lg:hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent" />
        <img
          className="object-cover w-full h-full"
          src={image}
          alt=""
        />
      </div>

      {/* Animation section */}
      <div className="relative flex items-center px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Content section */}
        <div className="relative z-10 max-w-xl mx-auto lg:max-w-md xl:max-w-lg lg:text-left lg:mx-0">
          <h1 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl xl:leading-tight">
            <span className=" shadow-2xl font-bold text-green-500">Explore</span>  different Workspace with us that suits your comfort
          </h1>
          <p className="mt-8 text-base font-normal leading-7 text-white lg:max-w-md xl:pr-0 lg:pr-16">
            From flexible desks to private offices, find spaces that cater to your professional requirements. Our comprehensive listings feature amenities such as high-speed internet, ergonomic furniture, and collaborative environments, ensuring you can focus on what matters most.
          </p>

          <div className="flex items-center justify-center mt-8 space-x-5 xl:mt-16 lg:justify-start">
            <Link
              to="/spaces"
              title=""
              className="
                inline-flex
                items-center
                justify-center
                px-3
                py-3
                text-base
                font-bold
                leading-7
                text-gray-900
                transition-all
                duration-200
                bg-white
                border border-transparent
                rounded-md
                sm:px-6
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
                hover:bg-gray-200
              "
              role="button"
            >
              Explore Spaces Now
            </Link>

            <a
              href="#"
              title=""
              className="
                inline-flex
                items-center
                justify-center
                px-2
                py-3
                text-base
                font-bold
                leading-7
                text-white
                transition-all
                duration-200
                bg-transparent
                border border-transparent
                rounded-md
                sm:px-4
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-700
                hover:bg-customGreen
              "
              role="button"
            >
              Trending Spaces
            </a>
          </div>
        </div>

        
        {/* Animation on the right side */}
        <div className="absolute z-10 right-0 top-0 bottom-0 flex items-center justify-center w-1/3 lg:w-1/2 xl:w-1/3">
          {/* Rotating image */}
          <div className="absolute top-8 left-0 flex items-center space-x-2 top-32">
            <h1 className="text-6xl shadow-2xl font-bold text-green-500">Different</h1>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold text-green-100">Spaces</span>
              <span className="text-5xl font-bold text-white">Places</span>
            </div>
          </div>
          <div className="relative mt-16"> {/* Add margin to push image down */}
            <img
              className="w-96 h-96 transition-transform duration-900 ease-in-out"
              style={{ transform: showOfficeSpace ? 'scale(1)' : 'scale(0.95)' }}
              src={showOfficeSpace ? officeSpace : deskSpace}
              alt="Workspace Image"
            />
          </div>
        </div>
      </div>

      {/* Visible image for large screens */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent" />
        <img
          className="object-cover object-right-bottom w-full h-full"
          src={image}
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>
  );
}

export default LandingImage;



