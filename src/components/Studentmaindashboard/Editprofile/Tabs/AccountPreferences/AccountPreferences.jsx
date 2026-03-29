import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Upload, CheckCircle, Save, User, GraduationCap, 
  ShieldCheck, X, Briefcase, Code, Link as LinkIcon, 
  Phone, FileText, Award, Globe, Plus, Trash2, MapPin
} from 'lucide-react';

const AccountPreferences = () => {
  const userId = localStorage.getItem('userId');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', location: '', industry: '',
    email: '', phone: '', linkedin: '', github: '', portfolio: '', medium: '',
    targetRole: '', summary: '', experience: '',
    languages: '', university: '', degree: '', gpa: '', skills: '',
    gender: '', isVerified: false, nicDocumentPath: ''
  });

  const [projects, setProjects] = useState([
    { name: '', techStack: '', liveLink: '', githubLink: '', description: '' }
  ]);

  const [certifications, setCertifications] = useState([
    { title: '', issuedBy: '', year: '' }
  ]);

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
          medium: u.medium || '',
          targetRole: s.targetRole || '',
          summary: s.summary || '',
          experience: s.experience || '',
          languages: s.languages || '',
          university: s.university || '',
          degree: s.degree || '',
          gpa: s.gpa || '',
          skills: s.skills || '',
          gender: s.gender || '',
          isVerified: s.isVerified || false,
          nicDocumentPath: s.nicDocumentPath || ''
        });

        if (s.projects) {
          try {
            const parsed = JSON.parse(s.projects);
            if (Array.isArray(parsed)) setProjects(parsed);
          } catch (e) { console.error("Projects parse error"); }
        }

        if (s.certifications) {
          try {
            const parsed = JSON.parse(s.certifications);
            if (Array.isArray(parsed)) setCertifications(parsed);
          } catch (e) { console.error("Certifications parse error"); }
        }

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

  // Projects Logic
  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };
  const addProject = () => setProjects([...projects, { name: '', techStack: '', liveLink: '', githubLink: '', description: '' }]);
  const removeProject = (index) => setProjects(projects.filter((_, i) => i !== index));

  // Certifications Logic
  const handleCertChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };
  const addCert = () => setCertifications([...certifications, { title: '', issuedBy: '', year: '' }]);
  const removeCert = (index) => setCertifications(certifications.filter((_, i) => i !== index));

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
    const updatedSkills = profileData.skills.split(',').map(s => s.trim()).filter(s => s !== skillToRemove).join(', ');
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
        Portfolio: profileData.portfolio,
        Medium: profileData.medium
      });

      await axios.put(`https://localhost:7118/api/Students/user/${userId}`, {
        ...profileData,
        UserId: parseInt(userId),
        Projects: JSON.stringify(projects),
        Certifications: JSON.stringify(certifications)
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
    } catch (error) { alert("Upload failed."); }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Account Preferences</h1>
        <button onClick={handleSaveAll} disabled={loading} className="flex items-center gap-2 px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
          <Save size={18} /> {loading ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* 1. Personal & Social */}
      <section className="p-6 space-y-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-2 mb-2 font-semibold text-blue-600">
          <User size={20} /> <span>Personal Information & Contact Details</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input name="firstName" value={profileData.firstName} onChange={handleInputChange} placeholder="First Name" className="p-2 border rounded-md" />
          <input name="lastName" value={profileData.lastName} onChange={handleInputChange} placeholder="Last Name" className="p-2 border rounded-md" />
          <input name="targetRole" value={profileData.targetRole} onChange={handleInputChange} placeholder="Target Job Role" className="p-2 border rounded-md" />
          <input name="location" value={profileData.location} onChange={handleInputChange} placeholder="Location" className="p-2 border rounded-md" />
          <input name="phone" value={profileData.phone} onChange={handleInputChange} placeholder="Phone Number" className="p-2 border rounded-md" />
          <input name="linkedin" value={profileData.linkedin} onChange={handleInputChange} placeholder="LinkedIn URL" className="p-2 border rounded-md" />
          <input name="github" value={profileData.github} onChange={handleInputChange} placeholder="GitHub URL" className="p-2 border rounded-md" />
          <div className="grid grid-cols-2 gap-2">
            <input name="portfolio" value={profileData.portfolio} onChange={handleInputChange} placeholder="Portfolio" className="p-2 border rounded-md" />
            <input name="medium" value={profileData.medium} onChange={handleInputChange} placeholder="Medium" className="p-2 border rounded-md" />
          </div>
        </div>
      </section>

      {/* 2. Professional Summary */}
      <section className="p-6 space-y-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-2 mb-2 font-semibold text-orange-600">
          <FileText size={20} /> <span>Professional Summary</span>
        </div>
        <textarea name="summary" value={profileData.summary} onChange={handleInputChange} rows="3" className="w-full p-2 border rounded-md" placeholder="Describe your career goals..." />
      </section>

      {/* 3. Academic & Skills */}
      <section className="p-6 space-y-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-2 mb-2 font-semibold text-green-600">
          <GraduationCap size={20} /> <span>Academic & Professional Details</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <select name="university" value={profileData.university} onChange={handleInputChange} className="p-2 border rounded-md">
            <option value="">Select University</option>
            {universityList.map((uni, i) => <option key={i} value={uni}>{uni}</option>)}
          </select>
          <input name="degree" value={profileData.degree} onChange={handleInputChange} placeholder="Degree Program" className="p-2 border rounded-md" />
          <select onChange={handleSkillSelect} className="p-2 border rounded-md">
            <option value="">Choose Skills...</option>
            {techStackOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
          </select>
          <input name="languages" value={profileData.languages} onChange={handleInputChange} placeholder="Languages" className="p-2 border rounded-md" />
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

      {/* 4. Projects Section */}
      <section className="p-6 space-y-6 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center justify-between pb-2 border-b">
          <div className="flex items-center gap-2 font-semibold text-red-600">
            <Code size={20} /> <span>Projects & Portfolio</span>
          </div>
          <button onClick={addProject} className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 transition rounded-md bg-red-50 hover:bg-red-100">
            <Plus size={16} /> Add Project
          </button>
        </div>
        {projects.map((project, index) => (
          <div key={index} className="relative p-4 space-y-3 border border-gray-100 rounded-lg bg-gray-50 group">
            <button onClick={() => removeProject(index)} className="absolute text-gray-400 transition opacity-0 top-4 right-4 hover:text-red-500 group-hover:opacity-100">
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <input placeholder="Project Name" value={project.name} onChange={(e) => handleProjectChange(index, 'name', e.target.value)} className="p-2 bg-white border rounded" />
              <input placeholder="Tech Stack" value={project.techStack} onChange={(e) => handleProjectChange(index, 'techStack', e.target.value)} className="p-2 bg-white border rounded" />
              <input placeholder="Live Link" value={project.liveLink} onChange={(e) => handleProjectChange(index, 'liveLink', e.target.value)} className="p-2 bg-white border rounded" />
              <input placeholder="GitHub Link" value={project.githubLink} onChange={(e) => handleProjectChange(index, 'githubLink', e.target.value)} className="p-2 bg-white border rounded" />
            </div>
            <textarea placeholder="Description..." value={project.description} onChange={(e) => handleProjectChange(index, 'description', e.target.value)} rows="2" className="w-full p-2 bg-white border rounded" />
          </div>
        ))}
      </section>

      {/* 5. Multiple Certifications Section */}
      <section className="p-6 space-y-6 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center justify-between pb-2 border-b">
          <div className="flex items-center gap-2 font-semibold text-purple-600">
            <Award size={20} /> <span>Certifications & Achievements</span>
          </div>
          <button onClick={addCert} className="flex items-center gap-1 px-3 py-1 text-sm text-purple-600 transition rounded-md bg-purple-50 hover:bg-purple-100">
            <Plus size={16} /> Add Certificate
          </button>
        </div>
        {certifications.map((cert, index) => (
          <div key={index} className="relative p-4 space-y-3 border border-gray-100 rounded-lg bg-gray-50 group">
            <button onClick={() => removeCert(index)} className="absolute text-gray-400 transition opacity-0 top-4 right-4 hover:text-red-500 group-hover:opacity-100">
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <input placeholder="Certificate Name" value={cert.title} onChange={(e) => handleCertChange(index, 'title', e.target.value)} className="p-2 bg-white border rounded md:col-span-1" />
              <input placeholder="Issued By" value={cert.issuedBy} onChange={(e) => handleCertChange(index, 'issuedBy', e.target.value)} className="p-2 bg-white border rounded md:col-span-1" />
              <input placeholder="Year" value={cert.year} onChange={(e) => handleCertChange(index, 'year', e.target.value)} className="p-2 bg-white border rounded md:col-span-1" />
            </div>
          </div>
        ))}
      </section>

      {/* 6. Identity Verification */}
      <section className="p-6 space-y-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-2 mb-2 font-semibold text-gray-600">
          <ShieldCheck size={20} /> <span>Identity Verification</span>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-3">
            <CheckCircle className={profileData.isVerified ? "text-green-500" : "text-gray-300"} />
            <div>
              <p className="text-sm font-medium">Official ID (NIC / Student ID)</p>
              <p className="text-xs text-gray-500">{profileData.isVerified ? "Verified." : "Pending upload."}</p>
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