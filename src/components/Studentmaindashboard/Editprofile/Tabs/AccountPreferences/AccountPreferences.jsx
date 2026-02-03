import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronRight, ChevronDown, Upload, CheckCircle } from 'lucide-react';

const SettingRow = ({ id, title, value, children, openSection, toggleSection }) => (
  <div className="border-b border-gray-100 last:border-0">
    <div 
      onClick={() => toggleSection(id)}
      className="flex items-center justify-between px-2 py-4 transition rounded-md cursor-pointer group hover:bg-gray-50"
    >
      <div className="flex-1">
        <p className="text-[15px] font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
          {title}
        </p>
        {openSection !== id && value && (
          <p className="text-sm text-gray-500 mt-0.5">{value}</p>
        )}
      </div>
      <span className="font-light text-gray-400 transition-transform group-hover:translate-x-1">
        {openSection === id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </span>
    </div>
    {openSection === id && (
      <div className="p-5 my-2 border border-gray-100 rounded-lg bg-gray-50 animate-fadeIn">
        {children}
      </div>
    )}
  </div>
);

const AccountPreferences = () => {
  const [openSection, setOpenSection] = useState(null);
  const userId = localStorage.getItem('userId'); 

  // State management for all profile fields including User, Student, and Demographics
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    industry: '',
    email: '',
    university: '',
    degree: '',
    gpa: '',
    skills: '',
    gender: '', // New demographic field
    isVerified: false // New verification status
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId || userId === "null") {
        console.warn("No userId found in Local Storage.");
        return;
      }
      
      try {
        // Fetch basic user and student details from the backend
        const userResponse = await axios.get(`https://localhost:7118/api/Users/${userId}`);
        const userData = userResponse.data;

        try {
            const studentResponse = await axios.get(`https://localhost:7118/api/Students/user/${userId}`);
            const studentData = studentResponse.data;
            
            setProfileData({
                firstName: userData.firstname || '',
                lastName: userData.lastname || '',
                location: userData.location || '',
                industry: userData.industry || '',
                email: userData.email || '',
                university: studentData.university || '',
                degree: studentData.degree || '',
                gpa: studentData.gpa || '',
                skills: studentData.skills || '',
                gender: userData.gender || '', // Assuming gender is stored in Users table
                isVerified: userData.isVerified || false
            });
        } catch (studentErr) {
            console.log("Student profile details not found.");
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  // Function to handle all profile updates
  const handleSave = async () => {
    if (!userId) return;

    try {
      // Payload for general user information
      const userPayload = {
        UserId: parseInt(userId),
        Firstname: profileData.firstName,
        Lastname: profileData.lastName,
        Location: profileData.location,
        Industry: profileData.industry,
        Email: profileData.email,
        Gender: profileData.gender
      };
      await axios.put(`https://localhost:7118/api/Users/${userId}`, userPayload);

      // Payload for student-specific academic information
      const studentPayload = {
        UserId: parseInt(userId),
        University: profileData.university,
        Degree: profileData.degree,
        GPA: profileData.gpa,
        Skills: profileData.skills
      };
      await axios.put(`https://localhost:7118/api/Students/user/${userId}`, studentPayload);
      
      alert("Success: Your profile has been updated!");
      setOpenSection(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Error: Changes could not be saved.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Mock function for NIC/ID verification upload
  const handleVerifyUpload = () => {
    if(selectedFile) {
        alert(`File "${selectedFile.name}" uploaded successfully for verification!`);
        // Logic to send file to backend would go here
    } else {
        alert("Please select a file first.");
    }
  };

  return (
    <div className="max-w-2xl pb-10 mx-auto space-y-6">
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Profile Information</h2>
          <div className="flex flex-col">
            
            {/* 1. Basic Info Section */}
            <SettingRow 
              id="name-loc" 
              title="Name, Location, and Industry" 
              value={`${profileData.firstName} ${profileData.lastName}`}
              openSection={openSection} 
              toggleSection={toggleSection}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input name="firstName" type="text" placeholder="First Name" value={profileData.firstName} onChange={handleInputChange} className="p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" />
                  <input name="lastName" type="text" placeholder="Last Name" value={profileData.lastName} onChange={handleInputChange} className="p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="location" type="text" placeholder="Location" value={profileData.location} onChange={handleInputChange} className="p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" />
                  <input name="industry" type="text" placeholder="Industry" value={profileData.industry} onChange={handleInputChange} className="p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <button onClick={handleSave} className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">Save Changes</button>
              </div>
            </SettingRow>

            {/* 2. Education & Student Details Section */}
            <SettingRow 
              id="education" 
              title="Education and Skills" 
              value={profileData.university ? `${profileData.university} - ${profileData.degree}` : "Add academic details"}
              openSection={openSection} 
              toggleSection={toggleSection}
            >
              <div className="space-y-4">
                <input name="university" type="text" placeholder="University" value={profileData.university} onChange={handleInputChange} className="w-full p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" />
                <input name="degree" type="text" placeholder="Degree Program" value={profileData.degree} onChange={handleInputChange} className="w-full p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="gpa" type="text" placeholder="GPA" value={profileData.gpa} onChange={handleInputChange} className="p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" />
                  <input name="skills" type="text" placeholder="Skills (e.g. React, C#)" value={profileData.skills} onChange={handleInputChange} className="p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <button onClick={handleSave} className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">Save Education Info</button>
              </div>
            </SettingRow>

            {/* 3. Personal Demographic Information Section */}
            <SettingRow 
              id="demo" 
              title="Personal Demographic Information" 
              value={profileData.gender ? `Gender: ${profileData.gender}` : "Specify gender"}
              openSection={openSection} 
              toggleSection={toggleSection} 
            >
               <div className="space-y-4">
                <p className="text-sm text-gray-600">This information helps us build a more inclusive community.</p>
                <select 
                    name="gender" 
                    value={profileData.gender} 
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <button onClick={handleSave} className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">Save Demographics</button>
              </div>
            </SettingRow>

            {/* 4. Verifications (NIC/ID Upload) Section */}
            <SettingRow 
              id="verif" 
              title="Verifications" 
              value={profileData.isVerified ? "Status: Verified" : "Status: Not Verified"}
              openSection={openSection} 
              toggleSection={toggleSection} 
            >
               <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={18} className={profileData.isVerified ? "text-green-500" : "text-gray-300"} />
                    <span>Identity Verification (NIC / Student ID)</span>
                </div>
                <div className="p-4 text-center transition-colors bg-white border-2 border-gray-200 border-dashed rounded-lg hover:border-blue-400">
                    <input type="file" id="nicUpload" className="hidden" onChange={handleFileChange} />
                    <label htmlFor="nicUpload" className="flex flex-col items-center cursor-pointer">
                        <Upload size={24} className="mb-2 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">{selectedFile ? selectedFile.name : "Click to upload your NIC or Student ID"}</span>
                        <span className="mt-1 text-xs text-gray-400">PDF, JPG or PNG (Max 5MB)</span>
                    </label>
                </div>
                <button onClick={handleVerifyUpload} className="w-full py-2 text-sm font-medium text-white transition-colors bg-gray-800 rounded-md hover:bg-black">Submit for Verification</button>
              </div>
            </SettingRow>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountPreferences;