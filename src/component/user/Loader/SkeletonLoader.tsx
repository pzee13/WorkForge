

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
      {/* Image Container */}
      <div className="h-48 rounded-t dark:bg-gray-300"></div>

      {/* Details Container */}
      <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
        {/* Name */}
        <div className="w-full h-6 rounded dark:bg-gray-300"></div>
        
        {/* Type */}
        <div className="w-full h-6 rounded dark:bg-gray-300"></div>
        
        {/* Contact Number */}
        <div className="w-3/4 h-6 rounded dark:bg-gray-300"></div>
        
        {/* Booking Details */}
        <div className="pt-4 space-y-2">
          <div className="flex justify-between">
            <span></span>
            <span className="w-1/4 h-6 rounded dark:bg-gray-300"></span>
          </div>
          <div className="flex justify-between">
            <span></span>
            <span className="w-1/4 h-6 rounded dark:bg-gray-300"></span>
          </div>
          <div className="flex justify-between">
            <span>Move Out Time</span>
            <span className="w-1/4 h-6 rounded dark:bg-gray-300"></span>
          </div>
          <div className="flex justify-between">
            <span></span>
            <span>--</span>
          </div>
          <div className="flex justify-between">
            <span></span>
            <span>--</span>
          </div>
          <div className="flex justify-between">
            <span></span>
            <span>₹ --</span>
          </div>
          <div className="flex justify-between">
            <span></span>
            <span className="font-semibold"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
