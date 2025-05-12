import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';

interface Unit {
  id: number;
  title: string;
  description: string;
  labDescription: string;
}

interface PythonCourseProps {
  onLogout: () => void;
}

const units: Unit[] = [
  {
    id: 1,
    title: 'Getting Started with Python',
    description: 'Exploring the Python language and its extensive libraries offers a chance to revolutionize skill development. By actively using its features and modules, we can discover how to build hands-on, tailored, interactive, captivating experiences that foster thorough comprehension of coding principles.',
    labDescription: 'Practice writing your first Python program and explore basic syntax through interactive exercises. You\'ll learn about printing output, basic arithmetic operations, and how to run Python scripts.'
  },
  {
    id: 2,
    title: 'Datatypes, Variable and Functions',
    description: 'Dive deep into Python\'s core building blocks. Learn how to work with different data types, create and manipulate variables, and build reusable functions. This unit provides the foundation for writing efficient and maintainable Python code.',
    labDescription: 'Get hands-on experience with Python\'s data types by creating variables, writing functions, and solving real-world problems. You\'ll build multiple mini-programs to reinforce your understanding.'
  },
  {
    id: 3,
    title: 'Control Flow and Loops',
    description: 'Master the art of controlling program flow with conditional statements and loops. Learn how to make decisions in your code, iterate over data structures, and create dynamic programs that can handle various scenarios and process data efficiently.',
    labDescription: 'Work through practical exercises involving if statements, for loops, and while loops. You\'ll create programs that make decisions and process data using different control structures.'
  }
];

const PythonCourse: React.FC<PythonCourseProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const currentUnitId = parseInt(unitId || '1', 10);
  const currentUnit = units.find(unit => unit.id === currentUnitId);

  const handleUnitClick = (id: number) => {
    navigate(`/course/python/unit/${id}`);
  };

  const handleLabStart = () => {
    navigate(`/course/python/lab/${currentUnitId}`);
  };

  if (!currentUnit) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0F0721] flex flex-col">
      {/* Background flares */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} />
        
        <div className="flex flex-1">
          {/* Left sidebar */}
          <div className="w-72 bg-[#161042]/60 backdrop-blur-sm p-6">
            <div className="mb-6">
              <h1 className="text-xl font-bold mb-2">PYTHON COURSE</h1>
              <p className="text-sm text-gray-400">5 UNITS</p>
            </div>
            
            <div className="space-y-4">
              {units.map((unit) => (
                <div
                  key={unit.id}
                  onClick={() => handleUnitClick(unit.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    unit.id === currentUnitId
                      ? 'bg-[#8B5CF6] text-white'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="text-sm text-gray-400 mb-1">UNIT {unit.id}</div>
                  <div className="font-medium">{unit.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Unit {currentUnit.id}: {currentUnit.title}</h2>
              
              {/* About section */}
              <div className="bg-[#161042]/60 backdrop-blur-sm rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">About this unit</h3>
                <p className="text-gray-300 leading-relaxed">
                  {currentUnit.description}
                </p>
              </div>

              {/* Quiz section */}
              <div className="bg-[#161042]/60 backdrop-blur-sm rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Quiz</h3>
                <p className="text-gray-300 mb-6">
                  Review the unit materials thoroughly, and then click the 'Start' button when you're ready for the quiz. Good luck!
                </p>
                <button className="px-8 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-full font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20">
                  START
                </button>
              </div>

              {/* Lab section */}
              <div className="bg-[#161042]/60 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Lab</h3>
                <p className="text-gray-300 mb-6">
                  {currentUnit.labDescription}
                </p>
                <button 
                  onClick={handleLabStart}
                  className="px-8 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-full font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20"
                >
                  START
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonCourse;