import React, { useState } from 'react';
import { Briefcase, Clock, CheckCircle, XCircle, Search, Filter, Eye } from 'lucide-react';

const Manageapplication = () => {
  // Sample data for applications
  const [applications] = useState([
    { id: 1, role: "Full Stack Intern", company: "TechSys SL", date: "2024-03-15", status: "Pending", type: "Full-time" },
    { id: 2, role: "Frontend Trainee", company: "SoftGen", date: "2024-03-10", status: "Reviewed", type: "Internship" },
    { id: 3, role: ".NET Developer", company: "CloudNet", date: "2024-02-28", status: "Accepted", type: "Full-time" },
    { id: 4, role: "Mobile App Intern", company: "AppWorks", date: "2024-02-20", status: "Rejected", type: "Internship" },
  ]);

  // Status badge styling logic
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Reviewed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Accepted': return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-6xl min-h-screen p-6 mx-auto text-left bg-white animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Applications</h1>
          <p className="text-sm text-gray-500">Track and manage your internship applications in one place.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
          <div className="relative">
            <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={16} />
            <input 
              type="text" 
              placeholder="Search applications..." 
              className="w-64 py-2 pl-10 pr-4 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Applications Table/List */}
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Job Role & Company</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Applied Date</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Type</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.map((app) => (
              <tr key={app.id} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 text-blue-600 rounded-lg bg-blue-50">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{app.role}</p>
                      <p className="text-xs text-gray-500">{app.company}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={14} /> {app.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {app.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(app.status)}`}>
                    {app.status === 'Accepted' && <CheckCircle size={12} />}
                    {app.status === 'Rejected' && <XCircle size={12} />}
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 text-gray-400 transition-colors hover:text-blue-600" title="View Details">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State if no applications */}
        {applications.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm text-gray-500">You haven't applied for any jobs yet.</p>
          </div>
        )}
      </div>

      {/* Simple Footer/Summary Section */}
      <div className="flex items-center justify-between px-2 mt-6 text-xs text-gray-500">
        <p>Showing {applications.length} applications</p>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-400 rounded-full"></span> Pending</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Accepted</span>
        </div>
      </div>
    </div>
  );
};



export default Manageapplication;
