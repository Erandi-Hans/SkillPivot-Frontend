import React, { useState } from 'react';
import { FileText, Wand2, CheckCircle, Download, UploadCloud } from 'lucide-react';
import Navbar from '../Navbar/Navbar.jsx'; 

const Cvgenerate = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulating AI Processing delay
    setTimeout(() => {
      setIsGenerating(false);
      setIsCompleted(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF] font-sans">
      {/* Fixed Navbar Container */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-sm">
        <Navbar />
      </div>

      {/* Main Content Area - Added padding top to avoid overlap with fixed navbar */}
      <div className="container px-4 pt-24 pb-12 mx-auto">
        
        {/* White Centered Box for CV Generation */}
        <div className="max-w-4xl p-8 mx-auto bg-white border border-gray-200 shadow-md rounded-2xl">
          
          {/* Title Section */}
          <div className="pb-4 mb-8 border-b">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Wand2 className="text-blue-600" /> AI CV Optimizer
            </h1>
            <p className="mt-1 text-gray-600">
              Tailor your resume to match the specific job requirements automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left Side: Input Fields */}
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Upload Your Current CV (PDF/Docx)
                </label>
                <div className="p-8 text-center transition-colors border-2 border-gray-200 border-dashed cursor-pointer rounded-xl hover:border-blue-400 bg-gray-50">
                  <UploadCloud className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-xs text-gray-500">Click to upload or drag and drop</p>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Paste the Job Description 
                </label>
                <textarea 
                  rows="8"
                  className="w-full p-4 text-sm transition-all border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Paste the requirements of the job you are applying for..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                ></textarea>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={!jobDescription || isGenerating}
                className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                  isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Wand2 size={18} /> Optimize My CV
                  </>
                )}
              </button>
            </div>

            {/* Right Side: Preview & Status */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center min-h-[400px]">
              {!isGenerating && !isCompleted && (
                <div className="text-center">
                  <div className="inline-block p-4 mb-4 text-gray-300 bg-white rounded-full shadow-sm">
                    <FileText size={48} />
                  </div>
                  <p className="text-sm text-gray-500">Fill the details to see the AI preview</p>
                </div>
              )}

              {isGenerating && (
                <div className="w-full space-y-4 animate-pulse">
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                  <p className="pt-4 font-medium text-center text-blue-600">Identifying key skills and keywords...</p>
                </div>
              )}

              {isCompleted && (
                <div className="w-full text-center animate-fadeIn">
                  <CheckCircle className="mx-auto mb-4 text-green-500" size={54} />
                  <h2 className="mb-2 text-xl font-bold text-gray-900">CV Optimized Successfully!</h2>
                  <p className="mb-6 text-sm text-gray-600">
                    Your CV has been tailored to match this job role.
                  </p>
                  
                  <div className="p-4 mb-6 text-left bg-white border border-green-100 rounded-xl">
                    <p className="mb-2 text-xs font-bold text-green-700 uppercase">AI Improvements:</p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>• Keywords from job description added.</li>
                      <li>• Skills section prioritized.</li>
                      <li>• Summary adjusted for better matching.</li>
                    </ul>
                  </div>

                  <button className="flex items-center justify-center w-full gap-2 py-3 text-white transition-all bg-gray-900 rounded-xl hover:bg-black">
                    <Download size={18} /> Download Tailored CV
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

export default Cvgenerate;