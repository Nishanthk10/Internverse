import React from 'react';

const Badge: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
      <span className="text-sm font-medium">{name}</span>
    </div>
  </div>
);

const Badges: React.FC = () => {
  return (
    <div className="px-6 mb-8">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold">BADGES</h2>
        <div className="flex gap-4">
          <Badge name="Python" />
          <Badge name="SQL" />
          <Badge name="Git" />
        </div>
      </div>
    </div>
  );
};

export default Badges;