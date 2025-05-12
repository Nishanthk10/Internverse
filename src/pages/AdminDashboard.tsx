import React, { useState } from 'react';
import { GraduationCap, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());

  const [metrics, setMetrics] = useState({
    totalInterns: 150,
    totalCoordinators: 15,
    convertedInterns: 45,
    pythonProgress: 75,
    sqlProgress: 60,
    gitProgress: 45
  });

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start) setStartDate(start);
    if (end) setEndDate(end);
    
    setMetrics({
      totalInterns: Math.floor(Math.random() * 200) + 100,
      totalCoordinators: Math.floor(Math.random() * 20) + 10,
      convertedInterns: Math.floor(Math.random() * 50) + 30,
      pythonProgress: Math.floor(Math.random() * 30) + 60,
      sqlProgress: Math.floor(Math.random() * 30) + 50,
      gitProgress: Math.floor(Math.random() * 30) + 40
    });
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Date Filter */}
        <div className="relative z-50">
          <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg p-6 border border-[#8b5cf6]/20">
            <h3 className="text-base font-bold mb-3 text-[#8b5cf6]">Date Range</h3>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              className="bg-[#161042] text-white px-4 py-2 text-sm rounded-lg border border-[#8b5cf6]/30 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 hover:border-[#8b5cf6]/50 transition-colors"
              dateFormat="MMM d, yyyy"
            />
            <p className="mt-2 text-xs text-[#8b5cf6]">
              Showing metrics from {format(startDate, 'MMM d, yyyy')} to {format(endDate, 'MMM d, yyyy')}
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            icon={<GraduationCap size={20} className="text-white" />}
            label="Total Interns"
            value={metrics.totalInterns}
          />
          <MetricCard
            icon={<Users size={20} className="text-white" />}
            label="Total Coordinators"
            value={metrics.totalCoordinators}
          />
          <MetricCard
            icon={<Users size={20} className="text-white" />}
            label="Converted to Full-time"
            value={metrics.convertedInterns}
          />
        </div>

        {/* Course Progress */}
        <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg p-6 border border-[#8b5cf6]/20">
          <h3 className="text-base font-bold mb-4 text-[#8b5cf6]">Course Progress</h3>
          <div className="space-y-4">
            <ProgressBar label="Python" progress={metrics.pythonProgress} />
            <ProgressBar label="SQL" progress={metrics.sqlProgress} />
            <ProgressBar label="Git" progress={metrics.gitProgress} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const MetricCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
}> = ({ icon, label, value }) => (
  <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg p-6 border border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 transition-all duration-300">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-[#8b5cf6] rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-xs text-[#8b5cf6]">{label}</h3>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  </div>
);

const ProgressBar: React.FC<{
  label: string;
  progress: number;
}> = ({ label, progress }) => (
  <div>
    <div className="flex justify-between mb-1.5">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-medium text-[#8b5cf6]">{progress}%</span>
    </div>
    <div className="w-full h-1.5 bg-[#8b5cf6]/10 rounded-full">
      <div
        className="h-full bg-[#8b5cf6] rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default AdminDashboard;