import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

const ProgressHeader: React.FC = () => {
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setStreak(parsed.streak || 0);
        setProgress(parsed.progress_perc || 0);
      } catch (err) {
        console.error('Invalid userData in localStorage');
      }
    }
  }, []);

  return (
    <div className="w-full px-6 py-8 bg-[#161042]/60 shadow-xl flex items-center justify-between">
      <h1 className="text-xl font-bold">Start progressing and building your daily streak!</h1>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-8 h-8 text-orange-500" />
            <span className="text-3xl font-bold text-orange-500">{streak}</span>
          </div>
          <div>
            <span className="block text-xs text-[#8b5cf6]">DAILY</span>
            <span className="text-base font-bold">STREAK</span>
          </div>
        </div>
        <div>
          <span className="block text-xs text-[#8b5cf6]">PROGRESS</span>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">{progress}%</span>
            <div className="w-48 h-2 bg-[#8b5cf6]/25 rounded-full">
              <div
                className="h-full bg-[#8b5cf6] rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;
