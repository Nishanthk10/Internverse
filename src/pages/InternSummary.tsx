import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const InternSummary: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState('Python');
  const [selectedIntern, setSelectedIntern] = useState('Sam');
  const [selectedUnit, setSelectedUnit] = useState('Unit 1');

  const courses = ['Python', 'SQL', 'Git'];
  const interns = ['Sam'];
  const units = ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5'];

  const assessmentData = {
    recall: 85,
    grasp: 75,
    clarity: 90,
    practice: 80,
    accuracy: 85
  };

  const metrics = {
    averageScore: 78,
    attempts: 3,
    passRate: '96%',
    tenure: '54 days'
  };

  const radarData = {
    labels: ['Recall', 'Grasp', 'Clarity', 'Practice', 'Accuracy'],
    datasets: [
      {
        data: [
          assessmentData.recall,
          assessmentData.grasp,
          assessmentData.clarity,
          assessmentData.practice,
          assessmentData.accuracy
        ],
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(139, 92, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(139, 92, 246, 1)'
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: 'rgba(255, 255, 255, 0.5)',
          backdropColor: 'transparent'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 11
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] max-w-6xl mx-auto grid grid-rows-[auto_1fr] gap-3">
      {/* Header Section */}
      <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg p-3 pb-10 border border-[#8b5cf6]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserCircle size={40} className="text-[#8b5cf6]" strokeWidth={1} />
            <div>
              <h2 className="text-lg font-semibold">{selectedIntern}</h2>
              <p className="text-sm text-gray-400">Date Joined on Feb 20th 2023</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <select 
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-[#0F0721] text-white border border-[#8b5cf6]/30 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#8b5cf6] hover:border-[#a78bfa] focus:ring-1 focus:ring-[#8b5cf6]"
            >
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            <select 
              value={selectedIntern}
              onChange={(e) => setSelectedIntern(e.target.value)}
              className="bg-[#0F0721] text-white border border-[#8b5cf6]/30 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#8b5cf6] hover:border-[#a78bfa] focus:ring-1 focus:ring-[#8b5cf6]"
            >
              {interns.map(intern => (
                <option key={intern} value={intern}>{intern}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="mt-4 px-8">
          <div className="flex items-center justify-between">
            {units.map((unit, index) => {
              const isCompleted = index <= 1;
              const isLast = index === units.length - 1;
              
              return (
                <div key={unit} className="relative flex-1">
                  <div className="flex items-center">
                    <div className="relative">
                      <div 
                        className={`w-3.5 h-3.5 rounded-full ${
                          isCompleted 
                            ? 'bg-[#8b5cf6]' 
                            : 'bg-white border-2 border-[#8b5cf6]/20'
                        }`}
                      />
                      <span className="absolute top-4 left-1/2 -translate-x-1/2 text-sm whitespace-nowrap">{unit}</span>
                    </div>
                    {!isLast && (
                      <div 
                        className={`h-[2px] flex-1 ${
                          isCompleted ? 'bg-[#8b5cf6]' : 'bg-[#8b5cf6]/20'
                        }`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Intern Metrics */}
        <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg px-3 py-1 border border-[#8b5cf6]/20">
          <h3 className="text-base font-semibold mb-4">Intern Metrics</h3>
          <div className="space-y-4">
            <MetricItem label="Average Quiz Score" value={metrics.averageScore} />
            <MetricItem label="Quiz Attempt" value={metrics.attempts} />
            <MetricItem label="Pass Rate" value={metrics.passRate} />
            <MetricItem label="Tenure" value={metrics.tenure} />
          </div>
        </div>

        {/* Assessment Score */}
        <div className="col-span-2 bg-[#161042]/60 backdrop-blur-sm rounded-lg px-3 py-1 border border-[#8b5cf6]/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold">Assessment Score</h3>
            <select 
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="bg-[#0F0721] text-white border border-[#8b5cf6]/30 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-[#8b5cf6] hover:border-[#a78bfa] focus:ring-1 focus:ring-[#8b5cf6]"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center justify-center h-[calc(100%-2rem)]">
            <div className="w-full max-w-[300px]">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div>
    <p className="text-xs text-[#8b5cf6] mb-1">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default InternSummary;