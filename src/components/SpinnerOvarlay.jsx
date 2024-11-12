import React from 'react';
import Spinner from './Spinner';

const SpinnerOverlay = ({ message = 'Loading...', color = 'blue' }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Spinner size="lg" color={color} />
        <p className="text-white font-primary text-xl">{message}</p>
      </div>
    </div>
  );
};

export default SpinnerOverlay;