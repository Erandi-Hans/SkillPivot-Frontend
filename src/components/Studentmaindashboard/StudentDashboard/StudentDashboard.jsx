import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar.jsx'; 
import { 
  MoreHorizontal, 
  ThumbsUp, 
  MessageSquare, 
  Repeat2, 
  Send, 
  Plus, 
  Info,
  Image as ImageIcon,
  Video,
  Newspaper,
  User,
  Eye 
} from 'lucide-react';

const StudentDashboard = () => {
  // State to store fetched user profile information
  const [userData, setUserData] = useState({ 
    firstName: '', 
    lastName: '', 
    profilePicture: '', 
    industry: '' 
  });
  
  // Get the current userId from localStorage, fallback to default ID 11
  const userId = localStorage.getItem('userId') || 11;

  /**
   * Fetches the user data from the backend API.
   * Matches property names exactly with the C# Backend (PascalCase).
   */
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://localhost:7118/api/Users/${userId}`);
      
      // Debugging: Log response to ensure ProfilePicture is arriving from DB
      console.log("Fetched Dashboard Data:", response.data);

      const data = response.data;

      setUserData({
        // Match properties with Backend: response.data.Firstname, response.data.ProfilePicture
        firstName: data.Firstname || 'User',
        lastName: data.Lastname || '',
        // Construct the full URL for the image stored in wwwroot/uploads
        profilePicture: data.ProfilePicture 
          ? `https://localhost:7118/uploads/${data.ProfilePicture}` 
          : null,
        industry: data.Industry || "Undergraduate"
      });
    } catch (error) {
      console.error("Critical: Error loading dashboard user data", error);
    }
  };

  /**
   * Effect hook to fetch data on component mount or when userId changes.
   * Also listens for 'profileUpdate' events to keep UI in sync.
   */
  useEffect(() => {
    fetchUserData();

    // Listen for custom profile update events (e.g., from Edit Profile page)
    window.addEventListener('profileUpdate', fetchUserData);
    
    return () => {
      window.removeEventListener('profileUpdate', fetchUserData);
    };
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#F3F2EF] font-sans">
      <Navbar />

      <main className="grid max-w-6xl grid-cols-12 gap-5 px-4 mx-auto mt-6">
        
        {/* Left Sidebar - User Identity Card */}
        <div className="col-span-12 space-y-2 lg:col-span-3">
          <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="h-14 bg-[#A0B4B7] relative">
               {/* Quick View/Edit Button overlay */}
               <button 
                 onClick={() => window.location.href = '/edit-profile'} 
                 className="absolute p-1 transition rounded-full top-2 right-2 bg-white/50 hover:bg-white"
                 title="View Profile"
               >
                 <Eye size={16} className="text-gray-700" />
               </button>
            </div>
            
            <div className="px-3 pb-4">
              <div className="relative flex flex-col items-center text-center -top-8">
                {/* Profile Picture Container */}
                <div className="w-16 h-16 overflow-hidden bg-white border-2 border-white rounded-full shadow-sm aspect-square">
                   {userData.profilePicture ? (
                     <img 
                       src={userData.profilePicture} 
                       alt="Profile" 
                       className="object-cover w-full h-full"
                       // Error fallback: If file is missing on server, show placeholder
                       onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} 
                     />
                   ) : (
                     <div className="flex items-center justify-center h-full text-gray-400 bg-gray-200">
                       <User size={32} />
                     </div>
                   )}
                </div>

                <h3 className="mt-3 font-semibold text-gray-800 cursor-pointer hover:underline">
                  {userData.firstName} {userData.lastName}
                </h3>
                
                <p className="mt-1 text-xs leading-tight text-gray-500">
                  {userData.industry} | Faculty of Technology
                </p>
                
                {/* Profile Action Button */}
                <button 
                  onClick={() => window.location.href = '/edit-profile'}
                  className="px-3 py-1 mt-3 text-xs font-bold text-blue-600 transition border border-blue-600 rounded-full hover:bg-blue-50"
                >
                  View My Profile
                </button>
              </div>

              {/* Engagement Stats */}
              <div className="pt-3 mt-4 space-y-2 border-t border-gray-100">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-500">Profile viewers</span>
                  <span className="font-bold text-blue-600">21</span>
                </div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-500">Post impressions</span>
                  <span className="font-bold text-blue-600">16</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Content - Social Feed Section */}
        <div className="col-span-12 space-y-3 lg:col-span-6">
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex gap-3">
              {/* Mini avatar for post creator input */}
              <div className="w-12 h-12 overflow-hidden bg-gray-200 rounded-full shrink-0 aspect-square">
                {userData.profilePicture ? (
                  <img src={userData.profilePicture} alt="User" className="object-cover w-full h-full" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <User size={24} />
                  </div>
                )}
              </div>
              <button className="flex-1 px-4 font-medium text-left text-gray-500 transition border border-gray-300 rounded-full hover:bg-gray-100">
                Start a post
              </button>
            </div>
            
            {/* Post Type Options */}
            <div className="flex justify-between px-2 mt-3">
              <button className="flex items-center gap-2 p-2 text-sm font-semibold text-gray-500 rounded hover:bg-gray-100">
                <ImageIcon className="text-blue-500" size={20} /> Photo
              </button>
              <button className="flex items-center gap-2 p-2 text-sm font-semibold text-gray-500 rounded hover:bg-gray-100">
                <Video className="text-green-500" size={20} /> Video
              </button>
              <button className="flex items-center gap-2 p-2 text-sm font-semibold text-gray-500 rounded hover:bg-gray-100">
                <Newspaper className="text-orange-400" size={20} /> Write article
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default StudentDashboard;