import React, { useState, useRef } from 'react';
import AccountPreferences from '../Editprofile/Tabs/AccountPreferences/AccountPreferences.jsx';

const EditProfile = () => {

  const [activeTab, setActiveTab] = useState(null); 
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

  return (
    <div className="min-h-screen w-full bg-[#f3f2f0] flex items-center justify-center p-4 md:p-10">
      
      <div className="flex w-full max-w-[1100px] h-[90vh] bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        
        {/* Sidebar Section */}
        <aside className="flex-col hidden bg-white border-r w-80 md:flex">
          <div className="flex items-center p-6 space-x-3 border-b border-gray-100">
            <div 
              onClick={handleImageClick}
              className="relative flex-shrink-0 w-12 h-12 overflow-hidden transition bg-gray-200 border-2 border-blue-500 rounded-full cursor-pointer hover:opacity-80"
            >
              {profileImg ? (
                <img src={profileImg} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <div className="flex items-center justify-center h-full text-[10px] text-gray-500 text-center leading-tight">Click/Drop</div>
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

        {/* Main Content Section */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="w-full h-full">
            
            {/* Conditional Rendering Logic */}
            {activeTab === 'Account preferences' ? (
              <div className="min-h-full p-4 md:p-8 bg-gray-50">
                <AccountPreferences />
              </div>
            ) : activeTab === 'Sign in & security' ? (
              <div className="p-8">
                 <h2 className="text-xl font-bold">Sign in & security content</h2>
                 {/* Security component import */}
              </div>
            ) : (
             
              <div className="flex items-center justify-center w-full h-full bg-white">
                <div className="text-center">
                  <p className="italic font-medium text-gray-400"></p>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

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

export default EditProfile;