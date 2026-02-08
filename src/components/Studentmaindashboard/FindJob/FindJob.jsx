import React, { useState, useMemo } from 'react';
import { Search, MapPin, Briefcase, ChevronRight, Code2, CheckCircle2, X, ArrowLeft, Layers } from 'lucide-react';
import Navbar from '../Navbar/Navbar.jsx';

/**
 * MOCK DATA: Internship listings
 */
const JOBS_DATA = [
  { id: 1, title: "Full Stack Intern", company: "TechSys SL", category: "Software Engineering / Full-Stack", subCategory: "Full Stack", stack: "MERN", location: "Colombo" },
  { id: 2, title: ".NET Developer Trainee", company: "SoftGen", category: "Software Engineering / Full-Stack", subCategory: "Full Stack", stack: ".NET", location: "Kandy" },
  { id: 3, title: "Frontend Intern", company: "Creative Web", category: "Software Engineering / Full-Stack", subCategory: "Frontend", stack: "React", location: "Remote" },
  { id: 4, title: "MEAN Stack Intern", company: "AppWorks", category: "Software Engineering / Full-Stack", subCategory: "Full Stack", stack: "MEAN", location: "Colombo" },
  { id: 5, title: "Backend Trainee", company: "DataNode", category: "Software Engineering / Full-Stack", subCategory: "Backend", stack: "Node.js", location: "Colombo" },
];

/**
 * CONFIGURATION: Updated Categories from your selection
 */
const CATEGORIES = [
  "Software Engineering / Full-Stack",
  "Mobile App Development",
  "Data Science & AI",
  "Quality Assurance (QA)",
  "UI/UX Design",
  "Network Engineering"
];

/**
 * Technical Stacks organized by Sub-Categories for Software Engineering
 */
const SE_SUB_CATEGORIES = ["Frontend", "Backend", "Full Stack"];

const STACKS_BY_SUB_CATEGORY = {
  "Full Stack": ["MERN", "MEAN", ".NET", "Java Spring Boot", "Next.js", "Django"],
  "Frontend": ["React", "Angular", "Vue", "Tailwind CSS", "JavaScript", "TypeScript"],
  "Backend": ["Node.js", "Python Django", "PHP Laravel", "Go", "Ruby on Rails", "Express"],
};

const FindJob = () => {
  // --- State Management ---
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(""); // Track Frontend/Backend/FullStack
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Filter Logic:
   * Handles Category, Sub-category, Tech Stack, and Search Query filtering.
   */
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter(job => {
      const matchesCategory = selectedCategory ? job.category === selectedCategory : true;
      const matchesSubCategory = selectedSubCategory ? job.subCategory === selectedSubCategory : true;
      const matchesStack = selectedStacks.length > 0 ? selectedStacks.includes(job.stack) : true;
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSubCategory && matchesStack && matchesSearch;
    });
  }, [selectedCategory, selectedSubCategory, selectedStacks, searchQuery]);

  // --- Event Handlers ---

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubCategory(""); // Reset sub-category on main category change
    setSelectedStacks([]);
  };

  const handleSubCategoryToggle = (subCat) => {
    setSelectedSubCategory(prev => prev === subCat ? "" : subCat);
    setSelectedStacks([]); // Reset stacks when sub-category changes
  };

  const handleStackToggle = (stack) => {
    setSelectedStacks(prev =>
      prev.includes(stack) ? prev.filter(s => s !== stack) : [...prev, stack]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <Navbar />
      </div>

      <div className="container max-w-6xl px-4 pt-32 pb-12 mx-auto">

        {/* Step 1: Initial Category Selection View */}
        {!selectedCategory ? (
          <div className="text-center duration-500 animate-in fade-in zoom-in">
            <h1 className="mb-4 text-5xl font-black tracking-tight text-slate-900">Find Your Path</h1>
            <p className="mb-12 text-xl font-medium text-slate-500">Select a category to explore internship opportunities</p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map(cat => (
                <div
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className="p-10 transition-all cursor-pointer bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-blue-500 hover:-translate-y-2 group"
                >
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
          /* Step 2: Main Filter and Listings View */
          <div className="overflow-hidden duration-700 bg-white border shadow-xl border-slate-200 rounded-3xl animate-in slide-in-from-bottom-8">

            <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50">
              <div>
                <button
                  onClick={() => setSelectedCategory("")}
                  className="flex items-center gap-2 mb-4 text-sm font-bold text-blue-600 hover:text-blue-800"
                >
                  <ArrowLeft size={16} /> Back to Categories
                </button>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{selectedCategory}</h1>
              </div>
              <div className="hidden sm:block">
                <span className="px-5 py-2 font-bold text-blue-600 border border-blue-100 bg-blue-50 rounded-2xl">
                  {filteredJobs.length} Jobs Available
                </span>
              </div>
            </div>

            <div className="p-8">
              {/* Only show sub-filters if Software Engineering is selected */}
              {selectedCategory === "Software Engineering / Full-Stack" ? (
                <>
                  {/* Sub-Category Selection (Frontend/Backend/Full Stack) */}
                  <div className="mb-8">
                    <h3 className="flex items-center gap-2 mb-4 text-sm font-black tracking-widest uppercase text-slate-400">
                      <Layers size={16} /> Select Specialization
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {SE_SUB_CATEGORIES.map(sub => (
                        <button
                          key={sub}
                          onClick={() => handleSubCategoryToggle(sub)}
                          className={`px-6 py-2.5 rounded-xl font-bold transition-all border-2 ${
                            selectedSubCategory === sub 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                            : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Filter - Only visible if a sub-category is selected */}
                  {selectedSubCategory && (
                    <div className="p-6 mb-10 border-2 border-blue-100 border-dashed bg-blue-50/30 rounded-3xl animate-in fade-in slide-in-from-top-4">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 text-white bg-blue-600 rounded-lg">
                            <Code2 size={18} />
                          </div>
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
                /* Placeholder for other categories */
                <div className="p-10 mb-10 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                  <h3 className="text-lg font-bold text-slate-400">Specializations for {selectedCategory} are coming soon!</h3>
                  <p className="text-sm text-slate-400">We are currently updating the industry-standard tech stacks for this field.</p>
                </div>
              )}

              {/* Search Bar */}
              <div className="relative mb-10 group">
                <Search className="absolute transition-colors -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 left-4 top-1/2" size={22} />
                <input
                  type="text"
                  placeholder="Search by job title or company..."
                  className="w-full py-4 pl-12 pr-6 font-medium transition-all border-2 outline-none border-slate-100 bg-slate-50/50 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white text-slate-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Listings Feed */}
              <div className="space-y-6">
                {filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {filteredJobs.map(job => (
                      <div key={job.id} className="relative p-6 transition-all bg-white border shadow-sm cursor-pointer border-slate-100 rounded-3xl hover:shadow-xl hover:border-blue-100 group">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">{job.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 mt-3">
                              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                                <Briefcase size={16} className="text-slate-400" /> {job.company}
                              </p>
                              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                                <MapPin size={16} className="text-slate-400" /> {job.location}
                              </p>
                            </div>
                          </div>
                          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-[10px] uppercase font-black tracking-widest rounded-xl border border-blue-100">
                            {job.stack}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-50">
                          <span className="text-xs font-bold uppercase text-slate-400">Full Time • Hybrid</span>
                          <div className="flex items-center gap-1 text-sm font-bold text-blue-600 transition-all opacity-0 group-hover:opacity-100">
                            View details <ChevronRight size={18} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                    <Search className="mb-4 text-slate-300" size={48} />
                    <h3 className="text-xl font-bold text-slate-800">No Internships Found</h3>
                    <p className="text-slate-500">Try adjusting your filters or search query.</p>
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