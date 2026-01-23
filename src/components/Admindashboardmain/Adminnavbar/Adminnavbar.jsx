import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  ShieldCheck, 
  Settings, 
  Bell, 
  Zap, 
  LogOut, 
  UserCog,
  Search,
  LogIn
} from 'lucide-react';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  // Check if the user is on auth pages
  const isAuthPage = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup';

  // Navigation Links for the Admin Panel
  const adminLinks = [
    { name: 'Dashboard Overview', icon: LayoutDashboard, path: '/admin-dashboard' },
    { name: 'User Management', icon: Users, path: '/admin/users' },
    { name: 'Company Verification', icon: Building2, path: '/admin/verifications' },
    { name: 'Job Moderation', icon: ShieldCheck, path: '/admin/jobs' },
    { name: 'System Settings', icon: Settings, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    console.log("Admin logging out...");
    navigate('/signin');
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 bg-white border-b border-gray-200 shadow-sm">
      
      {/* Brand Logo Section */}
      <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/admin-dashboard')}>
        <div className="p-2 text-white transition-transform bg-blue-600 rounded-lg group-hover:scale-110">
          <Zap size={20} fill="currentColor" />
        </div>
        <h1 className="text-xl font-bold tracking-tight uppercase text-slate-800">
          SkillPivot<span className="text-blue-600">lk</span>
          <span className="ml-2 text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 font-bold">ADMIN</span>
        </h1>
      </div>

      {/* Main Navigation - Centered Links */}
      {!isAuthPage && (
        <div className="items-center hidden gap-1 lg:flex">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-lg ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-500 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span>{link.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Interaction Section (Search, Notifications, Profile) */}
      <div className="flex items-center gap-4">
        
        {/* Global Search Bar */}
        {!isAuthPage && (
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search records..." 
              className="w-48 py-2 pl-10 pr-4 text-sm transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:w-64"
            />
          </div>
        )}

        {!isAuthPage ? (
          <div className="relative flex items-center gap-3 pl-4 border-l border-gray-200">
            {/* Notification Bell */}
            <button className="relative p-2 transition-all rounded-full text-slate-500 hover:bg-gray-100 hover:text-blue-600">
              <Bell size={20} />
              <span className="absolute w-2 h-2 bg-red-500 border-2 border-white rounded-full top-2 right-2"></span>
            </button>

            {/* Profile Dropdown Toggle */}
            <div className="relative cursor-pointer" onClick={() => setShowAdminMenu(!showAdminMenu)}>
              <div className="flex items-center justify-center w-10 h-10 transition-all border-2 border-blue-100 rounded-full bg-blue-50 hover:border-blue-500">
                <UserCog size={20} className="text-blue-600" />
              </div>
              
              {/* Profile Dropdown Menu */}
              {showAdminMenu && (
                <div className="absolute right-0 py-2 mt-3 bg-white border border-gray-100 shadow-xl w-60 rounded-xl animate-in fade-in zoom-in text-slate-700">
                  <div className="px-4 py-3 border-b border-gray-50">
                    <p className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">System Administrator</p>
                    <p className="text-sm font-semibold truncate text-slate-800">admin@skillpivot.lk</p>
                  </div>
                  
                  <button onClick={() => navigate('/admin/settings')} className="flex items-center w-full gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-blue-600 transition-colors">
                    <Settings size={16} /> Admin Settings
                  </button>

                  <hr className="my-1 border-gray-50" />
                  
                  <button onClick={handleLogout} className="flex items-center w-full gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={16} /> Log Out System
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/signin')}
            className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white transition-all bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 active:scale-95"
          >
            <LogIn size={16} /> Admin Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;