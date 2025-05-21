import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Lock, Unlock, Upload, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

interface Unit {
  id: string;
  unit_number: number;
  title: string;
  description: string;
  quiz_status: 'Locked' | 'Unlocked';
  assignment_status: 'Locked' | 'Unlocked';
}

interface CourseDashboardProps {
  onLogout: () => void;
}

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0F0721] flex flex-col">
      {/* Background flares */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-3xl translate-x/3 translate-y-1/3 pointer-events-none"></div>

      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Navbar Skeleton */}
        <div className="w-full px-6 py-4 flex items-center justify-between bg-[#161042]/60 backdrop-blur-md shadow-xl border-b border-[#8b5cf6]/10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/20 animate-pulse"></div>
            <div className="w-32 h-6 bg-[#8b5cf6]/20 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-8">
            <div className="w-24 h-5 bg-[#8b5cf6]/20 rounded animate-pulse"></div>
            <div className="w-24 h-5 bg-[#8b5cf6]/20 rounded animate-pulse"></div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#8b5cf6]/20 animate-pulse"></div>
              <div className="w-24 h-5 bg-[#8b5cf6]/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 pt-20">
        <div className="flex">
          {/* Sidebar Skeleton */}
          <div className="w-72 bg-[#161042]/60 backdrop-blur-sm p-6 min-h-[calc(100vh-5rem)] fixed left-0">
            <div className="mb-6 space-y-4">
              <div className="w-full h-10 bg-[#8b5cf6]/20 rounded-lg animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-32 h-6 bg-[#8b5cf6]/20 rounded animate-pulse"></div>
                <div className="w-24 h-4 bg-[#8b5cf6]/20 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-full h-20 bg-[#8b5cf6]/20 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 pl-72">
            <div className="max-w-4xl mx-auto p-8 space-y-8">
              <div className="bg-[#161042]/60 backdrop-blur-sm rounded-xl p-8 border border-[#8b5cf6]/20">
                <div className="w-64 h-8 bg-[#8b5cf6]/20 rounded animate-pulse mb-4"></div>
                <div className="w-full h-24 bg-[#8b5cf6]/20 rounded animate-pulse"></div>
              </div>

              <div className="bg-[#161042]/60 backdrop-blur-sm rounded-xl p-8 border border-[#8b5cf6]/20">
                <div className="w-32 h-6 bg-[#8b5cf6]/20 rounded animate-pulse mb-4"></div>
                <div className="w-full h-16 bg-[#8b5cf6]/20 rounded animate-pulse mb-6"></div>
                <div className="w-32 h-10 bg-[#8b5cf6]/20 rounded-lg animate-pulse"></div>
              </div>

              <div className="bg-[#161042]/60 backdrop-blur-sm rounded-xl p-8 border border-[#8b5cf6]/20">
                <div className="w-32 h-6 bg-[#8b5cf6]/20 rounded animate-pulse mb-4"></div>
                <div className="w-full h-16 bg-[#8b5cf6]/20 rounded animate-pulse mb-6"></div>
                <div className="flex gap-4">
                  <div className="w-32 h-10 bg-[#8b5cf6]/20 rounded-lg animate-pulse"></div>
                  <div className="w-32 h-10 bg-[#8b5cf6]/20 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getItemFromLocalStorage = (key: string, fallback = ''): string => {
  const item = localStorage.getItem(key);
  return item ? item : fallback;
};

const CourseDashboard: React.FC<CourseDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId?: string }>();

  const courseId = getItemFromLocalStorage("selectedCourseId");
  const internId = getItemFromLocalStorage("authId");
  const courseName = getItemFromLocalStorage("selectedCourseName", "Course");

  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizLoading, setQuizLoading] = useState(false);
  const [isQuizButtonEnabled, setIsQuizButtonEnabled] = useState(false);
  const CACHE_EXPIRY_MS = 1000 * 60 * 60; // 60 minutes cache
  const [isAssignmentButtonEnabled, setIsAssignmentButtonEnabled] = useState(false);
  const [assignmentLoading, setAssignmentLoading] = useState(false); // State for Submit Assignment loading
  const [startAssignmentLoading, setStartAssignmentLoading] = useState(false); // State for Start Assignment loading
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const currentUnitId = parseInt(unitId || '1', 10);

  const fetchCourseData = async () => {
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/assessment/fetch_course_unit?module_id=${courseId}&intern_id=${internId}`);
      const data = await response.json();

      const unitList = Array.isArray(data)
        ? data
        : data.units && Array.isArray(data.units)
          ? data.units
          : [];

      const mappedUnits = unitList.map((unit: any) => ({
        id: unit.id,
        unit_number: unit.unit_number,
        title: unit.unit_name,
        description: unit.description,
        quiz_status: unit.quiz_status,
        assignment_status: unit.assignment_status,
      }));

      setUnits(mappedUnits);

      const current = mappedUnits.find((u: Unit) => u.unit_number === currentUnitId);
      if (current) {
        setIsQuizButtonEnabled(current.quiz_status === "Unlocked");
        setIsAssignmentButtonEnabled(current.assignment_status === "Unlocked");
        // Update localStorage for the default selected unit on initial load
        localStorage.setItem('selectedUnitId', current.id);
        localStorage.setItem('selectedUnitName', current.title);
      }

      localStorage.setItem("cachedUnits", JSON.stringify(mappedUnits));
      localStorage.setItem("cachedUnitsTimestamp", Date.now().toString());
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAndUpdateUnits = async () => {
    const courseId = getItemFromLocalStorage("selectedCourseId");
    const internId = getItemFromLocalStorage("authId");

    if (!courseId || !internId) {
      console.error("Missing courseId or internId for fetching unit data.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/assessment/fetch_course_unit?module_id=${courseId}&intern_id=${internId}`);
      const data = await response.json();

      const unitList = Array.isArray(data)
        ? data
        : data.units && Array.isArray(data.units)
          ? data.units
          : [];

      const mappedUnits = unitList.map((unit: any) => ({
        id: unit.id,
        unit_number: unit.unit_number,
        title: unit.unit_name,
        description: unit.description,
        quiz_status: unit.quiz_status,
        assignment_status: unit.assignment_status,
      }));

      setUnits(mappedUnits);

      // Find the current unit in the updated list and update button states
      const updatedCurrentUnit = mappedUnits.find((u: Unit) => u.unit_number === currentUnitId);
      if (updatedCurrentUnit) {
        setIsQuizButtonEnabled(updatedCurrentUnit.quiz_status === "Unlocked");
        setIsAssignmentButtonEnabled(updatedCurrentUnit.assignment_status === "Unlocked");
         // Although localStorage was just updated, ensure selected unit info is current
        localStorage.setItem('selectedUnitId', updatedCurrentUnit.id);
        localStorage.setItem('selectedUnitName', updatedCurrentUnit.title);
      }

      localStorage.setItem("cachedUnits", JSON.stringify(mappedUnits));
      localStorage.setItem("cachedUnitsTimestamp", Date.now().toString());
      console.log("Unit information refreshed in localStorage after assignment submission.");
    } catch (error) {
      console.error("Error fetching and updating unit data after assignment submission:", error);
    }
  };

  useEffect(() => {
    if (!courseId) return;

    const cached = localStorage.getItem("cachedUnits");
    const timestamp = localStorage.getItem("cachedUnitsTimestamp");

    if (cached && timestamp) {
      const age = Date.now() - parseInt(timestamp, 10);
      if (age < CACHE_EXPIRY_MS) {
        const parsed = JSON.parse(cached);
        setUnits(parsed);

        const unitFromCache = parsed.find((unit: any) => unit.unit_number === currentUnitId);
        if (unitFromCache) {
          setIsQuizButtonEnabled(unitFromCache.quiz_status === "Unlocked");
          setIsAssignmentButtonEnabled(unitFromCache.assignment_status === "Unlocked");
           // Update localStorage for the default selected unit from cache
          localStorage.setItem('selectedUnitId', unitFromCache.id);
          localStorage.setItem('selectedUnitName', unitFromCache.title);
        }

        setLoading(false);
        return;
      }
    }

    fetchCourseData();
  }, [courseId, currentUnitId]);

  const handleUnitClick = (unit_number: number) => {
    const selectedUnit = units.find(unit => unit.unit_number === unit_number);
    if (selectedUnit) {
      localStorage.setItem('selectedUnitId', selectedUnit.id);
      localStorage.setItem('selectedUnitName', selectedUnit.title);
    }
    navigate(`/course/${courseName.toLowerCase()}/unit/${unit_number}`);
  };

  const handleAssignmentStart = async () => {
    if (!currentUnit) {
      console.error("Current unit not found.");
      return;
    }

    setStartAssignmentLoading(true); // Set loading state for Start Assignment

    const userId = getItemFromLocalStorage("userId");
    const moduleName = getItemFromLocalStorage("selectedCourseName");
    const unitNumber = currentUnit.unit_number;

    if (!userId || !moduleName || unitNumber === undefined) {
      console.error("Missing required data for assignment.", { userId, moduleName, unitNumber });
      setStartAssignmentLoading(false); // Reset loading state
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/assessment/fetch_assignment_url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userid: parseInt(userId, 10),
          module_name: moduleName,
          unit_number: unitNumber,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.authenticated_url) {
        window.open(data.authenticated_url, '_blank');
      } else {
        console.error("Assignment URL not found in response:", data);
        toast.error("Failed to get assignment URL."); // Add error toast for missing URL
      }

    } catch (error) {
      console.error("Error fetching assignment URL:", error);
      toast.error("An error occurred while fetching the assignment URL."); // Add error toast for fetch error
    } finally {
      setStartAssignmentLoading(false); // Reset loading state
    }
  };

  const handleAssignmentSubmit = () => {
    setShowConfirmDialog(true);
  };

  const confirmSubmission = async () => {
    setShowConfirmDialog(false);
    console.log("Attempting assignment submission...");

    const authId = getItemFromLocalStorage("authId");
    const moduleName = getItemFromLocalStorage("selectedCourseName");
    const unitId = getItemFromLocalStorage("selectedUnitId");
    const unitName = getItemFromLocalStorage("selectedUnitName");
    const unitNumber = currentUnit?.unit_number; // Use optional chaining in case currentUnit is null

    if (!authId || !moduleName || !unitId || !unitName || unitNumber === undefined) {
      console.error("Missing required data for submission.", { authId, moduleName, unitId, unitName, unitNumber });
      toast.error("Missing required information for submission."); // Add error toast
      return;
    }

    setAssignmentLoading(true); // Set loading state for Submit Assignment

    const gcsPath = `internverse/45/${moduleName}/Unit${unitNumber}.ipynb`;

    try {
      const response = await fetch('http://127.0.0.1:8000/assessment/submit-assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth_id: authId,
          module_name: moduleName,
          unit_id: unitId,
          unit_name: unitName,
          gcs_path: gcsPath,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result && result.assignment_status === "submitted") {
        toast.success("Assignment submitted successfully!"); // Use toast
        fetchAndUpdateUnits(); // Refresh units after successful submission
      } else {
        console.error("Submission failed or returned unexpected status:", result);
        toast.error("Assignment submission failed."); // Add error toast
      }

    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast.error("An error occurred during assignment submission."); // Add error toast
    } finally {
      setAssignmentLoading(false); // Reset loading state
    }
  };

  const handleTakeQuiz = async () => {
    if (!currentUnit) {
      console.error("Current unit not found.");
      return;
    }


    setQuizLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/assessment/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_name: courseName,
          unit_description: currentUnit.description,
        }),
      });

      const quizData = await response.json();
      localStorage.setItem('quizData', JSON.stringify(quizData));
      navigate('/quiz');
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast.error("Failed to generate quiz. Please try again."); // Add error toast
      setIsQuizButtonEnabled(false);
    } finally {
      setQuizLoading(false);
    }
  };

  // Determine currentUnit after units are fetched and set
  const currentUnit = units.find(unit => unit.unit_number === currentUnitId);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!currentUnit) {
    return (
      <div className="flex-1 pt-20 flex items-center justify-center text-white">Course not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0721] flex flex-col">
      <Toaster /> {/* Add Toaster here */}
      {/* Background flares */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar onLogout={onLogout} />
      </div>

      <div className="flex-1 pt-20">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-72 bg-[#161042]/60 backdrop-blur-sm p-6 min-h-[calc(100vh-5rem)] fixed left-0">
            <div className="mb-6 space-y-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/30 rounded-lg text-[#8b5cf6] font-medium transition-colors w-full"
              >
                <ArrowLeft size={18} />
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-xl font-bold uppercase">{courseName} Course</h1>
                <p className="text-sm text-gray-400">{units.length} UNITS</p>
              </div>
            </div>

            <div className="space-y-4">
              {units.map((unit) => (
                <div
                  key={unit.unit_number}
                  onClick={() => handleUnitClick(unit.unit_number)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    unit.unit_number === currentUnitId
                      ? 'bg-[#8B5CF6] text-white'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="text-sm text-gray-400 mb-1">UNIT {unit.unit_number}</div>
                  <div className="font-medium">{unit.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 pl-72">
            <div className="max-w-4xl mx-auto p-8 space-y-8">
              {/* Unit Description */}
              <div className="bg-[#161042]/60 backdrop-blur-sm rounded-xl p-8 border border-[#8b5cf6]/20">
                <h2 className="text-3xl font-bold mb-4">Unit {currentUnit.unit_number}: {currentUnit.title}</h2>
                <p className="text-gray-300 leading-relaxed">{currentUnit.description}</p>
              </div>

              {/* Quiz Section */}
              <div className="bg-[#161042]/60 backdrop-blur-sm rounded-xl p-8 border border-[#8b5cf6]/20">
                <h3 className="text-xl font-bold mb-4">Quiz</h3>
                <p className="text-gray-300 mb-6">
                  Time to check your understanding? Review the unit material if necessary, then click the button to start the quiz.
                </p>
                <button
                  onClick={handleTakeQuiz}
                  disabled={quizLoading || !isQuizButtonEnabled}
                  className={`group relative px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    quizLoading 
                      ? 'bg-gray-600 cursor-not-allowed'
                      : isQuizButtonEnabled
                        ? 'bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-lg shadow-[#8b5cf6]/20'
                        : 'bg-gray-700 cursor-not-allowed'
                  } flex items-center gap-2`}
                >
                  {isQuizButtonEnabled ? (
                    <Unlock size={18} className="transition-transform group-hover:scale-110" />
                  ) : (
                    <Lock size={18} className="transition-transform group-hover:scale-110" />
                  )}
                  {quizLoading ? 'Loading Quiz...' : isQuizButtonEnabled ? 'Take Quiz' : 'Take Quiz'}
                </button>
              </div>

              {/* Assignment Section */}
              <div className="bg-[#161042]/60 backdrop-blur-sm rounded-xl p-8 border border-[#8b5cf6]/20">
                <h3 className="text-xl font-bold mb-4">Assignment</h3>
                <p className="text-gray-300 mb-6">
                  Get hands-on! If necessary, go through the required material before clicking the button to begin the assignment.
                </p>
                {/* Buttons container */}
                <div className="flex space-x-4">
                  <button 
                    onClick={handleAssignmentStart}
                    disabled={startAssignmentLoading || !isAssignmentButtonEnabled || assignmentLoading}
                    className={`group relative px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      startAssignmentLoading || assignmentLoading
                        ? 'bg-gray-600 cursor-not-allowed'
                        : isAssignmentButtonEnabled
                        ? 'bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-lg shadow-[#8b5cf6]/20'
                        : 'bg-gray-700 cursor-not-allowed'
                    } flex items-center gap-2`}
                  >
                    {isAssignmentButtonEnabled ? (
                      <Unlock size={18} className="transition-transform group-hover:scale-110" />
                    ) : (
                      <Lock size={18} className="transition-transform group-hover:scale-110" />
                    )}
                    {startAssignmentLoading ? 'Loading...' : isAssignmentButtonEnabled ? 'Start Assignment' : 'Start Assignment'}
                  </button>
                  
                  {/* Submit Assignment Button */}
                  <button 
                    onClick={handleAssignmentSubmit}
                    disabled={!isAssignmentButtonEnabled || assignmentLoading || startAssignmentLoading}
                    className={`group relative px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      !isAssignmentButtonEnabled || assignmentLoading || startAssignmentLoading
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-600'
                        : 'bg-transparent border border-[#8b5cf6] hover:bg-[#8b5cf6]/10 shadow-lg shadow-[#8b5cf6]/20'
                    } flex items-center gap-2 text-white`}
                  >
                    <Upload size={18} className="transition-transform group-hover:scale-110" />
                    {assignmentLoading ? 'Submitting...' : 'Submit Assignment'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;