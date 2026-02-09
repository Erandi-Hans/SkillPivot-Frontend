import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios'; 
import { Search, MapPin, Briefcase, ChevronRight, Code2, CheckCircle2, X, ArrowLeft, Layers } from 'lucide-react';
import Navbar from '../Navbar/Navbar.jsx';

// Fixed categories that represent the main sectors in the recruitment system
const CATEGORIES = [
  "Software Engineering / Full-Stack",
  "Mobile App Development",
  "Data Science & AI",
  "Quality Assurance (QA)",
  "UI/UX Design",
  "Network Engineering"
];

// Specializations specifically for the Software Engineering category
const SE_SUB_CATEGORIES = ["Frontend", "Backend", "Full Stack"];

// Predefined technology stacks categorized by specialization
const STACKS_BY_SUB_CATEGORY = {
  "Full Stack": ["MERN", "MEAN", ".NET", "Java Spring Boot", "Next.js", "Django"],
  "Frontend": ["React", "Angular", "Vue", "Tailwind CSS", "JavaScript", "TypeScript"],
  "Backend": ["Node.js", "Python Django", "PHP Laravel", "Go", "Ruby on Rails", "Express"],
};

const FindJob = () => {
  // State management for jobs data, loading status, and user filters
  const [jobs, setJobs] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(""); 
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * DATA FETCHING COMPONENT:
   * Fetches job listings from the backend API.
   * Maps PascalCase API response fields to camelCase for consistent frontend usage.
   */
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        // Connecting to the backend service via HTTPS port 7118
        const response = await axios.get('https://localhost:7118/api/JobPosts');
        
        const mappedJobs = response.data.map(item => ({
          id: item.JobPostId,
          title: item.JobTitle,
          company: item.CompanyName || "Unknown Company",
          location: item.Location || "Remote",
          category: item.Category || "",
          subCategory: item.SubCategory || "",
          stack: item.TechnologyStack || ""
        }));

        setJobs(mappedJobs);
        console.log("Mapped Jobs for UI:", mappedJobs); 
      } catch (error) {
        console.error("API Connection Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /**
   * FILTERING LOGIC:
   * Dynamically filters the job list based on Category, Sub-category, Tech Stacks, and Search Query.
   * Uses trim() and toLowerCase() to ensure high matching accuracy regardless of data format.
   */
  const filteredJobs = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return [];

    return jobs.filter(job => {
      // 1. Primary Category Filter
      const matchesCategory = selectedCategory === "" || 
        job.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase() ||
        selectedCategory.toLowerCase().includes(job.category.trim().toLowerCase());

      // 2. Sub-Category Specialization Filter
      const matchesSubCategory = selectedSubCategory === "" || 
        job.subCategory.trim().toLowerCase() === selectedSubCategory.trim().toLowerCase();

      // 3. Multi-select Tech Stack Filter
      const matchesStack = selectedStacks.length === 0 || 
        selectedStacks.some(s => s.toLowerCase() === job.stack.trim().toLowerCase());
      
      // 4. Global Search Query (Title or Company name)
      const matchesSearch = 
        (job.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        (job.company?.toLowerCase().includes(searchQuery.toLowerCase()) || false);

      return matchesCategory && matchesSubCategory && matchesStack && matchesSearch;
    });
  }, [jobs, selectedCategory, selectedSubCategory, selectedStacks, searchQuery]);

  // Handler to change the main job sector
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubCategory(""); 
    setSelectedStacks([]);
  };

  // Handler to toggle sub-specializations
  const handleSubCategoryToggle = (subCat) => {
    setSelectedSubCategory(prev => prev === subCat ? "" : subCat);
    setSelectedStacks([]); 
  };

  // Handler to add or remove technology stacks from the filter
  const handleStackToggle = (stack) => {
    setSelectedStacks(prev =>
      prev.includes(stack) ? prev.filter(s => s !== stack) : [...prev, stack]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <Navbar />
      </div>

      <div className="container max-w-6xl px-4 pt-32 pb-12 mx-auto">
        {!selectedCategory ? (
          /* INITIAL VIEW: Main Category Grid */
          <div className="text-center duration-500 animate-in fade-in zoom-in">
            <h1 className="mb-4 text-5xl font-black tracking-tight text-slate-900">Find Your Path</h1>
            <p className="mb-12 text-xl font-medium text-slate-500">Select a category to explore internship opportunities</p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map(cat => (
                <div key={cat} onClick={() => handleCategoryChange(cat)}
                  className="p-10 transition-all cursor-pointer bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-blue-500 hover:-translate-y-2 group">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-colors bg-slate-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white text-slate-400">
                    <Briefcase size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600">{cat}</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-400">Explore Openings</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* SEARCH & LISTING VIEW: Displays filtered jobs and advanced controls */
          <div className="overflow-hidden duration-700 bg-white border shadow-xl border-slate-200 rounded-3xl animate-in slide-in-from-bottom-8">
            <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50">
              <div>
                <button onClick={() => setSelectedCategory("")} className="flex items-center gap-2 mb-4 text-sm font-bold text-blue-600 hover:text-blue-800">
                  <ArrowLeft size={16} /> Back to Categories
                </button>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{selectedCategory}</h1>
              </div>
              <div className="hidden sm:block">
                <span className="px-5 py-2 font-bold text-blue-600 border border-blue-100 bg-blue-50 rounded-2xl">
                  {isLoading ? '...' : filteredJobs.length} Jobs Available
                </span>
              </div>
            </div>

            <div className="p-8">
              {/* Conditional Filters for Software Engineering */}
              {selectedCategory === "Software Engineering / Full-Stack" ? (
                <>
                  <div className="mb-8">
                    <h3 className="flex items-center gap-2 mb-4 text-sm font-black tracking-widest uppercase text-slate-400">
                      <Layers size={16} /> Select Specialization
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {SE_SUB_CATEGORIES.map(sub => (
                        <button key={sub} onClick={() => handleSubCategoryToggle(sub)}
                          className={`px-6 py-2.5 rounded-xl font-bold transition-all border-2 ${selectedSubCategory === sub ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'}`}>
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sub-category Tech Stack Selector */}
                  {selectedSubCategory && (
                    <div className="p-6 mb-10 border-2 border-blue-100 border-dashed bg-blue-50/30 rounded-3xl animate-in fade-in slide-in-from-top-4">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 text-white bg-blue-600 rounded-lg"><Code2 size={18} /></div>
                          <h3 className="text-sm font-black tracking-widest text-blue-900 uppercase">Current {selectedSubCategory} Stacks</h3>
                        </div>
                        {selectedStacks.length > 0 && (
                          <button onClick={() => setSelectedStacks([])} className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-red-500 bg-white border border-red-100 rounded-full">
                            <X size={14} /> Clear All
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {STACKS_BY_SUB_CATEGORY[selectedSubCategory].map(stack => {
                          const isSelected = selectedStacks.includes(stack);
                          return (
                            <div key={stack} onClick={() => handleStackToggle(stack)}
                              className={`flex items-center gap-3 p-3 transition-all cursor-pointer rounded-xl border-2 ${isSelected ? 'bg-white border-blue-500 shadow-sm' : 'bg-white/50 border-transparent hover:border-slate-200'}`}>
                              <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'}`}>
                                {isSelected && <CheckCircle2 size={14} />}
                              </div>
                              <span className={`text-sm font-bold ${isSelected ? 'text-blue-900' : 'text-slate-600'}`}>{stack}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Placeholder for Categories without specific sub-filters yet */
                <div className="p-10 mb-10 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                  <h3 className="text-lg font-bold text-slate-400">Specializations for {selectedCategory} are coming soon!</h3>
                </div>
              )}

              {/* Dynamic Search Input */}
              <div className="relative mb-10 group">
                <Search className="absolute transition-colors -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 left-4 top-1/2" size={22} />
                <input type="text" placeholder="Search by job title or company..."
                  className="w-full py-4 pl-12 pr-6 font-medium transition-all border-2 outline-none border-slate-100 bg-slate-50/50 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white text-slate-700"
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>

              {/* Job Results Grid */}
              <div className="space-y-6">
                {isLoading ? (
                  <div className="py-20 text-center"><p className="font-bold text-slate-500 animate-pulse">Loading live opportunities...</p></div>
                ) : filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {filteredJobs.map(job => (
                      <div key={job.id} className="relative p-6 transition-all bg-white border shadow-sm cursor-pointer border-slate-100 rounded-3xl hover:shadow-xl hover:border-blue-100 group">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">{job.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 mt-3">
                              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-500"><Briefcase size={16} /> {job.company}</p>
                              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-500"><MapPin size={16} /> {job.location}</p>
                            </div>
                          </div>
                          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-[10px] uppercase font-black tracking-widest rounded-xl border border-blue-100">{job.stack}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty State when no results match the filters */
                  <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                    <Search className="mb-4 text-slate-300" size={48} />
                    <h3 className="text-xl font-bold text-slate-800">No Internships Found</h3>
                    <p className="text-slate-500">We couldn't find any jobs matching your current filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJob;