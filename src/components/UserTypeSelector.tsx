import React from 'react';
import { GraduationCap, Users, ShieldCheck } from 'lucide-react';

export type UserType = 'intern' | 'coordinator' | 'admin';

interface UserTypeSelectorProps {
  selectedType: UserType;
  onSelectType: (type: UserType) => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="flex justify-center space-x-4 md:space-x-8 mb-8">
      <UserTypeOption
        type="intern"
        label="Intern"
        icon={<GraduationCap className="w-6 h-6" />}
        isSelected={selectedType === 'intern'}
        onClick={() => onSelectType('intern')}
      />
      <UserTypeOption
        type="coordinator"
        label="Coordinator"
        icon={<Users className="w-6 h-6" />}
        isSelected={selectedType === 'coordinator'}
        onClick={() => onSelectType('coordinator')}
      />
      <UserTypeOption
        type="admin"
        label="Admin"
        icon={<ShieldCheck className="w-6 h-6" />}
        isSelected={selectedType === 'admin'}
        onClick={() => onSelectType('admin')}
      />
    </div>
  );
};

interface UserTypeOptionProps {
  type: UserType;
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const UserTypeOption: React.FC<UserTypeOptionProps> = ({
  label,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer transition-all duration-300 transform ${
        isSelected 
          ? 'text-[#8b5cf6] scale-105' 
          : 'text-gray-400 hover:text-gray-200'
      }`}
      onClick={onClick}
    >
      <div 
        className={`flex items-center justify-center w-12 h-12 mb-2 rounded-full ${
          isSelected 
            ? 'bg-[#8b5cf6]/20 border-2 border-[#8b5cf6]' 
            : 'bg-gray-900/30 hover:bg-[#8b5cf6]/10'
        }`}
      >
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default UserTypeSelector;