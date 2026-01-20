import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { UserRoundPen } from 'lucide-react';
import Navbar from '../Navbar/Navbar.jsx'; 

import AccountPreferences from './Tabs/AccountPreferences/AccountPreferences.jsx';
import Signsecurity from './Tabs/Signsecurity/Signsecurity.jsx';
import VisibilitySettings from './Tabs/VisibilitySettings/VisibilitySettings.jsx';
import DataPrivacy from './Tabs/DataPrivacy/DataPrivacy.jsx';

const EditProfile = () => {
  // Set initial state to 'Account preferences' as requested
  const [activeTab, setActiveTab] = useState('Account preferences'); 
  const [profileImg, setProfileImg] = useState(null); 
  const fileInputRef = useRef(null);
  const location = useLocation();

  // Ensure the page starts at the top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle profile image file selection and conversion to base64 for preview
  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImg(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      {/* Sticky Navigation bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main content container with top padding to clear the Navbar */}
      <div className="container flex items-center justify-center max-w-6xl min-h-screen px-4 pt-20 pb-12 mx-auto">
        
        {/* Main Settings Card */}
        <div className="flex w-full h-[85vh] bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 mt-4">
          
          {/* Sidebar Navigation Section */}
          <aside className="flex-col hidden bg-white border-r w-80 md:flex">
            {/* User Profile / Settings Header */}
            <div className="flex items-center p-6 space-x-3 border-b border-gray-100">
              <div 
                onClick={() => fileInputRef.current.click()}
                className="relative flex-shrink-0 w-12 h-12 overflow-hidden transition bg-gray-200 border-2 border-blue-500 rounded-full cursor-pointer hover:opacity-80"
              >
                {profileImg ? (
                  <img src={profileImg} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <div className="flex items-center justify-center h-full text-[10px] text-gray-500 text-center leading-tight font-medium">Upload</div>
                )}
              </div>
              <h1 className="text-xl font-bold text-gray-800">Settings</h1>
            </div>

            {/* Navigation links for different setting tabs */}
            <nav className="flex-1 mt-2 overflow-y-auto">
              {['Account preferences', 'Sign in & security', 'Visibility', 'Data privacy'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-6 py-4 text-[15px] font-semibold transition-all border-l-4 ${
                    activeTab === tab 
                    ? "bg-blue-50 text-blue-700 border-blue-700" 
                    : "text-gray-600 border-transparent hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content Rendering Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="w-full h-full">
              {/* Conditional rendering based on the selected tab */}
              {activeTab === 'Account preferences' && <div className="p-8 animate-fadeIn"><AccountPreferences /></div>}
              {activeTab === 'Sign in & security' && <div className="p-8 animate-fadeIn"><Signsecurity /></div>}
              {activeTab === 'Visibility' && <div className="p-8 animate-fadeIn"><VisibilitySettings /></div>}
              {activeTab === 'Data privacy' && <div className="p-8 animate-fadeIn"><DataPrivacy /></div>}

              {/* Default view if somehow no tab is active */}
              {!activeTab && (
                <div className="flex items-center justify-center h-full p-10 text-center bg-white">
                  <div className="opacity-40">
                    <UserRoundPen className="mx-auto mb-4 text-gray-400" size={60} />
                    <p className="italic text-gray-500">Please select a setting to edit your profile</p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Hidden file input for handling image uploads */}
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