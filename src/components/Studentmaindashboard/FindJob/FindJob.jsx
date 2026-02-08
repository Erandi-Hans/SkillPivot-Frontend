import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Briefcase, ChevronRight, Code2, CheckCircle2, X } from 'lucide-react';
import Navbar from '../Navbar/Navbar.jsx';

// Sample data for demonstration
const JOBS_DATA = [
  { id: 1, title: "Full Stack Intern", company: "TechSys SL", category: "Full Stack", stack: "MERN", location: "Colombo" },
  { id: 2, title: ".NET Developer Trainee", company: "SoftGen", category: "Full Stack", stack: ".NET", location: "Kandy" },
  { id: 3, title: "Frontend Intern", company: "Creative Web", category: "Frontend", stack: "React", location: "Remote" },
  { id: 4, title: "MEAN Stack Intern", company: "AppWorks", category: "Full Stack", stack: "MEAN", location: "Colombo" },
  { id: 5, title: "Backend Trainee", company: "DataNode", category: "Backend", stack: "Node.js", location: "Colombo" },
];

const CATEGORIES = ["Frontend", "Backend", "Full Stack", "Mobile"];

const STACKS_BY_CATEGORY = {
  "Full Stack": ["MERN", "MEAN", ".NET", "Java Spring Boot", "Next.js", "Django"],
  "Frontend": ["React", "Angular", "Vue", "Tailwind CSS", "JavaScript", "TypeScript"],
  "Backend": ["Node.js", "Python Django", "PHP Laravel", "Go", "Ruby on Rails", "Express"],
  "Mobile": ["Flutter", "React Native", "Swift", "Kotlin", "Ionic", "Xamarin"]
};

const FindJob = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  // Changed selectedStack (string) to selectedStacks (Array) for multiple selection
  const [selectedStacks, setSelectedStacks] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Filter Logic
   * Dynamically filters JOBS_DATA based on Category, Multiple Stacks, and Search keywords
   */
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter(job => {
      const matchesCategory = selectedCategory ? job.category === selectedCategory : true;
      
      // If any stacks are selected, check if the job's stack is included in the array
      const matchesStack = selectedStacks.length > 0 
        ? selectedStacks.includes(job.stack) 
        : true;

      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesStack && matchesSearch;
    });
  }, [selectedCategory, selectedStacks, searchQuery]);

  /**
   * Category change handler
   * Clears the stacks array when the main category changes
   */
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat === selectedCategory ? "" : cat);
    setSelectedStacks([]); 
  };

  /**
   * Multi-select stack handler
   * Adds or removes a stack from the selectedStacks array
   */
  const handleStackToggle = (stack) => {
    setSelectedStacks(prev => 
      prev.includes(stack) 
        ? prev.filter(s => s !== stack) // Remove if already selected
        : [...prev, stack]             // Add if not selected
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* 1. Fixed Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <Navbar />
      </div>

      <div className="container max-w-6xl px-4 pt-32 pb-12 mx-auto">
        
        {/* Main Dashboard Container */}
        <div className="overflow-hidden bg-white border shadow-xl border-slate-200 rounded-3xl">
          
          {/* Header Section */}
          <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Discover Opportunities</h1>
            <p className="mt-2 text-lg font-medium text-slate-500">
              Browse through {JOBS_DATA.length} available internships and find your match.
            </p>
          </div>

          <div className="p-8">
            {/* 2. Search & Category Filter Section */}
            <div className="flex flex-col gap-6 mb-10 lg:flex-row lg:items-center">
              <div className="relative flex-1 group">
                <Search className="absolute transition-colors -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 left-4 top-1/2" size={22} />
                <input 
                  type="text"
                  placeholder="Search by job title, company or keyword..."
                  className="w-full py-4 pl-12 pr-6 font-medium transition-all border-2 outline-none border-slate-100 bg-slate-50/50 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white text-slate-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                      selectedCategory === cat 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 transform scale-105' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Multi-Select Programming Languages & Stack List */}
            {selectedCategory && (
              <div className="p-6 mb-10 duration-500 border-2 border-blue-100 border-dashed bg-blue-50/30 rounded-3xl animate-in fade-in slide-in-from-top-4">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 text-white bg-blue-600 rounded-lg">
                      <Code2 size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black tracking-widest text-blue-900 uppercase">Available {selectedCategory} Stacks</h3>
                      <p className="text-xs font-medium text-blue-600/70">You can select multiple technologies at once</p>
                    </div>
                  </div>
                  {selectedStacks.length > 0 && (
                    <button 
                      onClick={() => setSelectedStacks([])}
                      className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-red-500 transition-colors bg-white border border-red-100 rounded-full hover:bg-red-50"
                    >
                      <X size={14} /> Clear Selection ({selectedStacks.length})
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {STACKS_BY_CATEGORY[selectedCategory].map(stack => {
                    const isSelected = selectedStacks.includes(stack);
                    return (
                      <div 
                        key={stack}
                        onClick={() => handleStackToggle(stack)}
                        className={`flex items-center gap-3 p-3 transition-all cursor-pointer rounded-xl border-2 ${
                          isSelected 
                          ? 'bg-white border-blue-500 shadow-sm' 
                          : 'bg-white/50 border-transparent hover:border-slate-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'
                        }`}>
                          {isSelected && <CheckCircle2 size={14} />}
                        </div>
                        <span className={`text-sm font-bold ${isSelected ? 'text-blue-900' : 'text-slate-600'}`}>
                          {stack}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. Results Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-extrabold text-slate-800">
                  Internship Openings <span className="px-3 py-1 ml-2 text-sm rounded-full bg-slate-100 text-slate-500">{filteredJobs.length}</span>
                </h2>
                {selectedStacks.length > 0 && (
                  <div className="flex gap-2">
                     {selectedStacks.map(s => (
                       <span key={s} className="px-2 py-1 text-[10px] font-bold text-blue-600 border border-blue-100 rounded bg-blue-50">
                         {s}
                       </span>
                     ))}
                  </div>
                )}
              </div>

              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {filteredJobs.map(job => (
                    <div key={job.id} className="relative p-6 transition-all bg-white border shadow-sm cursor-pointer border-slate-100 rounded-3xl hover:shadow-xl hover:border-blue-100 group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold transition-colors text-slate-900 group-hover:text-blue-600">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 mt-3">
                            <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                              <Briefcase size={16} className="text-slate-400" /> {job.company}
                            </p>
                            <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                              <MapPin size={16} className="text-slate-400" /> {job.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-[10px] uppercase font-black tracking-widest rounded-xl border border-blue-100">
                            {job.stack}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-50">
                        <span className="text-xs font-bold tracking-tighter uppercase text-slate-400">Full Time • Hybrid</span>
                        <div className="flex items-center gap-1 text-sm font-bold text-blue-600 transition-all -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
                          View details <ChevronRight size={18} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed bg-slate-50/50 border-slate-200 rounded-3xl">
                  <div className="p-6 mb-4 bg-white border shadow-sm border-slate-100 rounded-2xl">
                    <Search className="text-slate-300" size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">No Internships Found</h3>
                  <p className="max-w-xs mx-auto mt-2 font-medium text-slate-500">Try adjusting your filters or search query to find more opportunities.</p>
                  <button 
                    onClick={() => {setSelectedCategory(""); setSelectedStacks([]); setSearchQuery("");}}
                    className="mt-6 font-bold text-blue-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJob;