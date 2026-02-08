import React, { useState } from 'react';
import axios from 'axios';
import CompanyNavbar from '../Companynavbar/Companynavbar.jsx';
import { Send, MapPin, DollarSign, Briefcase, Clock, Monitor, Calendar, Info, Search, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanypostaJob = () => {
  const navigate = useNavigate();

  // --- Step Selection State ---
  const [selectedCategory, setSelectedCategory] = useState(''); 

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

  // --- Handle Submit Function ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    const internshipData = {
      jobPostId: 0, 
      jobTitle: jobTitle,
      description: `[Category: ${selectedCategory}] [Mode: ${workMode}] [Duration: ${duration}] [Deadline: ${deadline}] [Location: ${location}] [Stipend: ${stipend}] - ${description}`,
      technologyStack: stack,
      jobType: workMode,
      jobRole: "Intern",
      status: "Active",
      postedDate: new Date().toISOString(),
      companyId: 1 
    };

    try {
      const response = await axios.post('https://localhost:7118/api/JobPosts', internshipData);
      if (response.status === 201 || response.status === 200) {
        alert("Success! Your internship has been posted.");
        navigate('/company-dashboard');
      }
    } catch (error) {
      console.error("Submission Error Details:", error.response?.data);
      const errorMsg = error.response?.data?.message || "Failed to post. Please ensure the Backend is running and CompanyId is valid.";
      alert(`Error: ${errorMsg}`);
    }
  };

  /**
   * Helper function to return dynamic options based on the selected category
   * This ensures the form updates its context without changing the core UI structure.
   */
  const getCategoryData = () => {
    switch (selectedCategory) {
      case 'Software Engineering':
        return {
          titles: ["Full Stack Developer Intern", "Frontend Developer Intern", "Backend Developer Intern"],
          stacks: ["MERN Stack", ".NET Stack", "Java Spring Boot", "Python Django"],
          placeholder: "e.g. React, .NET Core, SQL Server"
        };
      case 'Mobile App Development':
        return {
          titles: ["Mobile App Developer Intern", "Flutter Developer Intern", "React Native Developer Intern", "iOS Developer (Swift)", "Android Developer (Kotlin)"],
          stacks: ["Flutter (Dart)", "React Native", "Swift / SwiftUI", "Kotlin / Jetpack Compose"],
          placeholder: "e.g. Flutter, Firebase, Dart"
        };
      case 'Data Science':
        return {
          titles: ["Data Science Intern", "Machine Learning (ML) Intern", "AI Research Intern", "Data Analyst Intern", "NLP Engineer Intern"],
          stacks: ["Python (Pandas, Scikit-learn)", "TensorFlow / PyTorch", "NLP (HuggingFace, NLTK)", "SQL & PowerBI / Tableau"],
          placeholder: "e.g. Python, TensorFlow, PyTorch, SQL"
        };
      case 'QA Engineering':
        return {
          titles: ["QA Automation Intern", "Manual Testing Intern", "Software Tester Intern", "Performance Testing Intern"],
          stacks: ["Selenium / Cypress", "Jest / Mocha", "Appium (Mobile Testing)", "Postman (API Testing)"],
          placeholder: "e.g. Selenium, Java, Cypress, Postman"
        };
      case 'UI/UX Design':
        return {
          titles: ["UI/UX Design Intern", "Product Designer Intern", "Visual Designer Intern", "User Researcher Intern"],
          stacks: ["Figma / Adobe XD", "User Research & Prototyping", "Wireframing", "Interaction Design"],
          placeholder: "e.g. Figma, Adobe Creative Suite, Sketch"
        };
      case 'Network Engineering':
        return {
          titles: ["Network Engineer Intern", "Cloud Engineer Intern", "Cyber Security Intern", "DevOps Intern"],
          stacks: ["Cisco CCNA Tools", "AWS / Azure / GCP", "Docker & Kubernetes", "Network Security Protocols"],
          placeholder: "e.g. AWS, Docker, Linux, Wireshark"
        };
      default:
        return { titles: [], stacks: [], placeholder: "" };
    }
  };

  const categoryData = getCategoryData();

  /**
   * Reusable form component to maintain design consistency across all categories
   */
  const renderJobForm = (title, subtitle) => (
    <div className="overflow-hidden duration-500 bg-white border shadow-2xl rounded-3xl border-slate-200 animate-in fade-in">
      <div className="px-8 py-10 text-white bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">
        <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
        <p className="mt-2 text-blue-100 opacity-90">{subtitle}</p>
      </div>

      <form className="p-8 space-y-10" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <Briefcase className="text-blue-600" size={24} />
            Role & Technology Stack
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Internship Title</label>
              <select 
                required value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-3 transition-all duration-200 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                {categoryData.titles.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

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
                      <p className="pb-1 mb-1 font-bold border-b border-slate-600">Suggested Stacks:</p>
                      <ul className="pl-4 space-y-1 list-disc">
                        {categoryData.stacks.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                      <div className="absolute -translate-x-1/2 border-8 border-transparent top-full left-1/2 border-t-slate-800"></div>
                    </div>
                  )}
                </div>
              </div>
              <input 
                type="text" required value={stack}
                onChange={(e) => setStack(e.target.value)}
                placeholder={categoryData.placeholder} 
                className="w-full px-4 py-3 transition-all duration-200 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Metadata Section */}
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

        {/* Location & Stipend Section */}
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

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Responsibilities & Requirements</label>
          <textarea rows="5" required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl" placeholder="Describe the intern's daily tasks and required skills..."></textarea>
        </div>

        <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-100">
          <button type="button" onClick={() => setSelectedCategory('')} className="px-8 py-3 font-bold text-slate-500">Back</button>
          <button type="submit" className="flex items-center gap-2 px-12 py-4 font-bold text-white bg-blue-600 shadow-xl rounded-2xl hover:bg-blue-700 shadow-blue-200">
            Post Internship <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="fixed top-0 left-0 right-0 z-50 shadow-sm">
        <CompanyNavbar />
      </div>

      <main className="container max-w-5xl px-4 py-12 mx-auto pt-28">
        
        {/* Step 1: Category Selection */}
        <div className="p-6 mb-8 bg-white border shadow-lg border-slate-200 rounded-3xl">
          <label className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
            <Search className="text-blue-600" size={24} />
            Select Internship Category
          </label>
          <select 
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              // Initialize default title based on selected category
              const data = getCategoryData();
              if (e.target.value !== '') setJobTitle(data.titles[0]);
            }}
            className="w-full px-4 py-3 font-semibold transition-all border-2 border-blue-100 outline-none md:w-1/2 bg-blue-50 rounded-xl focus:border-blue-500 text-slate-700"
          >
            <option value="">-- Choose a Category --</option>
            <option value="Software Engineering">Software Engineering / Full-Stack</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Data Science">Data Science & AI</option>
            <option value="QA Engineering">Quality Assurance (QA)</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Network Engineering">Network Engineering</option>
          </select>
        </div>

        {/* Step 2: Form Rendering Logic */}
        {selectedCategory === '' ? (
          <div className="p-20 text-center border border-dashed bg-slate-100 border-slate-300 rounded-3xl">
            <p className="font-medium text-slate-500">Please select a category above to start posting.</p>
          </div>
        ) : (
          renderJobForm(
            `Post a ${selectedCategory} Internship`, 
            `Find the best ${selectedCategory} talent for your company.`
          )
        )}
      </main>
    </div>
  );
};

export default CompanypostaJob;