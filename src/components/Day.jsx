import React from 'react';

const HowDay = () => {
  return (
    <div className="flex flex-col italic pt-2 items-center space-y-4">
      <h2 className="text-lg italic font-semibold">how was your day </h2>
      <div className="flex space-x-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            value="happy"
            className="form-radio text-yellow-500 h-5 w-5"
          />
          <span className="ml-2 text-gray-700">good </span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            value="sad"
            className="form-radio text-blue-500 h-5 w-5"
          />
          <span className="ml-2 text-gray-700">bad</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            value="neutral"
            className="form-radio text-gray-500 h-5 w-5"
          />
          <span className="ml-2 text-gray-700">Neutral</span>
        </label>
      </div>
    </div>
  );
};

export default HowDay;
