import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const PrivacyRow = ({ id, title, value, children, openSection, toggleSection }) => {
  const isOpen = openSection === id;

  return (
    <div className="text-left border-b border-gray-100 last:border-0">
      <div 
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between px-2 py-4 transition rounded-md cursor-pointer group hover:bg-gray-50"
      >
        <div className="flex-1 text-left">
          <p className="text-[15px] font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
            {title}
          </p>
          {/* Show status value only when closed */}
          {!isOpen && value && (
            <p className="text-sm text-gray-500 mt-0.5">{value}</p>
          )}
        </div>
        <span className="text-gray-400">
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </span>
      </div>

      {/* Expandable content area */}
      {isOpen && (
        <div className="p-5 my-2 text-left border border-gray-100 rounded-lg bg-gray-50 animate-fadeIn">
          {children || <p className="text-sm text-gray-600">Settings and options for {title} will appear here.</p>}
          <div className="mt-4">
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent row from closing twice
                toggleSection(null);
              }} 
              className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DataPrivacy = () => {
  const [openSection, setOpenSection] = useState(null);

  // Function to handle open/close logic
  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="max-w-2xl pb-10 mx-auto space-y-6">
      
      {/* SECTION 1: Data Usage */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6 text-left">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">How your data is used</h2>
          <div className="flex flex-col">
            <PrivacyRow 
              id="manage-data" 
              title="Manage your data and activity" 
              openSection={openSection} 
              toggleSection={toggleSection} 
            />
            <PrivacyRow 
              id="get-copy" 
              title="Get a copy of your data" 
              openSection={openSection} 
              toggleSection={toggleSection} 
            />
            <PrivacyRow 
              id="search-history" 
              title="Search history" 
              openSection={openSection} 
              toggleSection={toggleSection} 
            />
            <PrivacyRow 
              id="research" 
              title="Social, economic, and workplace research" 
              value="On" 
              openSection={openSection} 
              toggleSection={toggleSection} 
            />
            <PrivacyRow 
              id="ai-data" 
              title="Data for Generative AI Improvement" 
              value="On" 
              openSection={openSection} 
              toggleSection={toggleSection} 
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Communication Preferences */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6 text-left">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Who can reach you</h2>
          <div className="flex flex-col">
            <PrivacyRow 
              id="invitations" 
              title="Invitations to connect" 
              openSection={openSection} 
              toggleSection={toggleSection} 
            />
            <PrivacyRow 
              id="messages" 
              title="Messages" 
              openSection={openSection} 
              toggleSection={toggleSection} 
            />
            <PrivacyRow 
              id="promotions" 
              title="Account promotions" 
              openSection={openSection} 
              toggleSection={toggleSection} 
            />
          </div>
        </div>
      </section>

      {/* Footer links */}
      <div className="flex flex-wrap justify-center gap-4 py-6 text-xs text-gray-500">
        <span className="cursor-pointer hover:underline">Help Center</span>
        <span className="cursor-pointer hover:underline">Privacy Policy</span>
        <span className="cursor-pointer hover:underline">User Agreement</span>
      </div>

    </div>
  );
};

export default DataPrivacy;