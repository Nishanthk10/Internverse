import React from 'react';
import logo from '../assets/Internverse Logo.png';

const BrandingSection: React.FC = () => {
  return (
    <div className="flex flex-col justify-center h-full p-8 md:p-12 lg:p-16">
      <div className="flex items-center gap-4 mb-4 animate-fade-in-up">
        <img 
          src={logo} 
          alt="InternVerse Logo" 
          className="w-20 h-20"
        />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          InternVerse
        </h1>
      </div>
      <div className="mt-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight animate-fade-in-up animation-delay-200">
          Unlock Your <br className="hidden md:block" />
          Potential, Prove <br className="hidden md:block" />
          Your Impact Here
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-md animate-fade-in-up animation-delay-400">
          Take ownership of your growth and showcase your achievements.
        </p>
      </div>
    </div>
  );
};

export default BrandingSection;