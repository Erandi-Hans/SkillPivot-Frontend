import React from 'react';
import AdminNavbar from '../Adminnavbar/Adminnavbar.jsx'; // Ensure the path matches your file structure
import { 
  Users, 
  Building2, 
  Briefcase, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  TrendingUp 
} from 'lucide-react';
 

const AdminDashboard = () => {
  // Sample data for system-wide statistics
  const stats = [
    { label: 'Total Students', value: '1,420', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Verified Companies', value: '58', icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Internships', value: '245', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pending Requests', value: '12', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* 1. Global Navigation Bar */}
      <AdminNavbar />

      <main className="p-8 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">System Analytics</h2>
          <p className="mt-1 text-slate-500">Overview of the current status of the SkillPivotlk platform.</p>
        </div>

        {/* 2. Statistical Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div key={index} className="p-6 transition-all bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <TrendingUp size={16} className="text-emerald-500" />
              </div>
              <p className="text-sm font-semibold tracking-wider uppercase text-slate-400">{item.label}</p>
              <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-800">{item.value}</h3>
            </div>
          ))}
        </div>

        {/* 3. Main Action Section: Company Verification Table */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-3xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-slate-800">Pending Company Verifications</h3>
            <span className="px-3 py-1 text-xs font-bold text-blue-600 border border-blue-100 rounded-full bg-blue-50">
              New Requests
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold tracking-widest uppercase bg-gray-50 text-slate-400">
                  <th className="px-6 py-4">Company Details</th>
                  <th className="px-6 py-4">Industry</th>
                  <th className="px-6 py-4">Registered Date</th>
                  <th className="px-6 py-4 text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Sample Company Data Row 1 */}
                <tr className="transition-colors hover:bg-gray-50/50">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-700">TechNova Solutions</div>
                    <div className="text-xs text-slate-400">contact@technova.com</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md text-slate-600">
                      Software Engineering
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500">Jan 22, 2026</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-600 border border-emerald-200 bg-emerald-50 rounded-lg hover:bg-emerald-600 hover:text-white transition-all">
                        <CheckCircle size={14} /> Approve
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                        <XCircle size={14} /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Sample Company Data Row 2 */}
                <tr className="transition-colors hover:bg-gray-50/50">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-700">CloudNet Sri Lanka</div>
                    <div className="text-xs text-slate-400">hr@cloudnet.lk</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md text-slate-600">
                      Cloud Computing
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500">Jan 23, 2026</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-600 border border-emerald-200 bg-emerald-50 rounded-lg hover:bg-emerald-600 hover:text-white transition-all">
                        <CheckCircle size={14} /> Approve
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                        <XCircle size={14} /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Footer of the table for additional actions */}
          <div className="p-4 text-center bg-gray-50/50">
            <button className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700">
              View All Verification Requests
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;