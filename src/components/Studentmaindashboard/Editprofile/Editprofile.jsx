import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { UserRoundPen, Camera, Eye, Upload } from 'lucide-react';
import Navbar from '../Navbar/Navbar.jsx'; 
import axios from 'axios';

import AccountPreferences from './Tabs/AccountPreferences/AccountPreferences.jsx';
import Signsecurity from './Tabs/Signsecurity/Signsecurity.jsx';
import VisibilitySettings from './Tabs/VisibilitySettings/VisibilitySettings.jsx';
import DataPrivacy from './Tabs/DataPrivacy/DataPrivacy.jsx';

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState('Account preferences'); 
  const [profileImg, setProfileImg] = useState(null); 
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const location = useLocation();
  
  // LocalStorage එකෙන් UserId එක ගන්න, නැත්නම් default 11 ලෙස තබා ගන්න
  const userId = localStorage.getItem('userId') || 11;

  // පේජ් එක ලෝඩ් වෙද්දී දැනට තියෙන දත්ත ගෙන්වා ගන්න
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://localhost:7118/api/Users/${userId}`);
        if (response.data.profilePicture) {
          // මෙතන API එකෙන් එන පින්තූරයේ URL එක සකස් කර ගන්න
          setProfileImg(`https://localhost:7118/uploads/${response.data.profilePicture}`);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    
    fetchUserData();
  }, [location.pathname, userId]);

  // පින්තූරයක් තේරූ විට Preview පෙන්වන්න
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setProfileImg(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // ඩේටාබේස් එකට Update කිරීම
  const handleUpdateDatabase = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    // API එකේ පරාමිතිය (Parameter) සමඟ මෙය ගැලපිය යුතුයි (e.g., IFormFile profileImage)
    formData.append('profileImage', selectedFile);

    try {
      await axios.post(`https://localhost:7118/api/Users/upload-image/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Profile picture updated successfully!");
      setSelectedFile(null); // බටන් එක නැවත disable කිරීමට
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Upload failed. Make sure the API endpoint exists.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="container flex items-center justify-center max-w-6xl min-h-screen px-4 pt-24 pb-12 mx-auto">
        <div className="flex w-full h-[85vh] bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
          
          <aside className="flex-col hidden bg-white border-r w-80 md:flex">
            <div className="flex flex-col items-center p-8 space-y-4 border-b border-gray-100 bg-gray-50/50">
              
              <div className="relative group">
                {/* රවුම හරියටම තබා ගැනීමට aspect-square භාවිතා කරන්න */}
                <div className="w-32 h-32 overflow-hidden bg-gray-200 border-4 border-white rounded-full shadow-lg ring-1 ring-gray-200 aspect-square">
                  {profileImg ? (
                    <img src={profileImg} alt="Profile" className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <UserRoundPen size={48} />
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-xl font-bold text-gray-800">Edit your profile</h1>

              <div className="flex items-center gap-2 mt-2">
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="p-2 transition bg-white border border-gray-300 rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  title="Select Image"
                >
                  <Camera size={18} />
                </button>

                <button 
                  onClick={handleUpdateDatabase}
                  className={`p-2 transition rounded-full shadow-sm ${selectedFile ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  title="Update Database"
                  disabled={!selectedFile}
                >
                  <Upload size={18} />
                </button>

                <button 
                  onClick={() => profileImg && setShowViewModal(true)}
                  className={`p-2 transition bg-white border border-gray-300 rounded-full shadow-sm ${profileImg ? 'hover:bg-purple-50 hover:text-purple-600' : 'opacity-50 cursor-not-allowed'}`}
                  title="View Full Image"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <nav className="flex-1 mt-2 overflow-y-auto">
              {['Account preferences', 'Sign in & security', 'Visibility', 'Data privacy'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-8 py-4 text-[15px] font-semibold transition-all border-l-4 ${
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

          <main className="flex-1 overflow-y-auto bg-white">
            <div className="p-8 animate-fadeIn">
              {activeTab === 'Account preferences' && <AccountPreferences />}
              {activeTab === 'Sign in & security' && <Signsecurity />}
              {activeTab === 'Visibility' && <VisibilitySettings />}
              {activeTab === 'Data privacy' && <DataPrivacy />}
            </div>
          </main>
        </div>
      </div>

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />

      {/* Modal View */}
      {showViewModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowViewModal(false)}
        >
          <div className="relative max-w-3xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl">
            <button 
              className="absolute p-2 text-white transition rounded-full top-4 right-4 bg-black/50 hover:bg-black"
              onClick={() => setShowViewModal(false)}
            >
              ✕
            </button>
            <img src={profileImg} alt="Full Preview" className="max-w-full max-h-[85vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;