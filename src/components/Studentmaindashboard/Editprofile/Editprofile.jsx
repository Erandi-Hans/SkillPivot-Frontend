import React, { useState, useRef } from 'react';

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const [profileImg, setProfileImg] = useState(null); // Image එක store කිරීමට
  const fileInputRef = useRef(null); // File input එකට link එකක්

  // File එකක් තෝරාගත් විට ක්‍රියාත්මක වන function එක
  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImg(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Click කළ විට file explorer open කිරීම
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Drag and Drop හසුරුවන ආකාරය
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <aside className="hidden bg-white border-r w-72 md:block">
        <div className="flex items-center p-6 space-x-3">
          {/* Profile Image Clickable Area */}
          <div 
            onClick={handleImageClick}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="relative w-12 h-12 overflow-hidden transition bg-gray-200 border-2 border-blue-500 rounded-full cursor-pointer hover:opacity-80"
          >
            {profileImg ? (
              <img src={profileImg} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <div className="flex items-center justify-center h-full text-[10px] text-gray-500 text-center">
                Click/Drop
              </div>
            )}
          </div>
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        </div>

        <nav className="mt-2">
          {['Account preferences', 'Sign in & security', 'Visibility', 'Data privacy', 'Advertising data', 'Notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-6 py-3 text-sm font-medium transition ${
                activeTab === tab 
                ? "bg-gray-50 text-green-700 border-l-4 border-green-700" 
                : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Section */}
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto overflow-hidden bg-white border rounded-lg shadow-sm">
          
          {/* Section 1: Profile Information */}
          <div className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Profile information</h2>
            <div className="space-y-1">
              <SettingRow title="Name, location, and industry" />
              <SettingRow title="Personal demographic information" />
              <SettingRow title="Verifications" />
            </div>
          </div>

          <hr />

          {/* Section 2: Display */}
          <div className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Display</h2>
            <SettingRow title="Dark mode" />
          </div>

          <hr />

          {/* Section 3: General Preferences */}
          <div className="p-6">
            <h2 className="mb-4 text-lg font-semibold">General preferences</h2>
            <div className="space-y-1">
              <SettingRow title="Language" />
              <SettingRow title="Content language" />
              <SettingRow title="Autoplay videos" value="On" />
              <SettingRow title="Sound effects" value="On" />
              <SettingRow title="Showing profile photos" value="All LinkedIn members" />
              <SettingRow title="Preferred feed view" value="Most relevant posts" />
            </div>
          </div>
        </div>
      </main>

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

// එකම වගේ පේළි (Rows) නැවත නැවත ලිවීම වැළැක්වීමට Component එකක්
const SettingRow = ({ title, value }) => (
  <div className="flex items-center justify-between px-2 py-4 transition rounded-md cursor-pointer group hover:bg-gray-50">
    <div className="flex-1">
      <p className="text-[15px] font-medium text-gray-800">{title}</p>
      {value && <p className="text-sm text-gray-500">{value}</p>}
    </div>
    <span className="font-light text-gray-400">→</span>
  </div>
);

export default EditProfile;