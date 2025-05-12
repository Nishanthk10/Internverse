import React from 'react';
import Navbar from '../components/Navbar';
import ProgressHeader from '../components/ProgressHeader';
import ActionButtons from '../components/ActionButtons';
import CourseList from '../components/CourseList';

interface LearnerDashboardProps {
  onLogout: () => void;
}

const LearnerDashboard: React.FC<LearnerDashboardProps> = ({ onLogout }) => {
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