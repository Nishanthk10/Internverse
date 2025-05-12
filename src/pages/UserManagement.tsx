import React, { useState } from 'react';
import { Copy, RefreshCw, Search, Trash2, Edit } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

interface UserManagementProps {
  onLogout: () => void;
}

interface UserFormData {
  name: string;
  userId: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  userId: string;
}

const UserManagement: React.FC<UserManagementProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'intern' | 'coordinator'>('intern');
  const [internForm, setInternForm] = useState<UserFormData>({ name: '', userId: '', password: '' });
  const [coordinatorForm, setCoordinatorForm] = useState<UserFormData>({ name: '', userId: '', password: '' });
  const [showCopyIntern, setShowCopyIntern] = useState(false);
  const [showCopyCoordinator, setShowCopyCoordinator] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const [users] = useState<User[]>([
    { id: 1, name: 'John Doe', userId: '001' },
    { id: 2, name: 'Jane Smith', userId: '002' },
  ]);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleGeneratePassword = (type: 'intern' | 'coordinator') => {
    const newPassword = generatePassword();
    if (type === 'intern') {
      setInternForm({ ...internForm, password: newPassword });
      setShowCopyIntern(true);
    } else {
      setCoordinatorForm({ ...coordinatorForm, password: newPassword });
      setShowCopyCoordinator(true);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent, type: 'intern' | 'coordinator') => {
    e.preventDefault();
    setLoading(true);

    const formData = type === 'intern' ? internForm : coordinatorForm;
    const endpoint =
    type === 'intern'
      ? 'http://127.0.0.1:8000/interns/add_intern'
      : 'http://127.0.0.1:8000/coordinators/add_coordinator';

    try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        userid: formData.userId,
        password: formData.password,
      }),
    });

    if (response.ok) {
      if (type === 'intern') {
        setInternForm({ name: '', userId: '', password: '' });
        setShowCopyIntern(false);
      } else {
        setCoordinatorForm({ name: '', userId: '', password: '' });
        setShowCopyCoordinator(false);
      }
      alert('User added successfully!');
    } else {
      alert('Failed to add user');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to add user');
  } finally {
    setLoading(false);
  }
};

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search Section */}
        <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg p-6 border border-[#8b5cf6]/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#161042] border border-[#8b5cf6]/30 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 hover:border-[#8b5cf6]/50 transition-colors"
              />
              <Search className="absolute left-3 top-2.5 text-[#8b5cf6]" size={16} />
            </div>
          </div>

          {/* User List */}
          <div className="space-y-2">
            {filteredUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-[#161042] rounded-lg border border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 transition-all duration-300">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-[#8b5cf6]">ID: {user.userId}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-[#8b5cf6]/10 rounded-lg transition-colors">
                    <Edit size={16} className="text-[#8b5cf6]" />
                  </button>
                  <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add User Section */}
        <div className="bg-[#161042]/60 backdrop-blur-sm rounded-lg p-6 border border-[#8b5cf6]/20">
          <h2 className="text-lg font-bold mb-4 text-[#8b5cf6]">Add New User</h2>

          {/* Tabs */}
          <div className="flex gap-3 mb-6">
            <button
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'intern'
                  ? 'bg-[#8b5cf6] text-white'
                  : 'bg-[#161042] border border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/10'
              }`}
              onClick={() => setActiveTab('intern')}
            >
              Add Intern
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'coordinator'
                  ? 'bg-[#8b5cf6] text-white'
                  : 'bg-[#161042] border border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/10'
              }`}
              onClick={() => setActiveTab('coordinator')}
            >
              Add Coordinator
            </button>
          </div>

          {/* Form */}
          {(activeTab === 'intern' || activeTab === 'coordinator') && (
            <form onSubmit={(e) => handleSubmit(e, activeTab)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-[#8b5cf6]">Name</label>
                <input
                  type="text"
                  value={activeTab === 'intern' ? internForm.name : coordinatorForm.name}
                  onChange={(e) => activeTab === 'intern' 
                    ? setInternForm({ ...internForm, name: e.target.value })
                    : setCoordinatorForm({ ...coordinatorForm, name: e.target.value })
                  }
                  className="w-full bg-[#161042] border border-[#8b5cf6]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 hover:border-[#8b5cf6]/50 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-[#8b5cf6]">User ID</label>
                <input
                  type="text"
                  value={activeTab === 'intern' ? internForm.userId : coordinatorForm.userId}
                  onChange={(e) => activeTab === 'intern'
                    ? setInternForm({ ...internForm, userId: e.target.value })
                    : setCoordinatorForm({ ...coordinatorForm, userId: e.target.value })
                  }
                  className="w-full bg-[#161042] border border-[#8b5cf6]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 hover:border-[#8b5cf6]/50 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-[#8b5cf6]">Password</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={activeTab === 'intern' ? internForm.password : coordinatorForm.password}
                    readOnly
                    className="flex-1 bg-[#161042] border border-[#8b5cf6]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleGeneratePassword(activeTab)}
                    className="px-3 py-2 bg-[#161042] border border-[#8b5cf6]/30 rounded-lg hover:bg-[#8b5cf6]/10 transition-colors"
                  >
                    <RefreshCw size={16} className="text-[#8b5cf6]" />
                  </button>
                  {((activeTab === 'intern' && showCopyIntern) || 
                    (activeTab === 'coordinator' && showCopyCoordinator)) && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(activeTab === 'intern' ? internForm.password : coordinatorForm.password)}
                      className="px-3 py-2 bg-[#161042] border border-[#8b5cf6]/30 rounded-lg hover:bg-[#8b5cf6]/10 transition-colors"
                    >
                      <Copy size={16} className="text-[#8b5cf6]" />
                    </button>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-sm bg-[#8b5cf6] hover:bg-[#7C3AED] rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : `Add ${activeTab === 'intern' ? 'Intern' : 'Coordinator'}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;