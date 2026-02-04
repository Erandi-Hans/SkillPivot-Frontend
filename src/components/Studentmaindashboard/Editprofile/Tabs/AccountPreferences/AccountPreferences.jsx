import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, Save, User, GraduationCap, ShieldCheck } from 'lucide-react';

const AccountPreferences = () => {
  const userId = localStorage.getItem('userId');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', location: '', industry: '',
    email: '', password: '', role: '',
    university: '', degree: '', gpa: '', skills: '',
    gender: '', isVerified: false, nicDocumentPath: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAll = async () => {
    setLoading(true);
    try {
      // 1. Update User Table
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

      // 2. Update Student Table
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
      alert("Error saving profile. Check console for details.");
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
          <input name="firstName" placeholder="First Name" value={profileData.firstName} onChange={handleInputChange} className="p-2 border rounded-md" />
          <input name="lastName" placeholder="Last Name" value={profileData.lastName} onChange={handleInputChange} className="p-2 border rounded-md" />
          <input name="location" placeholder="Location" value={profileData.location} onChange={handleInputChange} className="p-2 border rounded-md" />
          <input name="industry" placeholder="Industry" value={profileData.industry} onChange={handleInputChange} className="p-2 border rounded-md" />
          <select name="gender" value={profileData.gender} onChange={handleInputChange} className="p-2 border rounded-md">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input name="email" placeholder="Email Address" value={profileData.email} disabled className="p-2 border rounded-md cursor-not-allowed bg-gray-50" />
        </div>
      </section>

      {/* 2. Academic Details */}
      <section className="p-6 space-y-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-2 mb-2 font-semibold text-green-600">
          <GraduationCap size={20} /> <span>Academic & Professional Details</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input name="university" placeholder="University" value={profileData.university} onChange={handleInputChange} className="p-2 border rounded-md" />
          <input name="degree" placeholder="Degree Program" value={profileData.degree} onChange={handleInputChange} className="p-2 border rounded-md" />
          <input name="gpa" placeholder="GPA" value={profileData.gpa} onChange={handleInputChange} className="p-2 border rounded-md" />
          <input name="skills" placeholder="Skills (e.g. React, SQL)" value={profileData.skills} onChange={handleInputChange} className="p-2 border rounded-md" />
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