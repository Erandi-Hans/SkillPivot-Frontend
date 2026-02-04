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
    gender: '', 
    isVerified: false 
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId || userId === "null") return;
      
      try {
        const userResponse = await axios.get(`https://localhost:7118/api/Users/${userId}`);
        const userData = userResponse.data;

        let studentData = {};
        try {
          const studentResponse = await axios.get(`https://localhost:7118/api/Students/user/${userId}`);
          studentData = studentResponse.data;
        } catch (studentErr) {
          if (studentErr.response && studentErr.response.status === 404) {
            // Auto-create missing student profile
            const newStudentPayload = {
              UserId: parseInt(userId),
              University: "",
              Degree: "",
              GPA: "",
              Skills: "",
              Gender: "",
              IsVerified: false,
              NicDocumentPath: ""
            };
            const createRes = await axios.post(`https://localhost:7118/api/Students`, newStudentPayload);
            studentData = createRes.data;
          }
        }

        setProfileData({
          firstName: userData.firstname || userData.Firstname || '',
          lastName: userData.lastname || userData.Lastname || '',
          location: userData.location || userData.Location || '',
          industry: userData.industry || userData.Industry || '',
          email: userData.email || userData.Email || '',
          university: studentData.university || studentData.University || '',
          degree: studentData.degree || studentData.Degree || '',
          gpa: studentData.gpa || studentData.GPA || '',
          skills: studentData.skills || studentData.Skills || '',
          gender: studentData.gender || studentData.Gender || '', 
          isVerified: studentData.isVerified || studentData.IsVerified || false
        });

      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSave = async () => {
    if (!userId) return;

    try {
      // .NET API එක බලාපොරොත්තු වන PascalCase Payload එක
      const userPayload = {
        UserId: parseInt(userId),
        Firstname: profileData.firstName,
        Lastname: profileData.lastName,
        Location: profileData.location,
        Industry: profileData.industry,
        Email: profileData.email
      };
      await axios.put(`https://localhost:7118/api/Users/${userId}`, userPayload);

      const studentPayload = {
        UserId: parseInt(userId),
        University: profileData.university,
        Degree: profileData.degree,
        GPA: profileData.gpa,
        Skills: profileData.skills,
        Gender: profileData.gender,
        IsVerified: profileData.isVerified,
        NicDocumentPath: "" // අනිවාර්යයෙන්ම හිස් string එකක් හෝ අගයක් යැවිය යුතුයි
      };
      await axios.put(`https://localhost:7118/api/Students/user/${userId}`, studentPayload);
      
      alert("පැතිකඩ සාර්ථකව යාවත්කාලීන කරන ලදී!");
      setOpenSection(null);
    } catch (error) {
      console.error("Save error:", error);
      alert("දත්ත සුරැකීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl pb-10 mx-auto space-y-6">
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">පැතිකඩ සැකසුම්</h2>
          <div className="flex flex-col">
            
            <SettingRow 
              id="name-loc" 
              title="නම සහ ලිපිනය" 
              value={`${profileData.firstName} ${profileData.lastName}`}
              openSection={openSection} 
              toggleSection={setOpenSection}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input name="firstName" type="text" placeholder="මුල් නම" value={profileData.firstName} onChange={handleInputChange} className="p-2 border rounded-md" />
                  <input name="lastName" type="text" placeholder="අග නම" value={profileData.lastName} onChange={handleInputChange} className="p-2 border rounded-md" />
                </div>
                <button onClick={handleSave} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full">Update Identity</button>
              </div>
            </SettingRow>

            <SettingRow 
              id="education" 
              title="අධ්‍යාපන සුදුසුකම්" 
              value={profileData.university ? `${profileData.university}` : "Not provided"}
              openSection={openSection} 
              toggleSection={setOpenSection}
            >
              <div className="space-y-4">
                <input name="university" type="text" placeholder="විශ්වවිද්‍යාලය" value={profileData.university} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
                <input name="degree" type="text" placeholder="උපාධිය" value={profileData.degree} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
                <button onClick={handleSave} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full">Update Education</button>
              </div>
            </SettingRow>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountPreferences;