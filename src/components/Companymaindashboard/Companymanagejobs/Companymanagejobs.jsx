import React from 'react';
import CompanyNavbar from '../Maincompo/Companynavbar/Companynavbar.jsx';
import { Edit, Trash2, Eye, MoreVertical, Search, Filter } from 'lucide-react';

const Companymanagejobs = () => {
  // Sample data for demonstration - Replace with your backend data later
  const jobs = [
    { id: 1, title: 'Full Stack Developer Intern', category: 'Engineering', applicants: 45, status: 'Active', postedDate: '2024-03-10' },
    { id: 2, title: 'UI/UX Design Intern', category: 'Design', applicants: 12, status: 'Active', postedDate: '2024-03-12' },
    { id: 3, title: 'Marketing Intern', category: 'Marketing', applicants: 8, status: 'Closed', postedDate: '2024-02-28' },
    { id: 4, title: 'Data Science Intern', category: 'Data Science', applicants: 24, status: 'Draft', postedDate: '2024-03-15' },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navigation Bar */}
      <CompanyNavbar />

      <main className="container px-4 py-8 mx-auto max-w-7xl">
        {/* Main Content Card */}
        <div className="p-8 bg-white border shadow-md rounded-3xl border-slate-200">
          
          {/* Header & Search Section */}
          <div className="flex flex-col gap-6 mb-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manage Internships</h1>
              <p className="text-slate-500">Track and manage your posted internship opportunities.</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search jobs..." 
                  className="w-64 py-2 pl-10 pr-4 transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500"
                />
              </div>
              {/* Filter Button */}
              <button className="flex items-center gap-2 px-4 py-2 font-semibold border text-slate-600 border-slate-200 rounded-xl hover:bg-slate-50">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          {/* Jobs Table Container */}
          <div className="overflow-hidden border border-slate-100 rounded-2xl">
            <table className="w-full text-left bg-white">
              <thead className="text-xs font-bold uppercase bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-4">Internship Role</th>
                  <th className="px-6 py-4 text-center">Applicants</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Posted Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-bold text-slate-800">{job.title}</p>
                        <p className="text-xs text-slate-500">{job.category}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 font-semibold text-blue-600 rounded-full bg-blue-50">
                        {job.applicants}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        job.status === 'Active' ? 'bg-green-100 text-green-600' : 
                        job.status === 'Closed' ? 'bg-red-100 text-red-600' : 
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-medium text-slate-500">
                      {job.postedDate}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Applicants Button */}
                        <button className="p-2 transition-colors rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50" title="View Details">
                          <Eye size={18} />
                        </button>
                        {/* Edit Button */}
                        <button className="p-2 transition-colors rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50" title="Edit Job">
                          <Edit size={18} />
                        </button>
                        {/* Delete Button */}
                        <button className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50" title="Delete Job">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Placeholder */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-slate-500">Showing 1 to 4 of 12 results</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-semibold border rounded-lg cursor-not-allowed text-slate-400 border-slate-200">Previous</button>
              <button className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">Next</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Companymanagejobs;