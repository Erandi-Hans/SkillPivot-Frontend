import React, { useState } from 'react';
import axios from 'axios';
import CompanyNavbar from '../Companynavbar/Companynavbar.jsx';
import { Send, MapPin, DollarSign, Briefcase, Clock, Monitor, Calendar, Info, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanypostaJob = () => {
  const navigate = useNavigate();

  // --- Step Selection State ---
  const [selectedCategory, setSelectedCategory] = useState(''); // මුලින්ම හිස්ව පවතී

  // --- States for Form Fields ---
  const [jobTitle, setJobTitle] = useState('Full Stack Developer Intern');
  const [stack, setStack] = useState('');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState('On-site');
  const [duration, setDuration] = useState('6 Months');
  const [stipend, setStipend] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const internshipData = {
      jobPostId: 0,
      jobTitle: jobTitle,
      description: `[Category: ${selectedCategory}] [Mode: ${workMode}] [Duration: ${duration}] [Deadline: ${deadline}] - ${description}`,
      technologyStack: stack,
      jobType: workMode,
      jobRole: "Intern",
      status: "Active",
      postedDate: new Date().toISOString(),
      companyId: 0 
    };

    try {
      const response = await axios.post('https://localhost:7118/api/JobPosts', internshipData);
      if (response.status === 201 || response.status === 200) {
        alert("Success! Your internship has been posted.");
        navigate('/company-dashboard');
      }
    } catch (error) {
      console.error("Submission Error:", error.response?.data);
      alert("Failed to post. Please check connection.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* FIXED NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-sm">
        <CompanyNavbar />
      </div>

      <main className="container max-w-5xl px-4 py-12 mx-auto pt-28">
        
        {/* STEP 1: SELECT JOB CATEGORY */}
        <div className="p-6 mb-8 bg-white border shadow-lg border-slate-200 rounded-3xl">
          <label className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
            <Search className="text-blue-600" size={24} />
            Select Internship Category
          </label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 font-semibold transition-all border-2 border-blue-100 outline-none md:w-1/2 bg-blue-50 rounded-xl focus:border-blue-500 text-slate-700"
          >
            <option value="">-- Choose a Category --</option>
            <option value="Software Engineering">Software Engineering / Full-Stack</option>
            <option value="QA Engineering">Quality Assurance (QA)</option>
            <option value="Data Science">Data Science & AI</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Network Engineering">Network Engineering</option>
          </select>
        </div>

        {/* STEP 2: GENERATE CONTENT BASED ON SELECTION */}
        {selectedCategory === 'Software Engineering' ? (
          <div className="overflow-hidden duration-500 bg-white border shadow-2xl rounded-3xl border-slate-200 animate-in fade-in">
            
            {/* Professional Header */}
            <div className="px-8 py-10 text-white bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">
              <h1 className="text-3xl font-extrabold tracking-tight">Post a Software Engineering Internship</h1>
              <p className="mt-2 text-blue-100 opacity-90">Find the best Full-stack, Frontend, or Backend talent.</p>
            </div>

            <form className="p-8 space-y-10" onSubmit={handleSubmit}>
              
              {/* Role & Tech Stack Section */}
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                  <Briefcase className="text-blue-600" size={24} />
                  Role & Technology Stack
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  
                  {/* Internship Title Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Internship Title</label>
                    <select 
                      required value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full px-4 py-3 transition-all duration-200 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Full Stack Developer Intern">Full Stack Developer Intern</option>
                      <option value="Frontend Developer Intern">Frontend Developer Intern</option>
                      <option value="Backend Developer Intern">Backend Developer Intern</option>
                  
                    </select>
                  </div>

                  {/* Tech Stack with Hover Tooltip */}
                  <div className="relative space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-bold text-slate-700">Technology Stack</label>
                      <div 
                        className="relative cursor-help text-slate-400 hover:text-blue-600"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <Info size={16} />
                        {showTooltip && (
                          <div className="absolute z-10 w-64 p-3 mb-2 text-xs leading-relaxed text-white -translate-x-1/2 rounded-lg shadow-xl bottom-full left-1/2 bg-slate-800">
                            <p className="pb-1 mb-1 font-bold border-b border-slate-600">Common Stacks:</p>
                            <ul className="pl-4 space-y-1 list-disc">
                              <li>MERN, MEAN</li>
                              <li>.NET Stack (Microsoft)</li>
                              <li>LAMP Stack (PHP/MySQL)</li>
                              <li>Python-Django Stack</li>
                              <li>Java Spring Boot Stack</li>
                            </ul>
                            <div className="absolute -translate-x-1/2 border-8 border-transparent top-full left-1/2 border-t-slate-800"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <input 
                      type="text" required value={stack}
                      onChange={(e) => setStack(e.target.value)}
                      placeholder="e.g. React, .NET Core, SQL Server" 
                      className="w-full px-4 py-3 transition-all duration-200 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Work Mode & Duration */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Work Mode</label>
                  <select value={workMode} onChange={(e) => setWorkMode(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl">
                    <option>On-site</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Duration</label>
                  <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl">
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>1 Year</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Deadline</label>
                  <input type="date" required value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl"/>
                </div>
              </div>

              {/* Location & Money */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Location</label>
                  <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Colombo, SL" className="w-full px-4 py-3 border border-slate-200 rounded-xl"/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Stipend (LKR)</label>
                  <input type="number" required value={stipend} onChange={(e) => setStipend(e.target.value)} placeholder="30000" className="w-full px-4 py-3 border border-slate-200 rounded-xl"/>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Responsibilities</label>
                <textarea rows="5" required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl"></textarea>
              </div>

              {/* Final Actions */}
              <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-100">
                <button type="button" onClick={() => setSelectedCategory('')} className="px-8 py-3 font-bold text-slate-500">Back</button>
                <button type="submit" className="flex items-center gap-2 px-12 py-4 font-bold text-white bg-blue-600 shadow-xl rounded-2xl hover:bg-blue-700 shadow-blue-200">
                  Post Internship <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        ) : selectedCategory !== '' ? (
          /* වෙනත් Category එකක් තෝරාගත් විට පෙන්වන පණිවිඩය */
          <div className="p-20 text-center bg-white border border-dashed border-slate-300 rounded-3xl">
            <h3 className="text-xl font-bold text-slate-600">Content for {selectedCategory} coming soon!</h3>
            <p className="text-slate-400">Currently, only Software Engineering category is active.</p>
          </div>
        ) : (
          /* මුලින්ම පෙන්වන හිස් ස්වභාවය */
          <div className="p-20 text-center border border-dashed bg-slate-100 border-slate-300 rounded-3xl">
            <p className="font-medium text-slate-500">Please select a category above to start posting.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompanypostaJob;