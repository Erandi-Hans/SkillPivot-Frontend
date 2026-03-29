import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Upload, CheckCircle, Save, User, GraduationCap, 
  ShieldCheck, ChevronDown, X, Briefcase, Code, Link as LinkIcon, Phone, FileText 
} from 'lucide-react';

const AccountPreferences = () => {
  const userId = localStorage.getItem('userId');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', location: '', industry: '',
    email: '', phone: '', linkedin: '', github: '', portfolio: '',
    summary: '',
    experience: '', // Stored as stringified JSON or formatted text
    projects: '',   // Stored as stringified JSON or formatted text
    university: '', degree: '', gpa: '', skills: '',
    gender: '', isVerified: false, nicDocumentPath: ''
  });

  const techStackOptions = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "PHP", "Go", "Rust", "Swift",
    "React", "Angular", "Vue", "Next.js", "Node.js", "Express", ".NET Core", "Django", "Flask", "Laravel",
    "MongoDB", "PostgreSQL", "MySQL", "SQL Server", "Firebase", "AWS", "Azure", "Docker", "Kubernetes",
    "Tailwind CSS", "Bootstrap", "Flutter", "React Native", "UI/UX Design", "Machine Learning"
  ];

  const universityList = [
    "University of Colombo", "University of Peradeniya", "University of Sri Jayewardenepura",
    "University of Kelaniya", "University of Moratuwa", "University of Jaffna",
    "University of Ruhuna", "The Open University of Sri Lanka", "Eastern University, Sri Lanka",
    "South Eastern University of Sri Lanka", "Rajarata University of Sri Lanka",
    "Sabaragamuwa University of Sri Lanka", "Wayamba University of Sri Lanka",
    "Uva Wellassa University of Sri Lanka", "University of the Visual & Performing Arts",
    "Gampaha Wickramarachchi University of Indigenous Medicine", "University of Vavuniya",
    "General Sir John Kotelawala Defence University (KDU)", "University of Vocational Technology (UNIVOTEC)",
    "Ocean University of Sri Lanka", "SLIATE (ATI)", "National Institute of Business Management (NIBM)",
    "SLIIT", "NSBM Green University", "CINEC Campus", "IIT", "Horizon Campus",
    "ESOFT Metro Campus", "KIU", "Aquinas College", "APIIT", "ANC Education"
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      if (!userId || userId === "null") return;
      try {
        const userRes = await axios.get(`https://localhost:7118/api/Users/${userId}`);
        const u = userRes.data;

        let s = {};
        try {
          const studentRes = await axios.get(`https://localhost:7118/api/Students/user/${userId}`);
          s = studentRes.data;
        } catch (err) {
          if (err.response?.status === 404) {
            const createRes = await axios.post(`https://localhost:7118/api/Students`, { UserId: parseInt(userId) });
            s = createRes.data;
          }
        }

        setProfileData({
          firstName: u.firstname || '',
          lastName: u.lastname || '',
          location: u.location || '',
          industry: u.industry || '',
          email: u.email || '',
          phone: u.phone || '', 
          linkedin: u.linkedin || '',
          github: u.github || '',
          portfolio: u.portfolio || '',
          summary: s.summary || '',
          experience: s.experience || '',
          projects: s.projects || '',
          university: s.university || '',
          degree: s.degree || '',
          gpa: s.gpa || '',
          skills: s.skills || '',
          gender: s.gender || '',
          isVerified: s.isVerified || false,
          nicDocumentPath: s.nicDocumentPath || ''
        });
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    fetchAllData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillSelect = (e) => {
    const selectedSkill = e.target.value;
    if (!selectedSkill) return;
    const currentSkills = profileData.skills ? profileData.skills.split(',').map(s => s.trim()) : [];
    if (!currentSkills.includes(selectedSkill)) {
      const updatedSkills = [...currentSkills, selectedSkill].join(', ');
      setProfileData(prev => ({ ...prev, skills: updatedSkills }));
    }
    e.target.value = ""; 
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = profileData.skills
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== skillToRemove)
      .join(', ');
    setProfileData(prev => ({ ...prev, skills: updatedSkills }));
  };

  const handleSaveAll = async () => {
    setLoading(true);
    try {
      await axios.put(`https://localhost:7118/api/Users/${userId}`, {
        UserId: parseInt(userId),
        Firstname: profileData.firstName,
        Lastname: profileData.lastName,
        Email: profileData.email,
        Location: profileData.location,
        Industry: profileData.industry,
        Phone: profileData.phone,
        Linkedin: profileData.linkedin,
        Github: profileData.github,
        Portfolio: profileData.portfolio
      });

      await axios.put(`https://localhost:7118/api/Students/user/${userId}`, {
        UserId: parseInt(userId),
        University: profileData.university,
        Degree: profileData.degree,
        GPA: profileData.gpa,
        Skills: profileData.skills,
        Gender: profileData.gender,
        Summary: profileData.summary,
        Experience: profileData.experience,
        Projects: profileData.projects,
        IsVerified: profileData.isVerified,
        NicDocumentPath: profileData.nicDocumentPath
      });

      alert("Profile successfully updated!");
    } catch (error) {
      alert("Error saving profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return alert("Select a file first");
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const res = await axios.post(`https://localhost:7118/api/Students/upload-nic/${userId}`, formData);
      setProfileData(prev => ({ ...prev, nicDocumentPath: res.data.path }));
      alert("Verification document uploaded!");
    } catch (error) {
      alert("Upload failed.");
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Account Preferences</h1>
        <button onClick={handleSaveAll} disabled={loading} className="flex items-center gap-2 px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
          <Save size={18} /> {loading ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* 1. Personal Information & Contacts */}
      <section className="p-6 space-y-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-2 mb-2 font-semibold text-blue-600">
          <User size={20} /> <span>Personal Information & Contact Details</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">First Name</label>
            <input name="firstName" value={profileData.firstName} onChange={handleInputChange} className="p-2 border rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Last Name</label>
            <input name="lastName" value={profileData.lastName} onChange={handleInputChange} className="p-2 border rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-1 ml-1 text-xs font-semibold text-gray-500"><Phone size={12}/> Phone Number</label>
            <input name="phone" value={profileData.phone} onChange={handleInputChange} placeholder="+94 7x xxx xxxx" className="p-2 border rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Address / Location</label>
            <input name="location" value={profileData.location} onChange={handleInputChange} className="p-2 border rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-1 ml-1 text-xs font-semibold text-gray-500"><LinkIcon size={12}/> LinkedIn URL</label>
            <input name="linkedin" value={profileData.linkedin} onChange={handleInputChange} placeholder="linkedin.com/in/username" className="p-2 border rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-1 ml-1 text-xs font-semibold text-gray-500"><Code size={12}/> GitHub / Portfolio URL</label>
            <input name="github" value={profileData.github} onChange={handleInputChange} placeholder="github.com/username" className="p-2 border rounded-md" />
          </div>
        </div>
      </section>

      {/* 2. Professional Summary */}
      <section className="p-6 space-y-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-2 mb-2 font-semibold text-orange-600">
          <FileText size={20} /> <span>Professional Summary</span>
        </div>
        <div className="flex flex-col gap-1">
          <label className="ml-1 text-xs font-semibold text-gray-500">Briefly describe your career goals and expertise</label>
          <textarea name="summary" value={profileData.summary} onChange={handleInputChange} rows="3" className="w-full p-2 border rounded-md" placeholder="e.g. Enthusiastic Full-stack Developer with a passion for building scalable web applications..." />
        </div>
      </section>

      {/* 3. Academic & Skills Details */}
      <section className="p-6 space-y-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-2 mb-2 font-semibold text-green-600">
          <GraduationCap size={20} /> <span>Academic & Professional Details</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">University / Institute</label>
            <select name="university" value={profileData.university} onChange={handleInputChange} className="p-2 border rounded-md">
              <option value="">Select University</option>
              {universityList.map((uni, i) => <option key={i} value={uni}>{uni}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Degree Program</label>
            <input name="degree" value={profileData.degree} onChange={handleInputChange} className="p-2 border rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Current GPA</label>
            <input name="gpa" value={profileData.gpa} onChange={handleInputChange} className="p-2 border rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Skills & Tech Stack</label>
            <select onChange={handleSkillSelect} className="p-2 border rounded-md">
              <option value="">Choose Skills...</option>
              {techStackOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {profileData.skills && profileData.skills.split(',').map((skill, index) => (
            skill.trim() && (
              <span key={index} className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                {skill.trim()}
                <button onClick={() => removeSkill(skill.trim())} className="hover:text-red-500"><X size={14} /></button>
              </span>
            )
          ))}
        </div>
      </section>

      {/* 4. Experience & Projects */}
      <section className="p-6 space-y-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-2 mb-2 font-semibold text-red-600">
          <Briefcase size={20} /> <span>Experience & Projects</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Work Experience / Internships</label>
            <textarea name="experience" value={profileData.experience} onChange={handleInputChange} rows="4" className="w-full p-2 border rounded-md" placeholder="Role | Company | Duration&#10;- Key responsibility 1&#10;- Key responsibility 2" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Key Projects</label>
            <textarea name="projects" value={profileData.projects} onChange={handleInputChange} rows="4" className="w-full p-2 border rounded-md" placeholder="Project Name | Tech Stack&#10;- Short description of what you built and achieved" />
          </div>
        </div>
      </section>

      {/* 5. Identity Verification */}
      <section className="p-6 space-y-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-2 mb-2 font-semibold text-purple-600">
          <ShieldCheck size={20} /> <span>Identity Verification</span>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-3">
            <CheckCircle className={profileData.isVerified ? "text-green-500" : "text-gray-300"} />
            <div>
              <p className="text-sm font-medium">Official ID (NIC / Student ID)</p>
              <p className="text-xs text-gray-500">{profileData.isVerified ? "Your identity is verified." : "Verification pending document upload."}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="file" id="fileIn" hidden onChange={(e) => setSelectedFile(e.target.files[0])} />
            <label htmlFor="fileIn" className="cursor-pointer bg-gray-200 px-4 py-1.5 rounded text-sm hover:bg-gray-300 transition">
              {selectedFile ? selectedFile.name : "Select File"}
            </label>
            <button onClick={handleFileUpload} className="bg-black text-white px-4 py-1.5 rounded text-sm flex items-center gap-1">
              <Upload size={14} /> Upload
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountPreferences;