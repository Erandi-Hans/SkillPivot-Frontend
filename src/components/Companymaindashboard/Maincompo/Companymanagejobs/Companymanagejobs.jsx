import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CompanyNavbar from '../Companynavbar/Companynavbar.jsx';
import { Edit, Trash2, Eye, Search, Code2 } from 'lucide-react';

const Companymanagejobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Fetch all internship posts from the backend API
   */
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://localhost:7118/api/JobPosts');
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /**
   * Delete an internship post after confirmation
   * @param {number} id - JobPostId
   */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      try {
        await axios.delete(`https://localhost:7118/api/JobPosts/${id}`);
        alert("Internship deleted successfully!");
        fetchJobs(); // Refresh the table
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete the internship.");
      }
    }
  };

  /**
   * Redirect to Post Job page with ID for editing
   * Note: Ensure App.js route is: /companypostaJob/:id?
   */
  const handleEdit = (id) => {
    navigate(`/companypostaJob/${id}`);
  };

  // Search logic: filters by job title
  const filteredJobs = jobs.filter(job =>
    (job.JobTitle || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <CompanyNavbar />

      <main className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="p-8 bg-white border shadow-md rounded-3xl border-slate-200">
          
          {/* Header & Search */}
          <div className="flex flex-col gap-6 mb-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manage Internships</h1>
              <p className="text-slate-500">View, update, or remove your listed internship opportunities.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by title..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 py-2 pl-10 pr-4 transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-hidden border border-slate-100 rounded-2xl">
            {loading ? (
              <div className="p-10 italic font-medium text-center text-slate-500">Syncing with database...</div>
            ) : (
              <table className="w-full text-left bg-white">
                <thead className="text-xs font-bold uppercase bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Internship Role & Tech Stack</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4">Posted Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <tr key={job.JobPostId} className="transition-colors hover:bg-slate-50/50">
                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-2">
                            <div>
                              <p className="text-base font-bold text-slate-800">{job.JobTitle}</p>
                              <p className="text-xs font-medium text-slate-400">{job.JobRole} • {job.JobType}</p>
                            </div>
                            
                            {/* Highlighting Technology Stack */}
                            <div className="flex flex-wrap gap-1 mt-1">
                              {job.TechnologyStack?.split(',').map((tech, index) => (
                                <span key={index} className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700 bg-blue-50 border border-blue-100 rounded-md">
                                  <Code2 size={10} />
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            job.Status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {job.Status || 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-medium text-slate-500">
                          {new Date(job.PostedDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 transition-colors rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                              <Eye size={18} />
                            </button>
                            <button 
                              onClick={() => handleEdit(job.JobPostId)}
                              className="p-2 transition-colors rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(job.JobPostId)}
                              className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 italic text-center text-slate-400">No internships found matching your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Companymanagejobs;