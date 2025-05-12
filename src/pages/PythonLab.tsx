import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface PythonLabProps {
  onLogout: () => void;
}

const PythonLab: React.FC<PythonLabProps> = ({ onLogout }) => {
  const { unitId } = useParams();

  return (
    <div className="min-h-screen bg-[#0F0721] flex flex-col">
      {/* Background flares */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} />
        
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#161042]/60 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Python Lab - Unit {unitId}</h2>
              
              <iframe
                src="https://jupyter.org/try-jupyter/lab/"
                width="100%"
                height="800px"
                className="rounded-lg bg-white"
                style={{ border: 'none' }}
                title={`Python Lab - Unit ${unitId}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonLab;