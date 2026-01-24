import React, { useState } from 'react';
import AdminNavbar from '../../Adminnavbar/Adminnavbar';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

const Adminusermanagemnt = () => {
  // Sample Data for User Management
  // Status: Active, Pending, Suspended
  const [users] = useState([
    { id: 1, name: 'Kasun Perera', email: 'kasun@email.com', role: 'Student', status: 'Active', joined: 'Jan 15, 2026' },
    { id: 2, name: 'TechNova HR', email: 'hr@technova.lk', role: 'Company HR', status: 'Pending', joined: 'Jan 20, 2026' },
    { id: 3, name: 'Amali Silva', email: 'amali@email.com', role: 'Student', status: 'Suspended', joined: 'Dec 10, 2025' },
    { id: 4, name: 'CloudNet Admin', email: 'admin@cloudnet.lk', role: 'Company HR', status: 'Active', joined: 'Jan 18, 2026' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* Static Navbar */}
      <AdminNavbar />

      <main className="p-8 pt-10 mx-auto max-w-7xl">
        {/* Page Header - Professional Title & Add User Action */}
        <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">User Management</h2>
            <p className="mt-1 text-slate-500">Manage all registered students and company representatives.</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-all active:scale-95">
            <UserPlus size={18} />
            Add New User
          </button>
        </div>

        {/* Filters & Search Section */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or role..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-slate-600 font-semibold rounded-xl hover:bg-gray-50 transition-all">
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* User Data Table */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold tracking-wider uppercase border-b border-gray-100 bg-gray-50 text-slate-400">
                  <th className="px-6 py-4">User Info</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-gray-50/50 group">
                    {/* User Details with Avatar Placeholder */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 font-bold text-blue-600 border border-blue-100 rounded-full bg-blue-50">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-700">{user.name}</div>
                          <div className="text-xs text-slate-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Role Badge */}
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'Student' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Dynamic Status Badge */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5">
                        {user.status === 'Active' && <CheckCircle2 size={14} className="text-emerald-500" />}
                        {user.status === 'Pending' && <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />}
                        {user.status === 'Suspended' && <XCircle size={14} className="text-red-500" />}
                        <span className={`text-sm font-medium ${
                          user.status === 'Active' ? 'text-emerald-600' : 
                          user.status === 'Pending' ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">{user.joined}</td>

                    {/* Professional Action Buttons */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 transition-all rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50" title="Edit User">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 transition-all rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50" title="Delete User">
                          <Trash2 size={18} />
                        </button>
                        <button className="p-2 transition-all rounded-lg text-slate-400 hover:bg-gray-100">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Placeholder */}
          <div className="flex items-center justify-between px-6 py-4 text-sm font-medium border-t border-gray-100 bg-gray-50 text-slate-500">
            <span>Showing {users.length} users</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Adminusermanagemnt;