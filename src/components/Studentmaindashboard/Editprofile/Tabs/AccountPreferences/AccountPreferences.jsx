import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronRight, ChevronDown } from 'lucide-react';

/**
 * SettingRow Component
 * Renders an expandable accordion section for various profile settings.
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
        {/* Only display the preview value when the section is collapsed */}
        {openSection !== id && value && (
          <p className="text-sm text-gray-500 mt-0.5">{value}</p>
        )}
      </div>
      <span className="font-light text-gray-400 transition-transform group-hover:translate-x-1">
        {openSection === id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </span>
    </div>

    {/* Expanded view content with a fade-in animation */}
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
  const userId = localStorage.getItem('userId'); // Retrieve unique identifier stored during login

  // State object to hold profile data, initialized with empty strings to avoid uncontrolled input warnings
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
   * Fetches user profile data from the server upon component mounting.
   */
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.warn("No userId found in Local Storage. Redirection to login might be required.");
        return;
      }
      
      try {
        // GET request to retrieve user data by ID
        const response = await axios.get(`https://localhost:7118/api/Users/${userId}`);
        const data = response.data;
        
        // Mapping Backend keys (handling both PascalCase and camelCase) to Frontend state
        setProfileData({
          firstName: data.firstname || data.Firstname || '',
          lastName: data.lastname || data.Lastname || '',
          location: data.location || data.Location || '',
          industry: data.industry || data.Industry || '',
          email: data.email || data.Email || ''
        });
      } catch (error) {
        console.error("API Error: Failed to retrieve user profile data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  /**
   * Handles the expansion and collapse logic for setting sections.
   * @param {string} id - The ID of the section to toggle.
   */
  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  /**
   * Submits the updated profile details to the backend via a PUT request.
   */
  const handleSave = async () => {
    try {
      // Create a payload that strictly matches the Backend User model keys
      const updatePayload = {
        UserId: parseInt(userId),
        Firstname: profileData.firstName,
        Lastname: profileData.lastName,
        Location: profileData.location,
        Industry: profileData.industry,
        Email: profileData.email
      };

      // Perform the update operation via API
      await axios.put(`https://localhost:7118/api/Users/${userId}`, updatePayload);
      
      alert("Success: Profile information updated successfully!");
      setOpenSection(null); // Collapse the section after a successful save
    } catch (error) {
      console.error("Network/API Error: Update operation failed:", error);
      alert("Error: Unable to save changes. Please verify your connection.");
    }
  };

  /**
   * General change handler for all text input fields to synchronize with local state.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl pb-10 mx-auto space-y-6">
      {/* Profile Information Card */}
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
                <p className="text-sm text-gray-600">Modify your basic profile identifiers used across the platform.</p>
                
                {/* Inputs for Name */}
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

                {/* Inputs for Demographic info */}
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    name="location"
                    type="text" 
                    placeholder="Location (e.g. Colombo, Sri Lanka)" 
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                  <input 
                    name="industry"
                    type="text" 
                    placeholder="Industry (e.g. Software Engineering)" 
                    value={profileData.industry}
                    onChange={handleInputChange}
                    className="p-2 bg-white border rounded-md outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                </div>

                {/* Save Trigger */}
                <button 
                  onClick={handleSave} 
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </SettingRow>

            {/* Placeholder Rows for future implementation */}
            <SettingRow id="demo" title="Personal Demographic Information" openSection={openSection} toggleSection={toggleSection} />
            <SettingRow id="verif" title="Verifications" openSection={openSection} toggleSection={toggleSection} />
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="flex flex-wrap justify-center gap-4 py-6 text-xs text-gray-500">
        <span className="cursor-pointer hover:underline">Help Center</span>
        <span className="cursor-pointer hover:underline">Privacy Policy</span>
        <span className="cursor-pointer hover:underline">User Agreement</span>
      </div>
    </div>
  );
};

export default AccountPreferences;