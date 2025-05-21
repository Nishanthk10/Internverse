import React from 'react';
import { Bot, MessageSquare } from 'lucide-react';

const ActionButtons: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-6 my-6">
      <h2 className="text-xl font-bold">MY COURSE</h2>
      
      <div className="flex items-center gap-6">
        <button className="px-6 py-3 bg-gradient-to-r from-[#8b5cf6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] transition-all duration-300 rounded-full flex items-center gap-2 shadow-lg shadow-[#8b5cf6]/20">
          <Bot size={24} />
          <span className="text-sm font-semibold">BUDDY BOT</span>
        </button>
        <button className="px-6 py-3 border-2 border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/10 transition-all duration-300 rounded-full flex items-center gap-2">
          <MessageSquare size={24} />
          <span className="text-sm font-semibold">CHAT WITH LC</span>
        </button>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#8b5cf6]">BADGES</span>
          <div className="flex gap-3">
            <Badge name="PYTHON" />
            <Badge name="SQL" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Badge: React.FC<{ name: string }> = ({ name }) => {
  // Determine local asset path based on badge name
  const getAssetPath = (badgeName: string) => {
    switch (badgeName) {
      case 'PYTHON':
        return '/src/assets/Python-logo.png';
      case 'SQL':
        return '/src/assets/SQL-logo.png';
      default:
        return ''; // Or a default placeholder image
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 transition-all duration-300 flex items-center justify-center overflow-hidden">
        <img 
          src={getAssetPath(name)}
          alt={name}
          className="w-5 h-5 object-contain"
        />
      </div>
    </div>
  );
};

export default ActionButtons;