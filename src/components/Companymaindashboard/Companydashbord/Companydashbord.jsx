import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CompanyNavbar from '../Maincompo/Companynavbar/Companynavbar.jsx';
import { Users, Briefcase, Clock, TrendingUp, Plus, Calendar, ArrowRight } from 'lucide-react';

const Companydashbord = () => {
  // State to manage the dynamic count of active jobs fetched from the database
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  
  // Hook to handle programmatic navigation between routes
  const navigate = useNavigate();

  // Effect hook to fetch data from the API as soon as the component mounts
  useEffect(() => {
    // GET request to retrieve all job post records
    axios.get('https://localhost:7118/api/JobPosts')
      .then(res => {
        /** * Filter logic: We only count jobs where the status is "Active".
         * We check for both lowercase 'status' and uppercase 'Status' 
         * to prevent issues with different C# JSON naming policies.
         */
        const activeOnly = res.data.filter(job => 
          job.status === "Active" || job.Status === "Active"
        );
        
        // Update state with the count of filtered active jobs
        setActiveJobsCount(activeOnly.length);
      })
      .catch(err => {
        // Log any errors related to API connectivity or data fetching
        console.error("Fetch Error:", err);
      });
  }, []);

  // Configuration array for dashboard metric cards
  const stats = [
    { 
      label: 'Active Jobs', 
      // Formatting the number to always show at least two digits (e.g., 01, 05)
      value: activeJobsCount.toString().padStart(2, '0'), 
      icon: Briefcase, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { label: 'Total Applicants', value: '124', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Pending Reviews', value: '15', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Success Rate', value: '82%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Shared Navigation Component */}
      <CompanyNavbar />

      <main className="container px-4 py-8 mx-auto max-w-7xl">
        {/* Main Dashboard Surface */}
        <div className="p-8 bg-white border shadow-md rounded-3xl border-slate-200">
          
          {/* Header Section: Title and Primary Action */}
          <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Company Overview</h1>
              <p className="text-slate-500">Welcome back! Manage your recruitment and internships effectively.</p>
            </div>
            <button 
              onClick={() => navigate('/companypostaJob')}
              className="flex items-center justify-center gap-2 px-6 py-3 font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 active:scale-95 shadow-blue-200"
            >
              <Plus size={20} />
              Post New Internship
            </button>
          </div>

          {/* Statistics Grid: Mapping through the stats array to render metric cards */}
          <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="p-6 transition-all border border-slate-100 bg-slate-50 rounded-2xl hover:shadow-inner">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold tracking-wider uppercase text-slate-400">{stat.label}</p>
                      <h3 className="mt-2 text-3xl font-extrabold text-slate-800">{stat.value}</h3>
                    </div>
                    <div className={`p-4 rounded-2xl ${stat.bg}`}>
                      <IconComponent className={stat.color} size={24} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lower Dashboard Section: Application Table and Side Insights */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            
            {/* Recent Applications Table */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800">Recent Applications</h2>
                <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
              </div>
              <div className="overflow-hidden border border-slate-100 rounded-2xl">
                <table className="w-full text-left bg-white">
                  <thead className="text-xs font-bold uppercase bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Candidate</th>
                      <th className="px-6 py-4">Position</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    {/* Placeholder static data for demonstration */}
                    <tr className="transition-colors hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-700">Alex Perera</td>
                      <td className="px-6 py-4 text-slate-500">Full Stack Intern</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 text-xs font-bold text-orange-600 bg-orange-100 rounded-full">Pending</span>
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-700">Sarah Silva</td>
                      <td className="px-6 py-4 text-slate-500">UI/UX Intern</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 text-xs font-bold text-green-600 bg-green-100 rounded-full">Interviewing</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Insights Sidebar */}
            <div>
              <h2 className="mb-4 text-xl font-bold text-slate-800">Quick Insights</h2>
              <div className="space-y-4">
                <div className="p-4 border border-blue-50 bg-blue-50/30 rounded-2xl">
                  <div className="flex gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl h-fit">
                      <Calendar className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Review HR Policy</p>
                      <p className="text-xs text-slate-500">Update your company profile to attract more applicants.</p>
                      <button className="flex items-center gap-1 mt-2 text-xs font-bold text-blue-600 transition-all hover:gap-2">
                        Update Profile <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Recruitment Tip Card */}
                <div className="p-4 border border-slate-100 bg-slate-50 rounded-2xl">
                  <p className="text-xs italic text-slate-400">
                    Pro Tip: Highlight your technology stack (MERN, .NET, etc.) to match with specific student profiles.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Companydashbord;