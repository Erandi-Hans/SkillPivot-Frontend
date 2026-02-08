import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, Briefcase, GraduationCap, Search, Trash2, 
  ShieldCheck, Edit3, Eye, Ban, MoreVertical 
} from 'lucide-react';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]); // Stores the full list of users fetched from the API
  const [filteredUsers, setFilteredUsers] = useState([]); // Stores the list after applying filters/search
  const [activeTab, setActiveTab] = useState('All'); // Tracks the current category filter
  const [searchTerm, setSearchTerm] = useState(''); // Stores the search input value

  /**
   * Fetches all user data from the C# Backend API.
   * Runs on component mount.
   */
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://localhost:7118/api/Users');
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filtered list with full data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Effect hook to filter users based on the active tab (Student/Company)
   * and the search term entered by the admin.
   */
  useEffect(() => {
    let result = users;

    // Filter by Role category
    if (activeTab === 'Student') {
      result = users.filter(u => u.Role?.toLowerCase() === 'student');
    } else if (activeTab === 'Company') {
      result = users.filter(u => u.Role?.toLowerCase() === 'company');
    }

    // Filter by search keyword (Firstname or Email)
    if (searchTerm) {
      result = result.filter(u => 
        u.Firstname?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.Email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(result);
  }, [activeTab, searchTerm, users]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 shadow-sm rounded-xl">
        
        {/* --- Table Header --- */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-sm text-gray-500">View, manage, and moderate all platform users.</p>
        </div>

        {/* --- Toolbar: Filtering & Search --- */}
        <div className="flex flex-col items-center justify-between gap-4 p-4 md:flex-row bg-gray-50/50">
          {/* Tab Navigation */}
          <div className="flex p-1 bg-white border border-gray-200 rounded-lg shadow-sm">
            {['All', 'Student', 'Company'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-1.5 rounded-md text-sm font-semibold transition ${
                  activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab}s
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name or email..."
              className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- Main Users Table --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-gray-600 uppercase border-b bg-gray-50">
                <th className="px-6 py-4">User Identity</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.Id} className="transition hover:bg-blue-50/30">
                  {/* Avatar and Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 font-bold text-blue-700 bg-blue-100 border border-blue-200 rounded-full">
                        {user.Firstname?.charAt(0) || <User size={18}/>}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{user.Firstname} {user.Lastname}</div>
                        <div className="text-[11px] text-gray-500">{user.Email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role Tag */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      user.Role?.toLowerCase() === 'student' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-purple-100 text-purple-700 border border-purple-200'
                    }`}>
                      {user.Role?.toLowerCase() === 'student' ? <GraduationCap size={12}/> : <Briefcase size={12}/>}
                      {user.Role}
                    </span>
                  </td>

                  {/* Account Status */}
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 px-2 py-1 text-xs font-bold rounded text-emerald-600 bg-emerald-50 w-fit">
                      <ShieldCheck size={14} /> Active
                    </span>
                  </td>

                  {/* Professional Action Icons */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        title="View Profile" 
                        className="p-1.5 text-gray-500 bg-white border border-gray-200 rounded-lg hover:text-blue-600 hover:border-blue-300 transition shadow-sm"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        title="Edit User" 
                        className="p-1.5 text-gray-500 bg-white border border-gray-200 rounded-lg hover:text-orange-600 hover:border-orange-300 transition shadow-sm"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        title="Block Access" 
                        className="p-1.5 text-gray-500 bg-white border border-gray-200 rounded-lg hover:text-gray-900 hover:border-gray-400 transition shadow-sm"
                      >
                        <Ban size={16} />
                      </button>
                      <button 
                        title="Delete Permanently" 
                        className="p-1.5 text-gray-400 bg-white border border-gray-200 rounded-lg hover:text-red-600 hover:border-red-300 transition shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Empty State: Shown when no users match search/filter */}
          {filteredUsers.length === 0 && (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-gray-400 bg-gray-100 rounded-full">
                <Search size={32} />
              </div>
              <p className="font-medium text-gray-500">No users found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;