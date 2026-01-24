import React, { useState } from 'react';
import AdminNavbar from '../../Adminnavbar/Adminnavbar.jsx'; 
import { 
  Briefcase, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  Trash2, 
  Clock,
  Building,
  CheckCircle2
} from 'lucide-react';

const Adminjob = () => {
  // Sample state for job moderation data
  const [jobs] = useState([
    {
      id: "JOB-1024",
      title: "MERN Stack Intern",
      company: "TechNova Solutions",
      postedDate: "Jan 24, 2026",
      type: "Full-time",
      status: "Review Pending",
      location: "Colombo"
    },
    {
      id: "JOB-1025",
      title: "QA Engineering Intern",
      company: "CloudNet Sri Lanka",
      postedDate: "Jan 23, 2026",
      type: "Remote",
      status: "Flagged",
      location: "Galle"
    }
  ]);

  return (
    <div className="min-h-screen font-sans bg-gray-50 text-slate-900">
      {/* 1. Global Navigation Bar - Stays at the top */}
      <AdminNavbar />

      <main className="p-8 pt-10 mx-auto max-w-7xl">
        {/* Page Header - Professional Title Section */}
        <div className="flex flex-col justify-between mb-8 md:flex-row md:items-center">
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-slate-800">
              <Briefcase className="text-blue-600" size={32} />
              Job Moderation
            </h2>
            <p className="mt-1 text-slate-500">
              Verify and manage internship postings to maintain platform quality standards.
            </p>
          </div>
        </div>

        {/* 2. Utility Bar - Search & Filter functionality */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by job title or company name..." 
              className="w-full border-none pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-slate-600 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-sm">
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* 3. Job Moderation Table Container */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold tracking-wider uppercase border-b border-gray-100 bg-gray-50/80 text-slate-400">
                  <th className="px-6 py-4">Job Details</th>
                  <th className="px-6 py-4">Posted Date</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="transition-colors hover:bg-gray-50/50 group">
                    {/* Job Title and Company Info */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700">{job.title}</span>
                        <span className="text-xs flex items-center gap-1 text-slate-400 mt-0.5">
                          <Building size={12} /> {job.company} • {job.location}
                        </span>
                      </div>
                    </td>
                    
                    {/* Date Formatting */}
                    <td className="px-6 py-5 text-sm font-medium text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-slate-400" /> {job.postedDate}
                      </div>
                    </td>

                    {/* Employment Type Badge */}
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 text-[11px] font-bold bg-blue-50 text-blue-600 rounded-lg uppercase tracking-tight">
                        {job.type}
                      </span>
                    </td>

                    {/* Dynamic Moderation Status Badge */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5">
                        {job.status === "Review Pending" ? (
                          <span className="flex items-center gap-1.5 text-amber-600 font-bold text-sm bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                            <Clock size={14} /> Pending
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-red-600 font-bold text-sm bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                            <AlertTriangle size={14} /> Flagged
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Inline Action Buttons */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 transition-all rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50" title="Review Content">
                          <Eye size={20} />
                        </button>
                        <button className="p-2 transition-all rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50" title="Approve Post">
                          <CheckCircle2 size={20} />
                        </button>
                        <button className="p-2 transition-all rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50" title="Remove Post">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer - Navigation / Summary */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs font-semibold text-slate-400">Showing {jobs.length} jobs awaiting review</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-bold bg-white border border-gray-200 rounded-lg text-slate-500 hover:bg-gray-100 transition-all">Previous</button>
              <button className="px-3 py-1.5 text-xs font-bold bg-white border border-gray-200 rounded-lg text-slate-500 hover:bg-gray-100 transition-all">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Adminjob;