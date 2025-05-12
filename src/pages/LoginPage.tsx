import React from 'react';
import BrandingSection from '../components/BrandingSection';
import LoginForm from '../components/LoginForm';

interface LoginPageProps {
  onLogin: () => void;
  onAdminLogin: () => void;
  onCoordinatorLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onAdminLogin, onCoordinatorLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0721] to-[#1A1043] flex flex-col lg:flex-row relative overflow-hidden">
      {/* Decorative flares */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      {/* Left side: Branding */}
      <div className="lg:w-1/2 flex items-center justify-center py-12 lg:py-0 relative z-10">
        <BrandingSection />
      </div>
      
      {/* Right side: Login form */}
      <div className="lg:w-1/2 flex items-center justify-center relative z-10">
        <div className="w-full max-w-lg bg-[#161042]/60 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 m-4">
          <LoginForm onLogin={onLogin} onAdminLogin={onAdminLogin} onCoordinatorLogin={onCoordinatorLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;