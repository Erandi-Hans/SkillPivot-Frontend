import React, { useState } from 'react';
import axios from 'axios';
import CompanyNavbar from '../Companynavbar/Companynavbar.jsx';
import { Send, MapPin, DollarSign, Briefcase, Clock, Monitor, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanypostaJob = () => {
  const navigate = useNavigate();

  // --- States for Form Fields ---
  const [jobTitle, setJobTitle] = useState('');
  const [category, setCategory] = useState('Software Engineering');
  const [stack, setStack] = useState(''); 
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState('On-site'); 
  const [duration, setDuration] = useState('6 Months'); 
  const [stipend, setStipend] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const internshipData = {
      jobPostId: 0,
      jobTitle: jobTitle,
      // Concatenating additional details into description for the backend
      description: `[Mode: ${workMode}] [Duration: ${duration}] [Deadline: ${deadline}] - ${description}`, 
      technologyStack: stack,
      jobType: workMode,
      jobRole: "Intern",
      status: "Active",
      postedDate: new Date().toISOString(),
      companyId: 0 // Replace with your logic to get current company ID
    };

    try {
      const response = await axios.post('https://localhost:7118/api/JobPosts', internshipData);
      if (response.status === 201 || response.status === 200) {
        alert("Success! Your internship has been posted.");
        navigate('/company-dashboard');
      }
    } catch (error) {
      console.error("Submission Error:", error.response?.data);
      alert("Failed to post. Please check the Company ID and connectivity.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. FIXED NAVBAR: 
          We wrap the navbar or ensure the component inside has 'fixed top-0' 
          If your CompanyNavbar doesn't have fixed positioning, we can wrap it:
      */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-sm">
        <CompanyNavbar />
      </div>

      {/* 2. CONTENT SPACING: 
          Added 'pt-24' (Padding Top) to prevent the form from being hidden under the fixed navbar.
      */}
      <main className="container max-w-5xl px-4 py-12 mx-auto pt-28"> 
        <div className="overflow-hidden bg-white border shadow-2xl rounded-3xl border-slate-200">
          
          {/* Professional Header */}
          <div className="px-8 py-10 text-white bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">
            <h1 className="text-3xl font-extrabold tracking-tight">Post a Professional Internship</h1>
            <p className="mt-2 text-blue-100 opacity-90">Specify your technology stack and find the right talent for your company.</p>
          </div>

          <form className="p-8 space-y-10" onSubmit={handleSubmit}>
            
            {/* Role & Tech Stack Section */}
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                <Briefcase className="text-blue-600" size={24} />
                Role & Technology Stack
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Internship Title</label>
                  <input 
                    type="text" required value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Full Stack Developer Intern" 
                    className="w-full px-4 py-3 transition-all duration-200 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Technology Stack</label>
                  <input 
                    type="text" required value={stack}
                    onChange={(e) => setStack(e.target.value)}
                    placeholder="e.g. React, .NET, Tailwind" 
                    className="w-full px-4 py-3 transition-all duration-200 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Work Mode & Duration Section */}
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                <Monitor className="text-blue-600" size={24} />
                Work Environment & Timeline
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Work Mode</label>
                  <select 
                    value={workMode} onChange={(e) => setWorkMode(e.target.value)}
                    className="w-full px-4 py-3 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  >
                    <option>On-site</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Duration</label>
                  <select 
                    value={duration} onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  >
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>1 Year</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Deadline</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input 
                      type="date" required value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full py-3 pl-12 pr-4 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Money */}
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                <MapPin className="text-blue-600" size={24} />
                Location & Compensation
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="relative space-y-2">
                  <label className="text-sm font-bold text-slate-700">Office Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input 
                      type="text" required value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Colombo, Sri Lanka" 
                      className="w-full py-3 pl-12 pr-4 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="relative space-y-2">
                  <label className="text-sm font-bold text-slate-700">Monthly Stipend (LKR)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input 
                      type="number" required value={stipend}
                      onChange={(e) => setStipend(e.target.value)}
                      placeholder="e.g. 30000" 
                      className="w-full py-3 pl-12 pr-4 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Clock className="text-blue-600" size={18} />
                Detailed Responsibilities
              </label>
              <textarea 
                rows="5" required value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will the intern do? What are the requirements?" 
                className="w-full px-4 py-3 transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Final Actions */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-100">
              <button 
                type="button" onClick={() => navigate(-1)}
                className="px-8 py-3 font-bold transition-colors text-slate-500 hover:text-slate-700"
              >
                Go Back
              </button>
              <button 
                type="submit" 
                className="flex items-center gap-2 px-12 py-4 font-bold text-white transition-all duration-200 bg-blue-600 shadow-xl rounded-2xl hover:bg-blue-700 shadow-blue-200 active:scale-95"
              >
                Post Internship Now
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CompanypostaJob;