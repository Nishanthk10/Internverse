import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProgressHeader from '../components/ProgressHeader';
import ActionButtons from '../components/ActionButtons';
import CourseList from '../components/CourseList';

interface LearnerDashboardProps {
  onLogout: () => void;
}

const LearnerDashboard: React.FC<LearnerDashboardProps> = ({ onLogout }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem('userData');
      const authId = localStorage.getItem('authId');
      const userType = localStorage.getItem('userType');

      if (userData) {
        setLoading(false);
        return;
      }

      if (!authId || !userType || userType !== 'intern') {
        console.warn('Missing or invalid authId/userType');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/dashboard/${userType}/${authId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const newUserData = {
          name: data.name,
          streak: data.streak,
          progress_perc: data.progress_perc,
          python_button_status: data.python_button_status,
          sql_button_status: data.sql_button_status,
          status: data.status,
        };

        localStorage.setItem('userData', JSON.stringify(newUserData));
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0F0721] text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0F0721] flex flex-col">
      {/* Background flares */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <Navbar onLogout={onLogout} />
        <ProgressHeader />
        <ActionButtons />
        <div className="flex-1 overflow-auto px-6">
          <CourseList />
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
