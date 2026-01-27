import React, { useState } from 'react'; // Added useState for data handling
import axios from 'axios'; // Import axios for API calls
import CompanyNavbar from '../Companynavbar/Companynavbar.jsx';
import { Send, MapPin, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // For navigation after success

const CompanypostaJob = () => {
  const navigate = useNavigate();

  // --- Step 1: Define state variables for each form field ---
  const [jobTitle, setJobTitle] = useState('');
  const [category, setCategory] = useState('Software Engineering');
  const [location, setLocation] = useState('');
  const [stipend, setStipend] = useState('');
  const [description, setDescription] = useState('');

 const handleSubmit = async (e) => {
    e.preventDefault();

    // Data object sent to the backend
    const internshipData = {
        jobPostId: 0,
        jobTitle: jobTitle,
        description: description,
        technologyStack: category,
        jobType: "Full-time",
        jobRole: "Intern",
        status: "Active",
        postedDate: new Date().toISOString(),
        // CHANGE THIS: Match the ID from your GET companies response
        companyId: 0 
    };

    try {
        // Send request to the server
        const response = await axios.post('https://localhost:7118/api/JobPosts', internshipData);
        if (response.status === 201 || response.status === 200) {
            alert("Internship Posted Successfully!");
            navigate('/company-dashboard');
        }
    } catch (error) {
        // Displays the error if companyId is still not found in DB
        console.error("Error details:", error.response?.data);
        alert("Failed to post. Ensure the CompanyId is valid.");
    }
};

  return (
    <div className="min-h-screen bg-slate-100">
      <CompanyNavbar />
      <main className="container max-w-5xl px-4 py-8 mx-auto">
        <div className="p-8 bg-white border shadow-md rounded-3xl border-slate-200">
          <div className="pb-6 mb-8 border-b border-slate-100">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Post a New Internship</h1>
            <p className="mt-2 text-slate-500">Fill in the details below to find the best talent for your company.</p>
          </div>

          {/* Connect the form to our handleSubmit function */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-800">
                <span className="flex items-center justify-center w-8 h-8 text-sm text-blue-600 bg-blue-100 rounded-full">1</span>
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Internship Title</label>
                  <input 
                    type="text" 
                    required
                    value={jobTitle} // Bind state
                    onChange={(e) => setJobTitle(e.target.value)} // Update state
                    placeholder="e.g. Full Stack Developer Intern" 
                    className="w-full px-4 py-3 border outline-none border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border outline-none border-slate-200 rounded-xl"
                  >
                    <option>Software Engineering</option>
                    <option>UI/UX Design</option>
                    <option>Data Science</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-800">
                <span className="flex items-center justify-center w-8 h-8 text-sm text-blue-600 bg-blue-100 rounded-full">2</span>
                Location & Compensation
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="relative space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Colombo / Remote" 
                      className="w-full py-3 pl-12 pr-4 border outline-none border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="relative space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Monthly Stipend (LKR)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={stipend}
                      onChange={(e) => setStipend(e.target.value)}
                      placeholder="e.g. 25,000" 
                      className="w-full py-3 pl-12 pr-4 border outline-none border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-800">
                <span className="flex items-center justify-center w-8 h-8 text-sm text-blue-600 bg-blue-100 rounded-full">3</span>
                Detailed Description
              </h2>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Job Description</label>
                <textarea 
                  rows="6" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline the responsibilities..." 
                  className="w-full px-4 py-3 border outline-none border-slate-200 rounded-xl"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6">
              <button type="submit" className="flex items-center gap-2 px-8 py-3 font-bold text-white bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700">
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