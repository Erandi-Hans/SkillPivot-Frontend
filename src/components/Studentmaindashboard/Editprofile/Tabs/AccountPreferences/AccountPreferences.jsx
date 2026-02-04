import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, Save, User, GraduationCap, ShieldCheck, ChevronDown, X } from 'lucide-react';

const AccountPreferences = () => {
  const userId = localStorage.getItem('userId');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Profile data state matching User and Student table fields
  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', location: '', industry: '',
    email: '', password: '', role: '',
    university: '', degree: '', gpa: '', skills: '',
    gender: '', isVerified: false, nicDocumentPath: ''
  });

  // Predefined list of popular programming languages and tech stacks
  const techStackOptions = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "PHP", "Go", "Rust", "Swift",
    "React", "Angular", "Vue", "Next.js", "Node.js", "Express", ".NET Core", "Django", "Flask", "Laravel",
    "MongoDB", "PostgreSQL", "MySQL", "SQL Server", "Firebase", "AWS", "Azure", "Docker", "Kubernetes",
    "Tailwind CSS", "Bootstrap", "Flutter", "React Native", "UI/UX Design", "Machine Learning"
  ];

  // List of Higher Education Institutions in Sri Lanka
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

  /**
   * Fetch all user and student details when the component mounts.
   */
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
          firstName: u.firstname || u.Firstname || '',
          lastName: u.lastname || u.Lastname || '',
          location: u.location || u.Location || '',
          industry: u.industry || u.Industry || '',
          email: u.email || u.Email || '',
          password: u.password || u.Password || '',
          role: u.role || u.Role || '',
          university: s.university || s.University || '',
          degree: s.degree || s.Degree || '',
          gpa: s.gpa || s.GPA || '',
          skills: s.skills || s.Skills || '',
          gender: s.gender || s.Gender || '',
          isVerified: s.isVerified || s.IsVerified || false,
          nicDocumentPath: s.nicDocumentPath || s.NicDocumentPath || ''
        });
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    fetchAllData();
  }, [userId]);

  /**
   * Updates state when simple input fields change.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Logic to handle multi-select skills. 
   * It converts the string from DB to an array and back to a string.
   */
  const handleSkillSelect = (e) => {
    const selectedSkill = e.target.value;
    if (!selectedSkill) return;

    const currentSkills = profileData.skills ? profileData.skills.split(',').map(s => s.trim()) : [];
    
    if (!currentSkills.includes(selectedSkill)) {
      const updatedSkills = [...currentSkills, selectedSkill].join(', ');
      setProfileData(prev => ({ ...prev, skills: updatedSkills }));
    }
    e.target.value = ""; // Reset dropdown
  };

  /**
   * Removes a specific skill tag.
   */
  const removeSkill = (skillToRemove) => {
    const updatedSkills = profileData.skills
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== skillToRemove)
      .join(', ');
    setProfileData(prev => ({ ...prev, skills: updatedSkills }));
  };

  /**
   * Save all changes to the server.
   */
  const handleSaveAll = async () => {
    setLoading(true);
    try {
      await axios.put(`https://localhost:7118/api/Users/${userId}`, {
        UserId: parseInt(userId),
        Firstname: profileData.firstName,
        Lastname: profileData.lastName,
        Email: profileData.email,
        Password: profileData.password,
        Role: profileData.role,
        Location: profileData.location,
        Industry: profileData.industry
      });

      await axios.put(`https://localhost:7118/api/Students/user/${userId}`, {
        UserId: parseInt(userId),
        University: profileData.university,
        Degree: profileData.degree,
        GPA: profileData.gpa,
        Skills: profileData.skills,
        Gender: profileData.gender,
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

      {/* 1. Personal Information */}
      <section className="p-6 space-y-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-2 mb-2 font-semibold text-blue-600">
          <User size={20} /> <span>Personal Information & Demographics</span>
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
            <label className="ml-1 text-xs font-semibold text-gray-500">Address / Location</label>
            <input name="location" value={profileData.location} onChange={handleInputChange} className="p-2 border rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Industry</label>
            <input name="industry" value={profileData.industry} onChange={handleInputChange} className="p-2 border rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Gender</label>
            <select name="gender" value={profileData.gender} onChange={handleInputChange} className="p-2 border rounded-md">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Email Address</label>
            <input name="email" value={profileData.email} disabled className="p-2 border rounded-md cursor-not-allowed bg-gray-50" />
          </div>
        </div>
      </section>

      {/* 2. Academic & Skills Details */}
      <section className="p-6 space-y-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-2 mb-2 font-semibold text-green-600">
          <GraduationCap size={20} /> <span>Academic & Professional Details</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">University / Institute</label>
            <div className="relative">
              <select name="university" value={profileData.university} onChange={handleInputChange} className="w-full p-2 pr-10 bg-white border rounded-md appearance-none">
                <option value="">Select University</option>
                {universityList.map((uni, i) => <option key={i} value={uni}>{uni}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Degree Program</label>
            <input name="degree" value={profileData.degree} onChange={handleInputChange} className="p-2 border rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Current GPA</label>
            <input name="gpa" value={profileData.gpa} onChange={handleInputChange} className="p-2 border rounded-md" />
          </div>

          {/* NEW: Multi-select Skills Implementation */}
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-gray-500">Skills & Tech Stack</label>
            <div className="relative">
              <select onChange={handleSkillSelect} className="w-full p-2 pr-10 bg-white border rounded-md appearance-none">
                <option value="">Choose Skills...</option>
                {techStackOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        {/* Skill Tags Preview Area */}
        <div className="flex flex-wrap gap-2 mt-2">
          {profileData.skills && profileData.skills.split(',').map((skill, index) => (
            skill.trim() && (
              <span key={index} className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                {skill.trim()}
                <button onClick={() => removeSkill(skill.trim())} className="hover:text-red-500">
                  <X size={14} />
                </button>
              </span>
            )
          ))}
        </div>
      </section>

      {/* 3. Identity Verification */}
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