import React, { useState, useRef } from 'react';

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState('Account preferences');
  const [profileImg, setProfileImg] = useState(null); 
  const fileInputRef = useRef(null); 

  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImg(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  // දකුණු පස ඇති අයිතමයක් Click කළ විට Tab එක වෙනස් කරන Function එක
  const handleRowClick = (category) => {
    setActiveTab(category);
  };

  return (
    // මුළු පිටුවම මැදට ගැනීමට flex items-center justify-center භාවිතා කර ඇත
    <div className="min-h-screen w-full bg-[#f3f2f0] flex items-center justify-center p-4 md:p-10">
      
      {/* ප්‍රධාන Settings Window එක - උපරිම පළල සහ උස සීමා කර ඇත */}
      <div className="flex w-full max-w-[1100px] h-[90vh] bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        
        {/* Sidebar Section (වම් පස) */}
        <aside className="flex-col hidden bg-white border-r w-80 md:flex">
          <div className="flex items-center p-6 space-x-3">
            <div 
              onClick={handleImageClick}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="relative flex-shrink-0 w-12 h-12 overflow-hidden transition bg-gray-200 border-2 border-blue-500 rounded-full cursor-pointer hover:opacity-80"
            >
              {profileImg ? (
                <img src={profileImg} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <div className="flex items-center justify-center h-full text-[10px] text-gray-500 text-center leading-tight">
                  Click/Drop
                </div>
              )}
            </div>
            <h1 className="text-xl font-bold text-gray-800">Settings</h1>
          </div>

          <nav className="flex-1 mt-2 overflow-y-auto">
            {['Account preferences', 'Sign in & security', 'Visibility', 'Data privacy', 'Advertising data', 'Notifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-6 py-4 text-[15px] font-semibold transition border-l-4 ${
                  activeTab === tab 
                  ? "bg-gray-50 text-green-700 border-green-700" 
                  : "text-gray-600 border-transparent hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Section (දකුණු පස) */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-50 md:p-8">
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Section 1: Profile Information */}
            <div className="overflow-hidden bg-white border rounded-lg shadow-sm">
              <div className="p-5">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">Profile information</h2>
                <div className="divide-y divide-gray-100">
                  <SettingRow 
                    title="Name, location, and industry" 
                    onClick={() => handleRowClick('Account preferences')} 
                  />
                  <SettingRow 
                    title="Personal demographic information" 
                    onClick={() => handleRowClick('Account preferences')} 
                  />
                  <SettingRow 
                    title="Verifications" 
                    onClick={() => handleRowClick('Sign in & security')} 
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Display */}
            <div className="overflow-hidden bg-white border rounded-lg shadow-sm">
              <div className="p-5">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">Display</h2>
                <SettingRow 
                    title="Dark mode" 
                    onClick={() => handleRowClick('Account preferences')} 
                />
              </div>
            </div>

            {/* Section 3: General Preferences */}
            <div className="overflow-hidden bg-white border rounded-lg shadow-sm">
              <div className="p-5">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">General preferences</h2>
                <div className="divide-y divide-gray-100">
                  <SettingRow title="Language" onClick={() => handleRowClick('Account preferences')} />
                  <SettingRow title="Content language" onClick={() => handleRowClick('Account preferences')} />
                  <SettingRow title="Autoplay videos" value="On" onClick={() => handleRowClick('Account preferences')} />
                  <SettingRow title="Sound effects" value="On" onClick={() => handleRowClick('Account preferences')} />
                  <SettingRow title="Showing profile photos" value="All LinkedIn members" onClick={() => handleRowClick('Visibility')} />
                  <SettingRow title="Preferred feed view" value="Most relevant posts" onClick={() => handleRowClick('Account preferences')} />
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files[0])}
      />
    </div>
  );
};

// Row එකක් Click කළ හැකි පරිදි onClick Event එක එක් කළා
const SettingRow = ({ title, value, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between px-2 py-4 transition rounded-md cursor-pointer group hover:bg-gray-50"
  >
    <div className="flex-1">
      <p className="text-[15px] font-medium text-gray-700 group-hover:text-blue-600 underline-offset-2 group-hover:underline">
        {title}
      </p>
      {value && <p className="mt-1 text-sm text-gray-500">{value}</p>}
    </div>
    <span className="font-light text-gray-400 transition-all transform group-hover:text-gray-600 group-hover:translate-x-1">
      →
    </span>
  </div>
);

export default EditProfile;