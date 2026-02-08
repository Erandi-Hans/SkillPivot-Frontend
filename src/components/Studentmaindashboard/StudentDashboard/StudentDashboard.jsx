import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar.jsx'; 
import { 
  MoreHorizontal, ThumbsUp, MessageSquare, Repeat2, Send, Plus, Info,
  Image as ImageIcon, Video, Newspaper, User, Eye, X, Bold, Italic, List
} from 'lucide-react';

const StudentDashboard = () => {
  const [userData, setUserData] = useState({ 
    firstName: '', lastName: '', profilePicture: '', industry: '',
    university: '', skills: [] 
  });
  
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  
  // Refs to trigger hidden file inputs
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const userId = localStorage.getItem('userId') || 11;

  const fetchUserData = async () => {
    try {
      const userRes = await axios.get(`https://localhost:7118/api/Users/${userId}`);
      const u = userRes.data;

      let studentData = {};
      try {
        const studentRes = await axios.get(`https://localhost:7118/api/Students/user/${userId}`);
        studentData = studentRes.data;
      } catch (err) { console.warn("Student profile not found."); }

      setUserData({
        firstName: u.Firstname || u.firstname || 'User',
        lastName: u.Lastname || u.lastname || '',
        profilePicture: u.ProfilePicture ? `https://localhost:7118/uploads/${u.ProfilePicture}` : null,
        industry: u.Industry || u.industry || "Professional",
        university: studentData.University || studentData.university || "Not Specified",
        skills: studentData.Skills ? studentData.Skills.split(',').map(s => s.trim()) : []
      });
    } catch (error) {
      console.error("Critical: Error loading dashboard data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    window.addEventListener('profileUpdate', fetchUserData);
    return () => window.removeEventListener('profileUpdate', fetchUserData);
  }, [userId]);

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
      if (!isPostModalOpen) setIsPostModalOpen(true);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF] font-sans">
      <Navbar />

      {/* Hidden Inputs for Desktop Upload */}
      <input 
        type="file" 
        ref={imageInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      <input 
        type="file" 
        ref={videoInputRef} 
        className="hidden" 
        accept="video/*" 
        onChange={handleFileChange} 
      />

      <main className="grid max-w-6xl grid-cols-12 gap-5 px-4 mx-auto mt-6">
        {/* Left Sidebar */}
        <div className="col-span-12 space-y-3 lg:col-span-3">
          <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="h-16 bg-[#A0B4B7] relative">
               <button onClick={() => window.location.href = '/edit-profile'} className="absolute p-1 transition rounded-full top-2 right-2 bg-white/50 hover:bg-white">
                 <Eye size={16} className="text-gray-700" />
               </button>
            </div>
            
            <div className="px-3 pb-4">
              <div className="relative flex flex-col items-center text-center -top-8">
                <div className="w-16 h-16 overflow-hidden bg-white border-2 border-white rounded-full shadow-sm aspect-square">
                   {userData.profilePicture ? (
                     <img src={userData.profilePicture} alt="Profile" className="object-cover w-full h-full" />
                   ) : (
                     <div className="flex items-center justify-center h-full text-gray-400 bg-gray-200"><User size={32} /></div>
                   )}
                </div>
                <h3 className="mt-3 font-semibold text-gray-800">{userData.firstName} {userData.lastName}</h3>
                <p className="text-xs font-medium text-blue-700 mt-0.5">{userData.university}</p>
                <p className="mt-1 text-[11px] text-gray-500">{userData.industry}</p>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <p className="mb-2 text-xs font-bold text-gray-600 uppercase">Top Skills</p>
                <div className="flex flex-wrap gap-1">
                  {userData.skills.length > 0 ? userData.skills.slice(0, 5).map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded font-medium">{skill}</span>
                  )) : <p className="text-[10px] text-gray-400">Add skills to your profile</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Content */}
        <div className="col-span-12 space-y-3 lg:col-span-6">
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex gap-3">
              <div className="w-12 h-12 overflow-hidden bg-gray-200 rounded-full shrink-0 aspect-square">
                {userData.profilePicture ? <img src={userData.profilePicture} alt="User" className="object-cover w-full h-full" /> : <div className="flex items-center justify-center h-full text-gray-400"><User size={24} /></div>}
              </div>
              <button onClick={() => setIsPostModalOpen(true)} className="flex-1 px-4 font-medium text-left text-gray-500 transition border border-gray-300 rounded-full hover:bg-gray-100">
                Start a post
              </button>
            </div>
            
            <div className="flex justify-between px-2 mt-3">
              <button onClick={() => imageInputRef.current.click()} className="flex items-center gap-2 p-2 text-sm font-semibold text-gray-500 rounded hover:bg-gray-100">
                <ImageIcon className="text-blue-500" size={20} /> Photo
              </button>
              <button onClick={() => videoInputRef.current.click()} className="flex items-center gap-2 p-2 text-sm font-semibold text-gray-500 rounded hover:bg-gray-100">
                <Video className="text-green-500" size={20} /> Video
              </button>
              <button onClick={() => setIsPostModalOpen(true)} className="flex items-center gap-2 p-2 text-sm font-semibold text-gray-500 rounded hover:bg-gray-100">
                <Newspaper className="text-orange-400" size={20} /> Write article
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Professional Post Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl overflow-hidden duration-200 bg-white shadow-2xl rounded-xl animate-in fade-in zoom-in">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
                   {userData.profilePicture ? <img src={userData.profilePicture} alt="User" className="object-cover w-full h-full" /> : <div className="flex items-center justify-center h-full text-gray-400"><User size={20}/></div>}
                </div>
                <div>
                  <h4 className="text-sm font-bold">{userData.firstName} {userData.lastName}</h4>
                  <p className="text-xs font-medium text-gray-500">Post to Anyone</p>
                </div>
              </div>
              <button onClick={() => { setIsPostModalOpen(false); clearFile(); }} className="p-1 text-gray-500 transition rounded-full hover:bg-gray-100">
                <X size={24} />
              </button>
            </div>

            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <textarea 
                className="w-full min-h-[120px] text-lg text-gray-800 placeholder-gray-400 border-none outline-none resize-none"
                placeholder="What do you want to talk about?"
                autoFocus
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              
              {/* File Preview Section */}
              {filePreview && (
                <div className="relative mt-2 overflow-hidden border border-gray-200 rounded-lg">
                  <button onClick={clearFile} className="absolute z-10 p-1 text-white transition rounded-full top-2 right-2 bg-black/50 hover:bg-black/70">
                    <X size={18} />
                  </button>
                  {selectedFile?.type.startsWith('video') ? (
                    <video src={filePreview} controls className="w-full max-h-[300px] object-contain bg-black" />
                  ) : (
                    <img src={filePreview} alt="Upload preview" className="w-full max-h-[300px] object-cover" />
                  )}
                </div>
              )}

              <div className="flex items-center gap-4 py-2 mt-4 text-gray-600 border-t border-gray-100">
                <button title="Bold" className="p-1.5 hover:bg-gray-100 rounded transition hover:text-black"><Bold size={20} /></button>
                <button title="Italic" className="p-1.5 hover:bg-gray-100 rounded transition hover:text-black"><Italic size={20} /></button>
                <button title="Bullet List" className="p-1.5 hover:bg-gray-100 rounded transition hover:text-black"><List size={20} /></button>
                <div className="w-px h-6 mx-1 bg-gray-200" />
                <button onClick={() => imageInputRef.current.click()} title="Add Image" className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded transition"><ImageIcon size={20} /></button>
                <button onClick={() => videoInputRef.current.click()} title="Add Video" className="p-1.5 hover:bg-green-50 hover:text-green-600 rounded transition"><Video size={20} /></button>
              </div>
            </div>

            <div className="flex items-center justify-end px-4 py-3 border-t bg-gray-50">
              <button 
                disabled={!postContent.trim() && !selectedFile}
                className={`px-6 py-1.5 rounded-full font-bold text-sm transition ${ (postContent.trim() || selectedFile) ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed' }`}
                onClick={() => {
                  alert("Post Logic Implementation triggered!");
                  setIsPostModalOpen(false);
                  setPostContent("");
                  clearFile();
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;