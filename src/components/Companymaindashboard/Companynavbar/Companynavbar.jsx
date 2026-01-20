import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  Building2, 
  Bell, 
  Zap, 
  LogOut, 
  RefreshCw, 
  LogIn,
  ClipboardList
} from 'lucide-react';

const CompanyNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Check if the user is on entry pages (Role Selection, Sign-in, Sign-up)
  const isAuthPage = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup';

  // Specific navigation links for Company/Employer users
  const navLinks = [
    { name: 'Overview', icon: LayoutDashboard, path: '/company-dashboard' },
    { name: 'Post a Job', icon: PlusCircle, path: '/post-job' },
    { name: 'Manage Jobs', icon: ClipboardList, path: '/manage-jobs' },
    { name: 'Applicants', icon: Users, path: '/view-applicants' },
    { name: 'Company Profile', icon: Building2, path: '/company-profile' },
  ];

  // Handles clicking the brand logo to navigate based on auth status
  const handleLogoClick = () => {
    if (isAuthPage) {
      navigate('/'); // Go to Role Selection
    } else {
      navigate('/company-dashboard'); // Go to Employer Dashboard
    }
  };

  // Handles user logout and redirects to sign-in page
  const handleLogout = () => {
    console.log("Employer logging out...");
    navigate('/signin');
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 bg-white border-b border-gray-200 shadow-sm backdrop-blur-md bg-white/90">
      
      {/* Brand Logo - Consistent with Student side */}
      <div className="flex items-center gap-2 cursor-pointer group" onClick={handleLogoClick}>
        <div className="p-2 text-white transition-transform bg-blue-600 rounded-lg group-hover:scale-110">
          <Zap size={20} fill="currentColor" />
        </div>
        <h1 className="text-xl font-bold tracking-tight uppercase text-slate-800">
          SkillPivot<span className="text-blue-600">lk</span>
        </h1>
      </div>

      {/* Main Navigation - Employer specific links */}
      {!isAuthPage && (
        <div className="items-center hidden gap-2 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span>{link.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* User Interaction Section */}
      <div className="flex items-center gap-4">
        
        {/* Notifications for new applicants */}
        {!isAuthPage && (
          <button className="relative p-2 text-gray-500 transition-all rounded-full hover:bg-gray-100 hover:text-blue-600">
            <Bell size={20} />
            <span className="absolute w-2 h-2 bg-red-500 border-2 border-white rounded-full top-2 right-2"></span>
          </button>
        )}

        {/* Company Profile Dropdown */}
        {!isAuthPage ? (
          <div className="relative flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold leading-tight text-gray-800">TechSys SL</p>
              <p className="text-[10px] font-medium text-blue-600 uppercase tracking-wider underline">Hiring Manager</p>
            </div>
            
            <div className="relative cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              {/* Company Logo Placeholder */}
              <div className="flex items-center justify-center w-10 h-10 transition-all border-2 border-blue-100 rounded-full bg-blue-50 hover:border-blue-500">
                <Building2 size={20} className="text-blue-600" />
              </div>
              
              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 py-2 mt-3 duration-200 bg-white border border-gray-100 shadow-xl w-52 rounded-xl animate-in fade-in zoom-in">
                  <button onClick={() => { navigate('/company-profile'); setShowProfileMenu(false); }} className="flex items-center w-full gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                    <Building2 size={16} /> Company Profile
                  </button>
                  
                  {/* Option to change role back to Selection Page */}
                  <button onClick={() => { navigate('/'); setShowProfileMenu(false); }} className="flex items-center w-full gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                    <RefreshCw size={16} /> Change Role
                  </button>

                  <hr className="my-1 border-gray-100" />
                  
                  {/* Log out functionality */}
                  <button onClick={handleLogout} className="flex items-center w-full gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Sign In button for entry pages */
          <button 
            onClick={() => navigate('/signin')}
            className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            <LogIn size={16} />
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default CompanyNavbar;