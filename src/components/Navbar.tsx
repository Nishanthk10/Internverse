import React, { useState, useRef, useEffect } from 'react';
import { Bell, LogOut, UserCircle, Loader2 } from 'lucide-react';
import logo from '../assets/Internverse Logo.png';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    onLogout();
  };

  useEffect(() => {
  const fetchUserName = async () => {
    const authId = localStorage.getItem('authId');
    const userType = localStorage.getItem('userType');
    const userDataRaw = localStorage.getItem('userData');

    if (!authId || !userType) {
      setUserName('User');
      setIsLoading(false);
      return;
    }

    // Admin shortcut
    if (userType === 'admin') {
      setUserName('Admin');
      setIsLoading(false);
      return;
    }

    // If userData already in localStorage
    if (userDataRaw) {
      try {
        const userData = JSON.parse(userDataRaw);
        setUserName(userData.name || 'User');
        setIsLoading(false);
        return;
      } catch (error) {
        console.error('Error parsing userData from localStorage:', error);
      }
    }

    // Fallback: Fetch from API
    try {
      const response = await fetch(`http://127.0.0.1:8000/dashboard/${userType}/${authId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      if (userType === 'intern') {
        localStorage.setItem('userData', JSON.stringify({
          name: data.name,
          streak: data.streak,
          progress_perc: data.progress_perc,
          python_button_status: data.python_button_status,
          sql_button_status: data.sql_button_status,
        }));
      } else if (userType === 'coordinator') {
        localStorage.setItem('userData', JSON.stringify({ name: data.name }));
      }

      setUserName(data.name || 'User');
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserName('User');
    } finally {
      setIsLoading(false);
    }
  };

  fetchUserName();
}, []);


  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-[#161042]/60 backdrop-blur-md shadow-xl border-b border-[#8b5cf6]/10 relative z-50">
      <div className="flex items-center gap-4">
        <img src={logo} alt="InternVerse Logo" className="w-8 h-8" />
        <span className="text-xl font-bold">InternVerse</span>
      </div>

      <div className="flex items-center gap-8">
        <a href="#" className="text-base hover:text-[#8b5cf6] transition-colors">COMMUNITY</a>
        <a href="#" className="text-base hover:text-[#8b5cf6] transition-colors">LEADERBOARD</a>

        <div className="flex items-center gap-4 relative z-50">
          <button className="p-2 hover:bg-[#8b5cf6]/10 rounded-full transition-colors">
            <Bell size={24} />
          </button>

          <div className="relative" ref={dropdownRef} style={{ zIndex: 9999 }}>
            <button
              className="flex items-center gap-2 hover:bg-[#8b5cf6]/10 p-2 rounded-lg transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-base">
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : userName}
              </span>
              <UserCircle size={32} strokeWidth={1.25} className="text-[#8b5cf6]" />
            </button>

            {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-[#161042] rounded-lg shadow-lg py-1 border border-[#8b5cf6]/20"
              style={{ zIndex: 999 }}
            >
              <button
                onClick={() => {
                  handleSignOut();
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
