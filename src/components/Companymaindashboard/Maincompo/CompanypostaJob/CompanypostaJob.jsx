import React from 'react';
import CompanyNavbar from '../Companynavbar/Companynavbar.jsx';
import { Send, Briefcase, MapPin, DollarSign, FileText, ChevronRight } from 'lucide-react';

const CompanypostaJob = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Static Navigation Bar */}
      <CompanyNavbar />

      <main className="container max-w-5xl px-4 py-8 mx-auto">
        {/* Main Content Container */}
        <div className="p-8 bg-white border shadow-md rounded-3xl border-slate-200">
          
          {/* Header Section */}
          <div className="pb-6 mb-8 border-b border-slate-100">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Post a New Internship</h1>
            <p className="mt-2 text-slate-500">Fill in the details below to find the best talent for your company.</p>
          </div>

          <form className="space-y-8">
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-800">
                <span className="flex items-center justify-center w-8 h-8 text-sm text-blue-600 bg-blue-100 rounded-full">1</span>
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Job Title */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Internship Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Full Stack Developer Intern" 
                    className="w-full px-4 py-3 transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <select className="w-full px-4 py-3 transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10">
                    <option>Software Engineering</option>
                    <option>UI/UX Design</option>
                    <option>Data Science</option>
                    <option>Digital Marketing</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Location & Compensation */}
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-800">
                <span className="flex items-center justify-center w-8 h-8 text-sm text-blue-600 bg-blue-100 rounded-full">2</span>
                Location & Compensation
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Location Input */}
                <div className="relative space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="e.g. Colombo, Sri Lanka / Remote" 
                      className="w-full py-3 pl-12 pr-4 transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Salary/Stipend Input */}
                <div className="relative space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Monthly Stipend (LKR)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="e.g. 25,000 - 30,000" 
                      className="w-full py-3 pl-12 pr-4 transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Detailed Description */}
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-800">
                <span className="flex items-center justify-center w-8 h-8 text-sm text-blue-600 bg-blue-100 rounded-full">3</span>
                Detailed Description
              </h2>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Job Description & Requirements</label>
                <textarea 
                  rows="6" 
                  placeholder="Outline the responsibilities, required skills, and what the intern will learn..." 
                  className="w-full px-4 py-3 transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                ></textarea>
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
              <button 
                type="button" 
                className="px-6 py-3 font-semibold transition-all border text-slate-600 border-slate-200 rounded-xl hover:bg-slate-50"
              >
                Save as Draft
              </button>
              <button 
                type="submit" 
                className="flex items-center gap-2 px-8 py-3 font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 active:scale-95 shadow-blue-200"
              >
                Post Internship
                <Send size={18} />
              </button>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
};

export default CompanypostaJob;