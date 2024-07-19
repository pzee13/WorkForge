import React from 'react';

interface ImageGalleryProps {
  imageUrls: string[];
  totalMessages: number;
}

const Notifications: React.FC<ImageGalleryProps> = ({ imageUrls, totalMessages }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex -space-x-4 justify-center items-center ">
        Messages: 
        {imageUrls.slice(0, 4).map((url, index) => (
          <img
            key={index}
            alt=""
            className="w-8 h-8 border bg-base rounded-full "
            src={url}
          />
        ))}
        {imageUrls.length > 4 && (
          <span className="flex items-center justify-center w-8 h-8 font-extrabold border rounded-full dark:bg-gray-50 dark:text-red-800 dark:border-gray-300">
            +{totalMessages - 4}
          </span>
        )}
      </div>
    </div>
  );
};

export default Notifications;