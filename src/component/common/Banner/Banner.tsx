import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ heading, subheading1, subheading2, linkText, linkUrl, code }) => {
  return (
    <div className="p-6 py-12 dark:bg-secondGreen dark:text-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <h2 className="text-center text-6xl tracking-tighter font-bold">
            {heading.split('\n').map((text, index) => (
              <React.Fragment key={index}>
                {text}
                {index < heading.split('\n').length - 1 && <br className="sm:hidden" />}
              </React.Fragment>
            ))}
          </h2>
          <div className="space-x-2 text-center py-2 lg:py-0">
            <span>{subheading1}</span>
            <span className="font-bold text-lg">{code}</span>
            <span>{subheading2}</span>
          </div>
          <Link to={linkUrl} rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block dark:bg-gray-900 dark:text-gray-50 dark:border-gray-600">
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
