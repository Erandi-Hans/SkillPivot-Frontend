import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, Clock, CheckCircle, XCircle, Search, Filter, Eye, Loader2 } from 'lucide-react';
import Navbar from '../Navbar/Navbar.jsx';

const Manageapplication = () => {
  // State to store job applications retrieved from the API
  const [applications, setApplications] = useState([]);
  // State to manage the loading status while fetching data
  const [isLoading, setIsLoading] = useState(true);
  // State to track the user's search input for filtering
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Effect hook to fetch application data when the component is mounted.
   * Connects to the .NET backend API and updates the local state.
   */
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        // Replace with dynamic user context in production (e.g., Auth state)
        const response = await axios.get('https://localhost:7118/api/JobApplications'); 
        
        // Populate the applications list with data from the database
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  /**
   * Filters the list of applications based on the search query.
   * Matches against the job title or current application status.
   */
  const filteredApplications = applications.filter(app => 
    app.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Determines the visual styling of the status badge based on the application state.
   * @param {string} status - Current state (e.g., Pending, Accepted)
   * @returns {string} Tailwind CSS class strings
   */
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
    <div className="min-h-screen bg-[#F3F2EF]">
      {/* Top navigation component */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-sm">
        <Navbar />
      </div>

      <div className="container max-w-6xl px-4 pt-24 pb-12 mx-auto">
        {/* Main content wrapper */}
        <div className="p-8 bg-white shadow-xl rounded-xl border border-gray-200 min-h-[80vh]">
          
          <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Applications</h1>
              <p className="text-sm text-gray-500">Track and manage your internship applications in one place.</p>
            </div>
            
            {/* Action controls: Filter and Search */}
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter size={16} /> Filter
              </button>
              <div className="relative">
                <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={16} />
                <input 
                  type="text" 
                  placeholder="Search applications..." 
                  className="w-full py-2 pl-10 pr-4 text-sm transition-all border border-gray-200 rounded-lg outline-none md:w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            {/* Conditional rendering for loading state */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="mt-4 font-medium text-gray-500">Loading your applications...</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Job Role & Company</th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Applied Date</th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-center text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredApplications.map((app) => (
                    <tr key={app.applicationId} className="transition-colors hover:bg-blue-50/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 text-blue-600 rounded-lg bg-blue-50">
                            <Briefcase size={20} />
                          </div>
                          <div>
                            {/* Dynamically display job details or placeholder text */}
                            <p className="text-sm font-bold text-gray-900">{app.jobTitle || "Internship Role"}</p>
                            <p className="text-xs text-gray-500">{app.companyName || "Tech Company"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock size={14} className="text-gray-400" /> 
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(app.status)}`}>
                          {app.status === 'Accepted' && <CheckCircle size={12} />}
                          {app.status === 'Rejected' && <XCircle size={12} />}
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="p-2 text-gray-400 transition-colors rounded-full hover:text-blue-600 hover:bg-blue-50" title="View Details">
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Empty state: Displays if no records are found after loading */}
            {!isLoading && filteredApplications.length === 0 && (
              <div className="py-20 text-center bg-white">
                <p className="font-medium text-gray-400">No applications found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Table summary and legend footer */}
          <div className="flex items-center justify-between px-2 pt-4 mt-8 text-xs text-gray-500 border-t border-gray-100">
            <p>Showing {filteredApplications.length} total applications</p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-yellow-400 rounded-full"></span> Pending</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Accepted</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Reviewed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manageapplication;