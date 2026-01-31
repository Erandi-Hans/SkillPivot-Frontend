import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyNavbar from '../Companynavbar/Companynavbar.jsx';
import { Edit, Trash2, Eye, Search, Filter } from 'lucide-react';

const Companymanagejobs = () => {
  // State to store internship data fetched from the database
  const [jobs, setJobs] = useState([]);
  // State to handle search input
  const [searchTerm, setSearchTerm] = useState("");
  // State for loading status
  const [loading, setLoading] = useState(true);

  // Fetch data from the Backend API when the component loads
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // GET request to retrieve all job posts
        const response = await axios.get('https://localhost:7118/api/JobPosts');
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs from database:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /**
   * Filter the jobs based on the search term.
   * Note: We check for 'JobTitle' as per your SQL Database schema.
   */
  const filteredJobs = jobs.filter(job =>
    (job.JobTitle || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <CompanyNavbar />

      <main className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="p-8 bg-white border shadow-md rounded-3xl border-slate-200">
          
          {/* Header & Search Section */}
          <div className="flex flex-col gap-6 mb-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manage Internships</h1>
              <p className="text-slate-500">Track and manage your posted internship opportunities from the database.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search jobs..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 py-2 pl-10 pr-4 transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 font-semibold border text-slate-600 border-slate-200 rounded-xl hover:bg-slate-50">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          {/* Jobs Table Container */}
          <div className="overflow-hidden border border-slate-100 rounded-2xl">
            {loading ? (
              <div className="p-10 font-bold text-center text-slate-500">Loading Internships...</div>
            ) : (
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
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <tr key={job.JobPostId} className="transition-colors hover:bg-slate-50/50">
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-bold text-slate-800">{job.JobTitle}</p>
                            <p className="text-xs text-slate-500">{job.JobRole} - {job.JobType}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-flex items-center justify-center w-10 h-10 font-semibold text-blue-600 rounded-full bg-blue-50">
                            {/* If you don't have an applicants count in DB yet, you can use a placeholder */}
                            0
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            job.Status === 'Active' ? 'bg-green-100 text-green-600' : 
                            'bg-red-100 text-red-600'
                          }`}>
                            {job.Status}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-medium text-slate-500">
                          {/* Formatting SQL Date to a readable format */}
                          {job.PostedDate ? new Date(job.PostedDate).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 transition-colors rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50" title="View Details">
                              <Eye size={18} />
                            </button>
                            <button className="p-2 transition-colors rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50" title="Edit Job">
                              <Edit size={18} />
                            </button>
                            <button className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50" title="Delete Job">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-slate-500">No internships found in the database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Info */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-slate-500">Showing {filteredJobs.length} results</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-semibold border rounded-lg text-slate-400 border-slate-200">Previous</button>
              <button className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">Next</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Companymanagejobs;