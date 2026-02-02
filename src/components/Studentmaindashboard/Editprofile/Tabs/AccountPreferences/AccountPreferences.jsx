import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronRight, ChevronDown } from 'lucide-react';

/**
 * SettingRow Component
 * Renders an expandable section for profile settings.
 */
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
        {/* Display current value only when section is collapsed */}
        {openSection !== id && value && (
          <p className="text-sm text-gray-500 mt-0.5">{value}</p>
        )}
      </div>
      <span className="font-light text-gray-400 transition-transform group-hover:translate-x-1">
        {openSection === id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </span>
    </div>

    {/* Expanded view content */}
    {openSection === id && (
      <div className="p-5 my-2 border border-gray-100 rounded-lg bg-gray-50 animate-fadeIn">
        {children}
      </div>
    )}
  </div>
);

const AccountPreferences = () => {
  // --- STATE MANAGEMENT ---
  const [openSection, setOpenSection] = useState(null);
  const userId = localStorage.getItem('userId'); // Retrieve stored ID from login

  // Profile data state matching backend model keys exactly
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    industry: '',
    email: ''
  });

  const [darkMode, setDarkMode] = useState("Off");
  const [language, setLanguage] = useState("English");

  // --- API OPERATIONS ---

  /**
   * Fetch user data on component load based on stored userId.
   */
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.warn("No userId found. Please log in.");
        return;
      }
      
      try {
        // Fetching from the Users endpoint verified in Swagger
        const response = await axios.get(`https://localhost:7118/api/Users/${userId}`);
        const data = response.data;
        
        // Mapping Backend PascalCase keys to Frontend camelCase state
        setProfileData({
          firstName: data.Firstname || '',
          lastName: data.Lastname || '',
          location: data.Location || '',
          industry: data.Industry || '',
          email: data.Email || ''
        });
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  /**
   * Toggle between accordion sections.
   */
  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  /**
   * Submit updated profile data to the backend via PUT request.
   */
  const handleSave = async () => {
    try {
      const updatePayload = {
        UserId: parseInt(userId),
        Firstname: profileData.firstName,
        Lastname: profileData.lastName,
        Location: profileData.location,
        Industry: profileData.industry,
        Email: profileData.email
      };

      // Put request to the specific User ID
      await axios.put(`https://localhost:7118/api/Users/${userId}`, updatePayload);
      
      alert("Profile updated successfully!");
      setOpenSection(null);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Error saving changes. Please check your connection.");
    }
  };

  /**
   * Handle changes for all text input fields.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl pb-10 mx-auto space-y-6">
      {/* Profile Section */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Profile Information</h2>
          <div className="flex flex-col">
            <SettingRow 
              id="name-loc" 
              title="Name, Location, and Industry" 
              value={`${profileData.firstName} ${profileData.lastName}`}
              openSection={openSection} 
              toggleSection={toggleSection}
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Edit your public profile identifiers.</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    name="firstName"
                    type="text" 
                    placeholder="First Name" 
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                  <input 
                    name="lastName"
                    type="text" 
                    placeholder="Last Name" 
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input 
                    name="location"
                    type="text" 
                    placeholder="Location (e.g. Colombo)" 
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                  <input 
                    name="industry"
                    type="text" 
                    placeholder="Industry (e.g. Software)" 
                    value={profileData.industry}
                    onChange={handleInputChange}
                    className="p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                </div>

                <button 
                  onClick={handleSave} 
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </SettingRow>

            <SettingRow id="demo" title="Personal Demographic Information" openSection={openSection} toggleSection={toggleSection} />
            <SettingRow id="verif" title="Verifications" openSection={openSection} toggleSection={toggleSection} />
          </div>
        </div>
      </section>

      {/* Preferences Footer */}
      <div className="flex flex-wrap justify-center gap-4 py-6 text-xs text-gray-500">
        <span className="cursor-pointer hover:underline">Help Center</span>
        <span className="cursor-pointer hover:underline">Privacy Policy</span>
        <span className="cursor-pointer hover:underline">User Agreement</span>
      </div>
    </div>
  );
};

export default AccountPreferences;