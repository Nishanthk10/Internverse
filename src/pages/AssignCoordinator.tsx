import React from 'react';
import AdminLayout from '../components/AdminLayout';

interface AssignCoordinatorProps {
  onLogout: () => void;
}

const AssignCoordinator: React.FC<AssignCoordinatorProps> = ({ onLogout }) => {
  // Dummy data for interns
  const interns = [
    { id: "4d25e89d-5689-4477-bf6f-e26850a79a98", name: "Anurag", userid: "271" },
    { id: "99bd4d57-e0a7-4103-8ed6-f977327c33ef", name: "Nishanth", userid: "272" },
    { id: "72bd4d57-e0a7-4103-8ed6-f977327c33ef", name: "Sarah Johnson", userid: "273" },
    { id: "82bd4d57-e0a7-4103-8ed6-f977327c33ef", name: "Michael Chen", userid: "274" },
    { id: "92bd4d57-e0a7-4103-8ed6-f977327c33ef", name: "Emily Davis", userid: "275" }
  ];

  // Dummy data for coordinators
  const coordinators = [
    { name: "John Smith" },
    { name: "Maria Garcia" },
    { name: "David Wilson" },
    { name: "Lisa Anderson" }
  ];

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Assign Coordinators</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#8b5cf6]/20">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#8b5cf6]">Intern ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#8b5cf6]">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#8b5cf6]">Coordinator</th>
                </tr>
              </thead>
              <tbody>
                {interns.map((intern) => (
                  <tr key={intern.id} className="border-b border-[#8b5cf6]/10 hover:bg-[#8b5cf6]/5 transition-colors">
                    <td className="py-3 px-4">{intern.userid}</td>
                    <td className="py-3 px-4">{intern.name}</td>
                    <td className="py-3 px-4">
                      <select 
                        className="w-48 bg-[#0F0721] text-white border border-[#8b5cf6]/30 rounded-lg px-3 py-2 text-sm 
                          focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 
                          transition-colors cursor-pointer appearance-none
                          bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02IDcuNEwwIDEuNEwxLjQgMEw2IDQuNkwxMC42IDBMMTIgMS40TDYgNy40WiIgZmlsbD0iIzhCNUNGNiIvPgo8L3N2Zz4K')]
                          bg-[length:12px_8px] bg-no-repeat bg-[center_right_1rem]
                          hover:bg-[#8b5cf6]/5"
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-[#0F0721] text-gray-400">Select Coordinator</option>
                        {coordinators.map((coordinator, index) => (
                          <option 
                            key={index} 
                            value={coordinator.name}
                            className="bg-[#0F0721] text-white py-2"
                          >
                            {coordinator.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AssignCoordinator;