import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

// Moved SettingRow outside to follow best practices and avoid re-render issues
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
        {/* Show current value only when the section is closed */}
        {openSection !== id && value && (
          <p className="text-sm text-gray-500 mt-0.5">{value}</p>
        )}
      </div>
      <span className="font-light text-gray-400 transition-transform group-hover:translate-x-1">
        {openSection === id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </span>
    </div>

    {/* Expandable Edit Window */}
    {openSection === id && (
      <div className="p-5 my-2 border border-gray-100 rounded-lg bg-gray-50 animate-fadeIn">
        {children}
      </div>
    )}
  </div>
);

const AccountPreferences = () => {
  const [openSection, setOpenSection] = useState(null);
  const [darkMode, setDarkMode] = useState("Off");
  const [language, setLanguage] = useState("English");

  // Toggle logic to open/close sections
  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleSave = () => {
    // Add logic here to update database via API
    setOpenSection(null);
  };

  return (
    <div className="max-w-2xl pb-10 mx-auto space-y-6">
      
      {/* SECTION 1: Profile Information */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Profile information</h2>
          <div className="flex flex-col">
            <SettingRow 
              id="name-loc" 
              title="Name, location, and industry" 
              openSection={openSection} 
              toggleSection={toggleSection}
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Update your basic profile identifiers.</p>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="p-2 border rounded-md outline-none focus:ring-1 focus:ring-blue-500" />
                  <input type="text" placeholder="Last Name" className="p-2 border rounded-md outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <button onClick={handleSave} className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700">Save</button>
              </div>
            </SettingRow>
            <SettingRow id="demo" title="Personal demographic information" openSection={openSection} toggleSection={toggleSection} />
            <SettingRow id="verif" title="Verifications" openSection={openSection} toggleSection={toggleSection} />
          </div>
        </div>
      </section>

      {/* SECTION 2: Display */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Display</h2>
          <SettingRow 
            id="darkmode" 
            title="Dark mode" 
            value={darkMode}
            openSection={openSection} 
            toggleSection={toggleSection}
          >
            <div className="space-y-3">
              {["On", "Off"].map((opt) => (
                <label key={opt} className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={darkMode === opt} 
                    onChange={() => setDarkMode(opt)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{opt}</span>
                </label>
              ))}
              <button onClick={handleSave} className="mt-2 px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold">Save</button>
            </div>
          </SettingRow>
        </div>
      </section>

      {/* SECTION 3: General Preferences */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">General preferences</h2>
          <div className="flex flex-col">
            <SettingRow 
              id="lang" 
              title="Language" 
              value={language}
              openSection={openSection} 
              toggleSection={toggleSection}
            >
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-md outline-none"
              >
                <option>English</option>
                <option>Sinhala</option>
                <option>Tamil</option>
              </select>
              <button onClick={handleSave} className="mt-4 px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold">Update Language</button>
            </SettingRow>
            
            {/* You can add more SettingRow components here for other preferences */}
            <SettingRow id="content-lang" title="Content language" value="English" openSection={openSection} toggleSection={toggleSection} />
            <SettingRow id="autoplay" title="Autoplay videos" value="On" openSection={openSection} toggleSection={toggleSection} />
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <div className="flex flex-wrap justify-center gap-4 py-6 text-xs text-gray-500">
        <span className="cursor-pointer hover:underline">Help Center</span>
        <span className="cursor-pointer hover:underline">Privacy Policy</span>
        <span className="cursor-pointer hover:underline">Accessibility</span>
        <span className="cursor-pointer hover:underline">User Agreement</span>
      </div>

    </div>
  );
};

export default AccountPreferences;