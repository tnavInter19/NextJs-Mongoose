import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="relative inline-block">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
        </div>
        <p className="mt-4 font-medium text-center">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
