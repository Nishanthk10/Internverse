import React, { useState } from 'react';
import { Users, ClipboardList, MessageSquareQuote } from 'lucide-react';
import Navbar from '../components/Navbar';
import InternSummary from './InternSummary';
import MyInterns from './MyInterns';

interface CoordinatorDashboardProps {
  onLogout: () => void;
}

const CoordinatorDashboard: React.FC<CoordinatorDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'myInterns' | 'internSummary' | 'submitFeedback'>('myInterns');

  return (
    <div className="min-h-screen bg-[#0F0721] flex flex-col">
      {/* Background flares */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} />

        <div className="flex flex-1">
          {/* Left sidebar - Menu */}
          <div className="w-56 bg-[#161042]/60 backdrop-blur-sm p-4">
            <h2 className="text-base font-bold mb-4">MENU</h2>
            <div className="space-y-2">
              <button 
                onClick={() => setActiveTab('myInterns')}
                className={`w-full px-3 py-2 text-sm flex items-center gap-2 rounded-lg transition-colors ${
                  activeTab === 'myInterns' ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <Users size={16} />
                My Interns
              </button>
              <button 
                onClick={() => setActiveTab('internSummary')}
                className={`w-full px-3 py-2 text-sm flex items-center gap-2 rounded-lg transition-colors ${
                  activeTab === 'internSummary' ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <ClipboardList size={16} />
                Intern Summary
              </button>
              <button 
                onClick={() => setActiveTab('submitFeedback')}
                className={`w-full px-3 py-2 text-sm flex items-center gap-2 rounded-lg transition-colors ${
                  activeTab === 'submitFeedback' ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <MessageSquareQuote size={16} />
                Submit Feedback
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6">
            {activeTab === 'myInterns' && <MyInterns />}
            {activeTab === 'internSummary' && <InternSummary />}
            {activeTab === 'submitFeedback' && (
              <div className="max-w-6xl mx-auto">
                <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg p-6 border border-[#8b5cf6]/20">
                  <h2 className="text-xl font-bold mb-6">Submit Feedback</h2>
                  <p>Feedback form coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;