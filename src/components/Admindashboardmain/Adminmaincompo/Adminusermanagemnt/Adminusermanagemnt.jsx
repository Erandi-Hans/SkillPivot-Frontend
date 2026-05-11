import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  User, Briefcase, GraduationCap, Search, Trash2,
  ShieldCheck, Edit3, Eye, ShieldAlert, Users
} from 'lucide-react';
import AdminNavbar from '../../Adminnavbar/Adminnavbar';

/**
 * AdminUserManagement Component
 * High-level dashboard for managing Student, Company, and Admin accounts.
 */
const AdminUserManagement = () => {
  // --- State Management ---
  const [users, setUsers] = useState([]);           // Global list of users from DB
  const [filteredUsers, setFilteredUsers] = useState([]); // List filtered by search/tabs
  const [activeTab, setActiveTab] = useState('All'); // Current role category selection
  const [searchTerm, setSearchTerm] = useState('');  // User-input from search bar
  const [loading, setLoading] = useState(true);      // Loading state for API calls

  /**
   * Fetch all user data from the Backend API.
   * Target endpoint: https://localhost:7118/api/Admin/users
   */
  const fetchUsers = asyn() => {
  setLoading(true);
  try {
    const response = await axios.get('https://localhost:7118/api/Admin/users');

    // DEBUG: If your data isn't showing, check this console log to see the key names
    console.log("Backend Response:", response.data);

    setUsers(response.data);
    setFilteredUsers(response.data);
  } catch (error) {
    console.error("API Error:", error);
    alert("Connectivity Error: Unable to reach the server. Please check your C# Backend.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchUsers();
}, []);

/**
 * Client-side filter logic for Tabs and Search bar.
 */
useEffect(() => {
  let result = users;

  // Filter by Role category
  if (activeTab !== 'All') {
    result = users.filter(u => (u.role || u.Role)?.toLowerCase() === activeTab.toLowerCase());
  }

  // Filter by name or email
  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    result = result.filter(u =>
      (u.firstname || u.Firstname)?.toLowerCase().includes(lowerSearch) ||
      (u.lastname || u.Lastname)?.toLowerCase().includes(lowerSearch) ||
      (u.email || u.Email)?.toLowerCase().includes(lowerSearch)
    );
  }

  setFilteredUsers(result);
}, [activeTab, searchTerm, users]);

return (
  <div className="min-h-screen bg-slate-50">
    {/* 1. Fixed Navigation Bar Section */}
    <div className="fixed top-0 z-50 w-full shadow-sm bg-white/80 backdrop-blur-md">
      <AdminNavbar />
    </div>

    {/* Main Content Area - Padding top added to prevent content hiding under Navbar */}
    <div className="max-w-6xl px-4 py-24 mx-auto sm:px-6 lg:px-8">

      {/* --- Header Section --- */}
      <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-end">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-slate-900">
            <Users className="p-1.5 bg-blue-100 rounded-xl text-blue-600" size={40} />
            User Management
          </h1>
          <p className="mt-2 font-medium text-slate-500">Administration portal for account verification and control.</p>
        </div>

        {/* Role Filter Tabs */}
        <div className="flex p-1 border bg-slate-200/50 rounded-2xl border-slate-200 w-fit">
          {['All', 'Student', 'Company', 'Admin'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab
                  ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              {tab}s
            </button>
          ))}
        </div>
      </div>

      {/* --- Dashboard Card --- */}
      <div className="overflow-hidden bg-white border shadow-2xl border-slate-200 rounded-3xl">

        {/* Search Bar Container */}
        <div className="px-8 py-6 border-b bg-slate-50/30 border-slate-100">
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email or role..."
              className="w-full py-3.5 pl-12 pr-6 transition-all bg-white border outline-none border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- Responsive Table --- */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-32 text-center">
              <div className="inline-block w-12 h-12 mb-4 border-4 rounded-full border-t-blue-600 border-slate-200 animate-spin"></div>
              <p className="font-bold tracking-widest text-slate-400">SYNCHRONIZING RECORDS...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b bg-slate-50/50">
                  <th className="px-8 py-5">System Identity</th>
                  <th className="px-8 py-5">Account Classification</th>
                  <th className="px-8 py-5">Verification Status</th>
                  <th className="px-8 py-5 text-center">Control Panel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.userId || user.UserId} className="transition-colors group hover:bg-blue-50/40">
                    {/* Identity Info */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-blue-700 transition-all border border-blue-100 shadow-sm bg-blue-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white">
                          {(user.firstname || user.Firstname)?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-800">{user.firstname || user.Firstname} {user.lastname || user.Lastname}</p>
                          <p className="text-xs font-semibold text-slate-400">{user.email || user.Email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Classification Badge */}
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${(user.role || user.Role)?.toLowerCase() === 'student'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : (user.role || user.Role)?.toLowerCase() === 'admin'
                            ? 'bg-rose-50 text-rose-700 border-rose-100'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                        }`}>
                        {(user.role || user.Role)?.toLowerCase() === 'student' ? <GraduationCap size={14} /> :
                          (user.role || user.Role)?.toLowerCase() === 'admin' ? <ShieldAlert size={14} /> : <Briefcase size={14} />}
                        {user.role || user.Role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 px-3 py-1 text-[10px] font-black rounded-lg text-emerald-600 bg-emerald-50 border border-emerald-100 w-fit">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        ACTIVE
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-5">
                      <div className="flex justify-center gap-3">
                        <button title="View Details" className="p-2.5 text-slate-400 bg-slate-50 border border-slate-100 rounded-xl hover:text-blue-600 hover:bg-white hover:shadow-md transition-all"><Eye size={18} /></button>
                        <button title="Modify Account" className="p-2.5 text-slate-400 bg-slate-50 border border-slate-100 rounded-xl hover:text-amber-600 hover:bg-white hover:shadow-md transition-all"><Edit3 size={18} /></button>
                        <button title="Terminate" className="p-2.5 text-slate-400 bg-slate-50 border border-slate-100 rounded-xl hover:text-red-600 hover:bg-white hover:shadow-md transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Empty UI */}
        {filteredUsers.length === 0 && !loading && (
          <div className="p-32 text-center bg-slate-50/20">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-white border rounded-full shadow-xl border-slate-100">
              <Search className="text-slate-200" size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Account Not Found</h3>
            <p className="max-w-xs mx-auto mt-2 text-sm font-medium text-slate-400">No users match the category "{activeTab}" or search term.</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default AdminUserManagement;