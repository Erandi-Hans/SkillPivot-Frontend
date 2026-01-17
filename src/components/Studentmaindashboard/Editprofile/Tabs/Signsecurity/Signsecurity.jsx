import React, { useState } from 'react';


const SecurityRow = ({ id, title, value, children, openSection, toggleSection }) => (
  <div className="border-b border-gray-100 last:border-0">
    <div 
      onClick={() => toggleSection(id)}
      className="flex items-center justify-between px-2 py-5 transition cursor-pointer group hover:bg-gray-50"
    >
      <div className="flex-1">
        <p className="text-[15px] font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
          {title}
        </p>
        {openSection !== id && value && (
          <p className="mt-1 text-sm font-normal text-gray-500">{value}</p>
        )}
      </div>
      <span className={`ml-4 transition-transform ${openSection === id ? 'rotate-90' : 'group-hover:translate-x-1'} font-light text-gray-400`}>
        →
      </span>
    </div>

    
    {openSection === id && (
      <div className="p-5 mt-2 rounded-lg bg-gray-50 animate-fadeIn">
        {children}
      </div>
    )}
  </div>
);

const Signsecurity = () => {
  const [openSection, setOpenSection] = useState(null);
  const [emails, setEmails] = useState("erandi2287hansika@gmail.com");

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleSave = () => {
    
    setOpenSection(null);
  };

  return (
    <div className="max-w-2xl pb-12 mx-auto space-y-6">
      
      {/* SECTION 1: Account Access */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Account access</h2>
          <p className="mb-4 text-sm text-gray-500">Select an option to make changes.</p>
          
          <div className="flex flex-col">
            {/* Email Section */}
            <SecurityRow 
              id="email"
              title="Email addresses" 
              value={emails}
              openSection={openSection}
              toggleSection={toggleSection}
            >
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-600">Primary email</p>
                <input 
                  type="email" 
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  className="w-full p-2 bg-white border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-3">
                  <button onClick={handleSave} className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition">Save Changes</button>
                  <button onClick={() => setOpenSection(null)} className="px-4 py-1.5 border border-gray-400 rounded-full text-sm font-semibold hover:bg-gray-100 transition">Cancel</button>
                </div>
              </div>
            </SecurityRow>

            {/* Change Password Section */}
            <SecurityRow 
              id="password"
              title="Change password" 
              value="Choose a unique password to protect your account" 
              openSection={openSection}
              toggleSection={toggleSection}
            >
              <div className="space-y-4">
                <input 
                  type="password" 
                  placeholder="Current password"
                  className="w-full p-2 bg-white border border-gray-300 rounded-md outline-none"
                />
                <input 
                  type="password" 
                  placeholder="New password"
                  className="w-full p-2 bg-white border border-gray-300 rounded-md outline-none"
                />
                <button onClick={handleSave} className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700">Update Password</button>
              </div>
            </SecurityRow>
          </div>
        </div>
      </section>

      {/* SECTION 2: Added Protection */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Added protection</h2>
          <div className="flex flex-col">
            <SecurityRow 
              id="2fa"
              title="Two-step verification" 
              value="Off" 
              openSection={openSection}
              toggleSection={toggleSection}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Secure your account with two-step verification.</p>
                <button className="px-4 py-1 text-sm font-bold text-white bg-blue-600 rounded-full">Turn On</button>
              </div>
            </SecurityRow>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Signsecurity;