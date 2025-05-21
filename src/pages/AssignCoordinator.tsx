import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

interface AssignCoordinatorProps {
  onLogout: () => void;
}

interface Coordinator {
  id: string;
  name: string;
}

// Define the Intern interface with an optional lc_id
interface Intern {
  id: string;
  intern_id: number;
  name: string;
  coordinator: string;
}

const AssignCoordinator: React.FC<AssignCoordinatorProps> = ({ onLogout }) => {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialInterns, setInitialInterns] = useState<Intern[]>([]); // State to store initial intern data
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false); // State for save button loading state

  const fetchData = async () => {
    try {
      setLoading(true);
      const internsResponse = await fetch('http://127.0.0.1:8000/all_users/list_interns_with_coordinators');
      const coordinatorsResponse = await fetch('http://127.0.0.1:8000/coordinators/list_coordinators');

      if (!internsResponse.ok) {
        throw new Error(`Error fetching interns: ${internsResponse.statusText}`);
      }
      if (!coordinatorsResponse.ok) {
        throw new Error(`Error fetching coordinators: ${coordinatorsResponse.statusText}`);
      }

      const internsData = await internsResponse.json();
      const coordinatorsData = await coordinatorsResponse.json();

      setInterns(internsData.interns_with_coordinators);
      // Create a deep copy of initial data to compare against later
      setInitialInterns(JSON.parse(JSON.stringify(internsData.interns_with_coordinators)));
      setCoordinators(coordinatorsData.coordinators);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCoordinatorChange = (internId: number, newCoordinatorName: string) => {
    setInterns(interns.map(intern =>
      intern.intern_id === internId ? { ...intern, coordinator: newCoordinatorName } : intern
    ));
  };

  const handleSave = async () => {
    const modifiedInterns = interns.filter((intern) => {
      const initial = initialInterns.find(i => i.intern_id === intern.intern_id);
      // Compare current state with initial state to find changes
      return initial?.coordinator !== intern.coordinator;
    });

    if (modifiedInterns.length === 0) {
      alert("No changes to save.");
      return;
    }

    setIsSaving(true); // Disable button

    const payload = {
      updates: modifiedInterns.map(intern => {
        const coordinatorEntry = coordinators.find(c => c.name === intern.coordinator);
        // Assuming intern.id is the correct user ID for the backend
        return {
          intern_id: intern.id, 
          lc_id: coordinatorEntry?.id || null // Use coordinator id, or null if 'Not Assigned'
        };
      })
    };
    console.log("Payload being sent:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch('http://127.0.0.1:8000/all_users/assign_coordinator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
          throw new Error(`Error saving assignments: ${response.statusText}`);
      }

      console.log("Save successful:", response);
      // Refresh data after successful save
      fetchData();

    } catch (error) {
      console.error("Error saving assignments:", error);
      alert(`Error saving assignments: ${error}`); // Show error to user
    } finally {
      setIsSaving(false); // Re-enable button
    }
  };

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
                {loading ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4">Loading...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-red-500">Error: {error}</td>
                  </tr>
                ) : ( interns.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">No interns found.</td>
                    </tr>
                  ) : (
                  interns.map((intern) => (
                    <tr key={intern.intern_id} className="border-b border-[#8b5cf6]/10 hover:bg-[#8b5cf6]/5 transition-colors">
                      <td className="py-3 px-4">{intern.intern_id}</td>
                      <td className="py-3 px-4">{intern.name}</td>
                      <td className="py-3 px-4">
                        <select
                          className="w-48 bg-[#0F0721] text-white border border-[#8b5cf6]/30 rounded-lg px-3 py-2 text-sm
                            focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20
                            transition-colors cursor-pointer appearance-none
                            bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCA0IDEyIDQyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMi41IDQuMjVMNi42MjUgOC4zNzVMMTAuNzUgNC4yNUwxMiA1LjVMNi42MjUgMTAuODc1TDEuMjUgNS41TDIuNSA0LjI1WiIgZmlsbD0iIzhCNUNGNiIvPgo8L2h2Zz4K')] // This is the base64 for a down arrow SVG
                            bg-[length:12px_12px] bg-no-repeat bg-[center_right_1rem]
                            hover:bg-[#8b5cf6]/5"
                          value={intern.coordinator} // Use value instead of defaultValue for controlled component
                          onChange={(e) => handleCoordinatorChange(intern.intern_id, e.target.value)}
                        >
                          <option value="Not Assigned" className="bg-[#0F0721] text-gray-400">Not Assigned</option>
                          {coordinators.map((coordinator) => (
                            <option
                              key={coordinator.id}
                              value={coordinator.name}
                              className="bg-[#0F0721] text-white"
                            >
                              {coordinator.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className={`bg-[#8b5cf6] text-white font-bold py-2 px-4 rounded transition-colors ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#7c4dff]'}`}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AssignCoordinator;