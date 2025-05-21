import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

const getItemFromLocalStorage = (key: string, fallback = ''): string => {
  const item = localStorage.getItem(key);
  return item ? item : fallback;
};

const QuizPage: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizQuestion[] | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizSubmitting, setQuizSubmitting] = useState(false); // New state for loading
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuizData = localStorage.getItem('quizData');
    if (storedQuizData) {
      try {
        const parsedData: QuizQuestion[] = JSON.parse(storedQuizData);
        setQuizData(parsedData);
      } catch (error) {
        console.error("Error parsing quiz data from local storage:", error);
        setQuizData(null);
      }
    }
  }, []);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
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

      localStorage.setItem("cachedUnits", JSON.stringify(mappedUnits));
      localStorage.setItem("cachedUnitsTimestamp", Date.now().toString());
      console.log("Unit information refreshed in localStorage.");
    } catch (error) {
      console.error("Error fetching and updating unit data:", error);
    }
  };

  const handleSubmit = async () => {
    if (!quizData) return;

    const totalQuestions = quizData.length;
    const answeredQuestions = Object.keys(selectedAnswers).length;

    if (answeredQuestions < totalQuestions) {
      toast.error(`Please answer all questions (${answeredQuestions}/${totalQuestions} answered)`, {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    const course_name = localStorage.getItem('selectedCourseName');
    const unit_id = localStorage.getItem('selectedUnitId');
    const auth_id = localStorage.getItem('authId');
    const unit_name = localStorage.getItem('selectedUnitName');

    if (!course_name || !unit_id || !auth_id || !unit_name) {
      toast.error("Missing required information to submit the quiz", {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    setQuizSubmitting(true); // Set loading state

    const submissions = quizData.map((questionData, index) => ({
      question: questionData.question,
      selected_answer: selectedAnswers[index],
      correct_answer: questionData.correct_answer,
    }));

    const quizSubmissionData = {
      course_name: course_name,
      unit_id: unit_id,
      auth_id: auth_id,
      unit_name: unit_name,
      submissions: submissions,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/assessment/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizSubmissionData),
      });
      
      const data = await response.json();
      
      if (data.quiz_status === "submitted") {
        setIsSubmitted(true);
        fetchAndUpdateUnits(); // Refresh units after successful submission
        // toast.success("Quiz submitted successfully!", {
        //   duration: 3000,
        //   position: 'top-right',
        // });
      }
    } catch (error) {
      toast.error("Failed to submit quiz. Please try again.", {
        duration: 3000,
        position: 'top-right',
      });
    } finally {
      setQuizSubmitting(false); // Reset loading state
    }
  };

  if (!quizData) {
    return (
      <div className="min-h-screen bg-[#0F0721] flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar onLogout={() => {}} />
        </div>
        
        <div className="flex-1 pt-20">
          <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg p-6 border border-[#8b5cf6]/20">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-[#8b5cf6]" size={24} />
                <h2 className="text-xl font-bold">Quiz Unavailable</h2>
              </div>
              <p className="text-gray-300 mb-6">Could not load quiz data. Please try taking the quiz again from the course dashboard.</p>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/30 rounded-lg text-[#8b5cf6] font-medium transition-colors"
              >
                <ArrowLeft size={18} />
                Return to Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0721] flex flex-col">
      <Toaster />
      {/* Background flares */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar onLogout={() => {}} />
      </div>

      <div className="flex-1 pt-20">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {isSubmitted ? (
            <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg p-8 border border-[#8b5cf6]/20 text-center">
              <CheckCircle2 className="mx-auto mb-4 text-green-500" size={48} />
              <h2 className="text-2xl font-bold mb-4">Quiz Submitted Successfully!</h2>
              <p className="text-gray-300 mb-6">Thank you for completing the quiz. Your responses have been recorded.</p>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b5cf6] hover:bg-[#7C3AED] rounded-lg font-semibold transition-colors"
              >
                <ArrowLeft size={18} />
                Return to Course
              </button>
            </div>
          ) : (
            <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg p-6 border border-[#8b5cf6]/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Unit Quiz</h2>
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/30 rounded-lg text-[#8b5cf6] font-medium transition-colors"
                >
                  <ArrowLeft size={18} />
                  Return to Course
                </button>
              </div>

              <div className="space-y-8">
                {quizData.map((questionData, index) => (
                  <div key={index} className="bg-[#161042] rounded-lg p-6 border border-[#8b5cf6]/20">
                    <p className="text-lg font-medium mb-4 text-gray-200">
                      {index + 1}. {questionData.question}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {questionData.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                            selectedAnswers[index] === option
                              ? 'bg-[#8b5cf6]/20 border border-[#8b5cf6]'
                              : 'hover:bg-[#8b5cf6]/10 border border-transparent'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={selectedAnswers[index] === option}
                            onChange={() => handleAnswerSelect(index, option)}
                            className="w-4 h-4 text-[#8b5cf6] bg-gray-700 border-gray-600 focus:ring-[#8b5cf6] focus:ring-offset-gray-800"
                          />
                          <span className="text-gray-300">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={quizSubmitting} // Disable when submitting
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-[#8b5cf6]/20 ${
                    quizSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-[#8b5cf6] hover:bg-[#7C3AED]'
                  }`}
                >
                  {quizSubmitting ? 'Submitting...' : 'Submit Quiz'} {/* Change text when submitting */}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;