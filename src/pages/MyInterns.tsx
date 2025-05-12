import React from 'react';

interface Intern {
  id: string;
  name: string;
  startDate: string;
  activeCourse: string;
  progress: number;
}

const MyInterns: React.FC = () => {
  const interns: Intern[] = [
    {
      id: "271",
      name: "Sam",
      startDate: "2025-01-10",
      activeCourse: "SQL",
      progress: 65
    },
    {
      id: "283",
      name: "Dave",
      startDate: "2025-02-10",
      activeCourse: "Python",
      progress: 45
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg p-6 border border-[#8b5cf6]/20">
        <h2 className="text-xl font-bold mb-6">My Interns</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#8b5cf6]/20">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#8b5cf6]">Intern ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#8b5cf6]">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#8b5cf6]">Start Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#8b5cf6]">Active Course</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#8b5cf6]">Overall Progress</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => (
                <tr key={intern.id} className="border-b border-[#8b5cf6]/10 hover:bg-[#8b5cf6]/5 transition-colors">
                  <td className="py-4 px-4">{intern.id}</td>
                  <td className="py-4 px-4">{intern.name}</td>
                  <td className="py-4 px-4">{intern.startDate}</td>
                  <td className="py-4 px-4">{intern.activeCourse}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-48 h-2 bg-[#8b5cf6]/10 rounded-full">
                        <div
                          className="h-full bg-[#8b5cf6] rounded-full transition-all duration-300"
                          style={{ width: `${intern.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-[#8b5cf6]">{intern.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyInterns;