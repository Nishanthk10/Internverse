import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, UserPlus } from 'lucide-react';
import Navbar from './Navbar';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
                onClick={() => navigate('/')}
                className={`w-full px-3 py-2 text-sm flex items-center gap-2 rounded-lg transition-colors ${
                  location.pathname === '/' ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/admin/users')}
                className={`w-full px-3 py-2 text-sm flex items-center gap-2 rounded-lg transition-colors ${
                  location.pathname === '/admin/users' ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <Users size={16} />
                Manage Users
              </button>
              <button 
                onClick={() => navigate('/admin/assign-coordinator')}
                className={`w-full px-3 py-2 text-sm flex items-center gap-2 rounded-lg transition-colors ${
                  location.pathname === '/admin/assign-coordinator' ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <UserPlus size={16} />
                Assign Coordinator
              </button>
              <button className="w-full px-3 py-2 text-sm flex items-center gap-2 rounded-lg hover:bg-white/5 transition-colors">
                <BarChart3 size={16} />
                View Reports
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;