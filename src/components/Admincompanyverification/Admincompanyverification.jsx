import React, { useState } from 'react';
import AdminNavbar from '../Admindashboardmain/Adminnavbar/Adminnavbar.jsx'; // Ensure correct path to your Navbar
import { 
  Building2, 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Search, 
  FileText, 
  Calendar,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const Admincompanyverification = () => {
  // Sample data for pending company verifications
  const [pendingCompanies] = useState([
    {
      id: "COMP-001",
      name: "TechNova Solutions",
      industry: "Software Engineering",
      email: "contact@technova.com",
      website: "www.technova.lk",
      regDate: "Jan 22, 2026",
      status: "Pending"
    },
    {
      id: "COMP-002",
      name: "CloudNet Sri Lanka",
      industry: "Cloud Computing",
      email: "hr@cloudnet.lk",
      website: "www.cloudnet.lk",
      regDate: "Jan 23, 2026",
      status: "Pending"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* Static Global Navigation Bar */}
      <AdminNavbar />

      <main className="p-8 pt-10 mx-auto max-w-7xl">
        {/* Page Header Section */}
        <div className="flex flex-col justify-between mb-10 md:flex-row md:items-center">
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-slate-800">
              <ShieldCheck className="text-blue-600" size={32} />
              Company Verification
            </h2>
            <p className="mt-1 text-slate-500">
              Review and verify business credentials for new company registrations.
            </p>
          </div>
          
          {/* Quick Statistics for Verification Page */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-400">Pending</p>
                <p className="text-xl font-bold text-slate-800">02</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by company name or registration ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Main Verification Table */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-3xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-slate-700">Verification Requests</h3>
            <span className="text-xs font-medium text-slate-400">Total Requests: {pendingCompanies.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold tracking-widest uppercase border-b border-gray-100 bg-gray-50 text-slate-400">
                  <th className="px-6 py-4">Company Details</th>
                  <th className="px-6 py-4">Industry & Contacts</th>
                  <th className="px-6 py-4 text-center">Documents</th>
                  <th className="px-6 py-4">Submission Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingCompanies.map((company) => (
                  <tr key={company.id} className="transition-colors hover:bg-gray-50/30">
                    {/* Company Basic Info */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="p-3 text-blue-600 border border-blue-100 bg-blue-50 rounded-xl">
                          <Building2 size={24} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{company.name}</div>
                          <div className="font-mono text-xs text-slate-400">{company.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Industry and Contact Info */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-slate-600">{company.industry}</span>
                        <div className="flex items-center gap-2 text-xs text-blue-600 cursor-pointer hover:underline">
                          <ExternalLink size={12} /> {company.website}
                        </div>
                      </div>
                    </td>

                    {/* Verification Documents Action */}
                    <td className="px-6 py-5 text-center">
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 bg-gray-100 rounded-lg hover:bg-slate-200 transition-all">
                        <FileText size={14} /> View Docs
                      </button>
                    </td>

                    {/* Registration Date */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar size={14} /> {company.regDate}
                      </div>
                    </td>

                    {/* Review Actions (Approve/Reject) */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-600 border border-emerald-100 bg-emerald-50 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                          <CheckCircle size={16} /> Approve
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-red-600 border border-red-100 bg-red-50 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                          <XCircle size={16} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Empty State (If no pending requests) */}
          {pendingCompanies.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-flex p-4 mb-4 rounded-full bg-gray-50 text-slate-300">
                <ShieldCheck size={48} />
              </div>
              <h4 className="text-lg font-bold text-slate-800">All caught up!</h4>
              <p className="text-slate-500">No pending company verifications at the moment.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admincompanyverification;