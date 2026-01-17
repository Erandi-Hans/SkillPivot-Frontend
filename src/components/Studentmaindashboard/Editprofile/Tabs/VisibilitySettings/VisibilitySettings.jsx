import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

// Moved SettingRow outside to fix the "Components created during render" error
const SettingRow = ({ id, title, value, children, openSection, toggleSection }) => (
  <div className="border-b border-gray-200">
    <div 
      className="flex items-center justify-between p-4 transition cursor-pointer hover:bg-gray-50"
      onClick={() => toggleSection(id)}
    >
      <div className="flex-1">
        <h4 className="font-medium text-gray-800">{title}</h4>
        {openSection !== id && <p className="text-sm text-gray-500">{value}</p>}
      </div>
      <div>
        {openSection === id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>
    </div>
    
    {openSection === id && (
      <div className="p-4 border-t border-gray-100 bg-gray-50 animate-fadeIn">
        {children}
      </div>
    )}
  </div>
);

const VisibilitySettings = () => {
  const [openSection, setOpenSection] = useState(null);
  const [settings, setSettings] = useState({
    profileViewing: "Your name and headline",
    pageVisit: "On",
    emailVisibility: "Anyone",
    connections: "On"
  });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSave = (section, newValue) => {
    setSettings({ ...settings, [section]: newValue });
    setOpenSection(null); 
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Visibility of your profile & network</h2>
      </div>

      <SettingRow 
        id="profile" 
        title="Profile viewing options" 
        value={settings.profileViewing}
        openSection={openSection}
        toggleSection={toggleSection}
      >
        <div className="space-y-3">
          <p className="mb-2 text-sm text-gray-600">Choose what others see when you've viewed their profile:</p>
          {["Your name and headline", "Private mode"].map((opt) => (
            <label key={opt} className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="radio" 
                name="profileView"
                checked={settings.profileViewing === opt} 
                onChange={() => setSettings({...settings, profileViewing: opt})}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
          <div className="flex mt-4 space-x-2">
            <button 
              onClick={() => handleSave('profile', settings.profileViewing)} 
              className="px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700"
            >
              Save
            </button>
            <button 
              onClick={() => setOpenSection(null)} 
              className="px-4 py-1 text-sm font-semibold border border-gray-400 rounded-full hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </SettingRow>

      <SettingRow 
        id="email" 
        title="Who can see or download your email address" 
        value={settings.emailVisibility}
        openSection={openSection}
        toggleSection={toggleSection}
      >
        <select 
          className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm"
          value={settings.emailVisibility}
          onChange={(e) => setSettings({...settings, emailVisibility: e.target.value})}
        >
          <option>Anyone</option>
          <option>Connections only</option>
          <option>Only me</option>
        </select>
        <button 
          onClick={() => handleSave('email', settings.emailVisibility)} 
          className="px-4 py-1 mt-3 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700"
        >
          Save
        </button>
      </SettingRow>

      <SettingRow 
        id="connections" 
        title="Who can see your connections" 
        value={settings.connections}
        openSection={openSection}
        toggleSection={toggleSection}
      >
         <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Show connections to your network?</span>
            <button 
              onClick={() => handleSave('connections', settings.connections === "On" ? "Off" : "On")}
              className={`px-4 py-1 rounded-full text-xs font-bold transition shadow-sm ${
                settings.connections === "On" ? "bg-green-500 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {settings.connections}
            </button>
         </div>
      </SettingRow>

      <div className="p-4 text-center">
        <button className="text-sm font-semibold text-blue-600 hover:underline">
          View all recommendations →
        </button>
      </div>
    </div>
  );
};

export default VisibilitySettings;