import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CourseProps {
  icon: string;
  name: string;
  status: 'continue' | 'start';
}

const Course: React.FC<CourseProps> = ({ icon, name, status }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    if (name === 'PYTHON') {
      navigate('/course/python/unit/1');
    }
  };

  return (
    <div className="flex items-center justify-between mb-6 p-4 rounded-lg hover:bg-[#8b5cf6]/5 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-[#8b5cf6]/20 flex items-center justify-center overflow-hidden">
          <img 
            src={`https://cdn.jsdelivr.net/gh/stackblitz/internverse-assets/${name.toLowerCase()}-logo.png`}
            alt={name}
            className="w-10 h-10 object-contain"
          />
        </div>
        <span className="text-base font-bold">{name}</span>
      </div>
      <button 
        onClick={handleCourseClick}
        className={`w-32 px-6 py-3 rounded-full text-sm font-semibold ${
          status === 'continue' 
            ? 'border-2 border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/10' 
            : 'bg-gradient-to-r from-[#8b5cf6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] shadow-lg shadow-[#8b5cf6]/20'
        } transition-all duration-300`}
      >
        {status === 'continue' ? 'CONTINUE' : 'START'}
      </button>
    </div>
  );
};

const CourseList: React.FC = () => {
  return (
    <div>
      <div>
        <Course icon="🐍" name="PYTHON" status="continue" />
        <Course icon="SQL" name="SQL" status="start" />
        <Course icon="GIT" name="GIT" status="start" />
      </div>
    </div>
  );
};

export default CourseList;