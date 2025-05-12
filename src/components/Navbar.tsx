import React, { useState, useRef, useEffect } from 'react';
import { Bell, LogOut, UserCircle } from 'lucide-react';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-[#161042]/60 backdrop-blur-sm border-b border-[#8b5cf6]/10">
      <div className="flex items-center gap-4">
        <img 
          src="https://cdn.jsdelivr.net/gh/stackblitz/internverse-assets/logo-white.png" 
          alt="InternVerse Logo" 
          className="w-8 h-8"
        />
        <span className="text-xl font-bold">InternVerse</span>
      </div>
      
      <div className="flex items-center gap-8">
        <a href="#" className="text-base hover:text-[#8b5cf6] transition-colors">COMMUNITY</a>
        <a href="#" className="text-base hover:text-[#8b5cf6] transition-colors">LEADERBOARD</a>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#8b5cf6]/10 rounded-full transition-colors">
            <Bell size={24} />
          </button>
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center gap-2 hover:bg-[#8b5cf6]/10 p-2 rounded-lg transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-base">jdoe</span>
              <UserCircle size={32} strokeWidth={1.25} className="text-[#8b5cf6]" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#161042] rounded-lg shadow-lg py-1 z-50 border border-[#8b5cf6]/20">
                <button
                  onClick={() => {
                    onLogout();
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-[#8b5cf6]/10 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;