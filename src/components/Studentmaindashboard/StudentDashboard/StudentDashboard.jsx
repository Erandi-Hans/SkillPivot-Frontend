import React from 'react';
import Navbar from '../Navbar/Navbar.jsx'; // ඔබේ Navbar එක මෙතැනින් import වේ
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
  Newspaper
} from 'lucide-react';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F3F2EF] font-sans">
      
      {/* 1. Navbar Component එක භාවිතා කිරීම */}
      <Navbar />

      <main className="grid max-w-6xl grid-cols-12 gap-5 px-4 mx-auto mt-6">
        
        {/* වම් පස - Profile Card */}
        <div className="col-span-12 space-y-2 lg:col-span-3">
          <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="h-14 bg-[#A0B4B7]"></div>
            <div className="px-3 pb-4">
              <div className="relative flex flex-col items-center text-center -top-8">
                <div className="w-16 h-16 overflow-hidden bg-white border-2 border-white rounded-full shadow-sm">
                   <img src="https://via.placeholder.com/150" alt="Profile" />
                </div>
                <h3 className="mt-3 font-semibold text-gray-800 cursor-pointer hover:underline">Alex Perera</h3>
                <p className="mt-1 text-xs leading-tight text-gray-500">BICT (Hons) Undergraduate | Faculty of Technology</p>
              </div>
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

          <div className="sticky p-3 space-y-3 text-xs font-semibold bg-white border border-gray-200 shadow-sm rounded-xl top-20">
             <p className="cursor-pointer hover:text-blue-600">Saved items</p>
             <p className="cursor-pointer hover:text-blue-600">Groups</p>
             <p className="cursor-pointer hover:text-blue-600">Events</p>
          </div>
        </div>

        {/* මැද - Feed (ප්‍රධාන කොටස) */}
        <div className="col-span-12 space-y-3 lg:col-span-6">
          
          {/* Post එකක් ආරම්භ කරන කොටස */}
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex gap-3">
              <div className="w-12 h-12 overflow-hidden bg-gray-200 rounded-full shrink-0">
                <img src="https://via.placeholder.com/150" alt="user" />
              </div>
              <button className="flex-1 px-4 font-medium text-left text-gray-500 transition border border-gray-300 rounded-full hover:bg-gray-100">
                Start a post
              </button>
            </div>
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

          {/* Sample Feed Post */}
          <div className="py-3 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-start justify-between px-4">
              <div className="flex gap-2">
                <div className="w-12 h-12 overflow-hidden bg-gray-400 rounded">
                  <img src="https://via.placeholder.com/150" alt="poster" />
                </div>
                <div>
                  <h4 className="flex items-center gap-1 text-sm font-bold cursor-pointer hover:text-blue-600">
                    Akshet Patel <span className="text-xs font-normal text-gray-400">• 3rd+</span>
                  </h4>
                  <p className="text-xs text-gray-500">Robotics Engineer | Creator</p>
                  <p className="text-xs text-gray-500">1d • 🌍</p>
                </div>
              </div>
              <MoreHorizontal size={20} className="text-gray-500 cursor-pointer" />
            </div>
            
            <p className="px-4 py-3 text-sm leading-relaxed text-gray-800">
              What is Reinforcement Learning (RL)? It's a type of machine learning where an agent learns to make decisions... 
              <span className="ml-1 text-gray-400 cursor-pointer">more</span>
            </p>

            <div className="flex items-center justify-center w-full h-64 bg-gray-100 border-gray-200 border-y">
               <span className="font-medium text-gray-400">Post Image Area</span>
            </div>

            {/* Interaction Buttons */}
            <div className="flex justify-around py-1 mt-1">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-500 transition rounded hover:bg-gray-100">
                <ThumbsUp size={18} /> Like
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-500 transition rounded hover:bg-gray-100">
                <MessageSquare size={18} /> Comment
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-500 transition rounded hover:bg-gray-100">
                <Repeat2 size={18} /> Repost
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-500 transition rounded hover:bg-gray-100">
                <Send size={18} /> Send
              </button>
            </div>
          </div>
        </div>

        {/* දකුණු පස - Recommendations */}
        <div className="col-span-12 space-y-3 lg:col-span-3">
          <div className="p-3 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Add to your feed</h3>
              <Info size={16} className="text-gray-500 cursor-pointer" />
            </div>
            
            <div className="space-y-4">
              {['takeUforward', 'Zoho', 'Dhanika Perera'].map((name, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{name}</h4>
                    <p className="text-[11px] text-gray-500 mb-1">Company • Technology</p>
                    <button className="flex items-center gap-1 border-2 border-gray-500 px-4 py-0.5 rounded-full text-gray-600 font-bold hover:bg-gray-100 hover:border-gray-800 transition text-xs">
                      <Plus size={14} /> Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full p-2 mt-4 text-sm font-semibold text-gray-500 transition rounded hover:bg-gray-100">
              View all recommendations →
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default StudentDashboard;