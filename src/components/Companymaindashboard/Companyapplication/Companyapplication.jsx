import React from 'react';
import CompanyNavbar from '../Maincompo/Companynavbar/Companynavbar.jsx';
import { Mail, FileUser, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';

const Companyapplication = () => {
  // Sample applicant data
  const applications = [
    {
      id: 1,
      candidate: "Alex Perera",
      email: "alex@example.com",
      position: "Full Stack Intern",
      appliedDate: "2024-03-20",
      status: "Pending",
      university: "University of Moratuwa"
    },
    {
      id: 2,
      candidate: "Sarah Silva",
      email: "sarah@example.com",
      position: "UI/UX Intern",
      appliedDate: "2024-03-18",
      status: "Interviewing",
      university: "IIT"
    },
    {
      id: 3,
      candidate: "Kasun Jayasuriya",
      email: "kasun@example.com",
      position: "Full Stack Intern",
      appliedDate: "2024-03-15",
      status: "Rejected",
      university: "SLIIT"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navigation Bar */}
      <CompanyNavbar />

      <main className="container px-4 py-8 mx-auto max-w-7xl">
        {/* Main Content Card */}
        <div className="p-8 bg-white border shadow-md rounded-3xl border-slate-200">
          
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Incoming Applications</h1>
            <p className="text-slate-500">Review and manage student applications for your posted internships.</p>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="p-5 transition-all border border-slate-100 bg-slate-50 rounded-2xl hover:border-blue-200 hover:shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  
                  {/* Candidate Info */}
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 font-bold text-blue-600 bg-blue-100 rounded-xl">
                      {app.candidate.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{app.candidate}</h3>
                      <p className="text-sm font-medium text-slate-500">{app.university}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Mail size={12} /> {app.email}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> Applied on {app.appliedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Position & Status */}
                  <div className="flex flex-col items-start gap-2 md:items-end">
                    <span className="text-sm font-semibold text-slate-700">{app.position}</span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      app.status === 'Interviewing' ? 'bg-green-100 text-green-600' : 
                      app.status === 'Rejected' ? 'bg-red-100 text-red-600' : 
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-4 border-t md:pt-0 md:border-none border-slate-200">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-600 transition-all bg-white border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white">
                      <FileUser size={16} />
                      View CV
                    </button>
                    
                    <div className="flex items-center gap-1 ml-2">
                      <button className="p-2 transition-colors rounded-lg text-slate-400 hover:text-green-600 hover:bg-green-50" title="Approve">
                        <CheckCircle size={20} />
                      </button>
                      <button className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50" title="Reject">
                        <XCircle size={20} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Empty State (Optional) */}
          {applications.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-400">No applications received yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Companyapplication;