import React from 'react';

const ProgressHeader: React.FC = () => {
  return (
    <div className="w-full px-6 py-8 bg-[#1A1043] border-b border-[#8b5cf6]/10 flex items-center justify-between">
      <h1 className="text-xl font-bold">Start leveling up and building your daily streak!</h1>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img 
              src="https://cdn.jsdelivr.net/gh/stackblitz/internverse-assets/fire.png" 
              alt="Streak" 
              className="w-8 h-8"
            />
            <span className="text-3xl font-bold text-orange-500">0</span>
          </div>
          <div>
            <span className="block text-xs text-[#8b5cf6]">DAILY</span>
            <span className="text-base font-bold">STREAK</span>
          </div>
        </div>
        <div>
          <span className="block text-xs text-[#8b5cf6]">PROGRESS</span>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">LEVEL 1</span>
            <div className="w-48 h-2 bg-[#8b5cf6]/10 rounded-full">
              <div className="w-1/4 h-full bg-[#8b5cf6] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;