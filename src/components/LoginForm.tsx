import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import UserTypeSelector, { UserType } from './UserTypeSelector';

interface LoginFormProps {
  onLogin: () => void;
  onAdminLogin: () => void;
  onCoordinatorLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onAdminLogin, onCoordinatorLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('learner');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (userType === 'admin' && username === 'admin' && password === 'admin') {
      onAdminLogin();
    } else if (userType === 'coordinator' && username === 'lc' && password === 'lc') {
      onCoordinatorLogin();
    } else if (userType === 'learner' && username === 'test' && password === 'test') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="w-full max-w-md px-6 py-8 animate-fade-in">
      <UserTypeSelector 
        selectedType={userType} 
        onSelectType={setUserType} 
      />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8b5cf6]">
            <User size={20} />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="bg-gray-900/30 focus:ring-2 focus:ring-[#8b5cf6] text-white placeholder-gray-400 w-full pl-10 pr-4 py-3 rounded-lg border border-[#8b5cf6]/20 focus:outline-none transition-all duration-300"
            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8b5cf6]">
            <Lock size={20} />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-gray-900/30 focus:ring-2 focus:ring-[#8b5cf6] text-white placeholder-gray-400 w-full pl-10 pr-4 py-3 rounded-lg border border-[#8b5cf6]/20 focus:outline-none transition-all duration-300"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex justify-end">
          <a href="#" className="text-sm text-[#8b5cf6] hover:text-[#7C3AED] transition-colors duration-300">
            Forgot password?
          </a>
        </div>
        
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#8b5cf6] hover:bg-[#7C3AED] focus:ring-4 focus:ring-[#8b5cf6]/50 text-white font-medium rounded-lg transition-all duration-300 transform hover:translate-y-[-2px]"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;