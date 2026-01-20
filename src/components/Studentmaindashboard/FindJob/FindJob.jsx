import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Briefcase, ChevronRight } from 'lucide-react';
import Navbar from '../Navbar/Navbar.jsx'; // Importing your Navbar component

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
  "Full Stack": ["MERN", "MEAN", ".NET", "Java Spring Boot"],
  "Frontend": ["React", "Angular", "Vue", "Next.js"],
  "Backend": ["Node.js", "Python Django", "PHP Laravel", "Go"],
  "Mobile": ["Flutter", "React Native", "Swift", "Kotlin"]
};

const FindJob = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStack, setSelectedStack] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Logic to filter jobs based on selections
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter(job => {
      const matchesCategory = selectedCategory ? job.category === selectedCategory : true;
      const matchesStack = selectedStack ? job.stack === selectedStack : true;
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStack && matchesSearch;
    });
  }, [selectedCategory, selectedStack, searchQuery]);

  // Reset stack when category changes
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat === selectedCategory ? "" : cat);
    setSelectedStack(""); 
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF] font-sans">
      {/* Fixed Navbar - Remains at the top while scrolling */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-sm">
        <Navbar />
      </div>

      {/* Main Content Area - pt-24 ensures content starts below the fixed navbar */}
      <div className="container max-w-6xl px-4 pt-24 pb-12 mx-auto">
        
        {/* Main White Card Container */}
        <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
          
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Discover Opportunities</h1>
            <p className="text-gray-600">Find the perfect internship based on your tech stack.</p>
          </div>

          {/* Search and Main Filters */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
            {/* Search Bar */}
            <div className="relative md:col-span-2">
              <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
              <input 
                type="text"
                placeholder="Search by job title or company..."
                className="w-full py-3 pl-10 pr-4 transition-all border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Selector */}
            <div className="flex flex-wrap items-center gap-2 md:col-span-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    selectedCategory === cat 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Specific Stack Filters - Appears only when a category is selected */}
          {selectedCategory && (
            <div className="p-4 mb-8 border border-blue-100 shadow-sm bg-blue-50 rounded-xl animate-fadeIn">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-blue-800">
                <Filter size={16} />
                <span>Select Specific {selectedCategory} Stack:</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {STACKS_BY_CATEGORY[selectedCategory].map(stack => (
                  <label key={stack} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio"
                      name="stack"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      checked={selectedStack === stack}
                      onChange={() => setSelectedStack(stack)}
                    />
                    <span className={`text-sm ${selectedStack === stack ? 'text-blue-700 font-bold' : 'text-gray-600 group-hover:text-blue-500'}`}>
                      {stack}
                    </span>
                  </label>
                ))}
                <button 
                  onClick={() => setSelectedStack("")}
                  className="ml-auto text-xs font-semibold text-blue-600 hover:underline"
                >
                  Clear Stack
                </button>
              </div>
            </div>
          )}

          {/* Results Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                Available Internships ({filteredJobs.length})
              </h2>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredJobs.map(job => (
                  <div key={job.id} className="p-5 transition-all bg-white border border-gray-100 shadow-sm cursor-pointer rounded-xl hover:shadow-md hover:border-blue-200 group">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 transition-colors group-hover:text-blue-600">{job.title}</h3>
                        <p className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                          <Briefcase size={14} /> {job.company}
                        </p>
                      </div>
                      <span className="bg-blue-50 text-blue-700 text-[10px] uppercase font-bold px-2 py-1 rounded">
                        {job.stack}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={14} /> {job.location}
                      </div>
                      <ChevronRight size={18} className="text-gray-300 transition-all group-hover:text-blue-500 group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-gray-200 border-dashed bg-gray-50 rounded-xl">
                <p className="text-gray-500">No internships found for the selected criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJob;