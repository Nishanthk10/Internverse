import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowLeft } from 'lucide-react';

const AssignmentView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const assignmentUrl = location.state?.assignmentUrl;

  if (!assignmentUrl) {
    return (
      <div className="min-h-screen bg-[#0F0721] text-white flex flex-col items-center justify-center">
        <Navbar onLogout={() => navigate('/')} /> {/* Assuming navigate('/') goes to a place where logout is handled or not needed */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-2xl font-bold mb-4">Assignment URL not found.</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/30 rounded-lg text-[#8b5cf6] font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0721] text-white flex flex-col">
       <Navbar onLogout={() => navigate('/')} /> {/* Assuming navigate('/') goes to a place where logout is handled or not needed */}

      <div className="flex-1 pt-20 flex flex-col">
         <div className="max-w-7xl mx-auto px-8 py-4 w-full">
             <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 mb-4 bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/30 rounded-lg text-[#8b5cf6] font-medium transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Course Dashboard
              </button>
            <h1 className="text-3xl font-bold mb-4">Assignment</h1>
         </div>

        <div className="flex-grow w-full max-w-7xl mx-auto px-8 pb-8">
           <iframe
             src={assignmentUrl}
             title="Assignment Notebook"
             className="w-full h-full rounded-lg border border-[#8b5cf6]/20"
             style={{ minHeight: '70vh' }}
           ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AssignmentView;