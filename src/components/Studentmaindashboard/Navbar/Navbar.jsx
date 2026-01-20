import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // added useLocation
import { 
  LayoutDashboard, 
  FileUser, 
  Search, 
  UserRoundPen, 
  ClipboardCheck,
  Bell,
  Zap
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Current path එක හඳුනා ගැනීමට

  const navLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/student-dashboard' },
    { name: 'Generate CV', icon: FileUser, path: '/cv-generate' },
    { name: 'Find Jobs', icon: Search, path: '/find-jobs' },
    { name: 'Edit Profile', icon: UserRoundPen, path: '/edit-profile' },
    { name: 'Manage Applications', icon: ClipboardCheck, path: '/applications' },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
      
      {/* Brand Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => navigate('/student-dashboard')}
      >
        <div className="p-2 text-white bg-blue-600 rounded-lg">
          <Zap size={20} fill="currentColor" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800">
          SKILLPIVOT<span className="text-blue-600">LK</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="items-center hidden gap-6 lg:flex">
        {navLinks.map((link) => {
          const Icon = link.icon;
          // check if current URL matches the link's path
          const isActive = location.pathname === link.path;
          
          return (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className={`flex items-center gap-2 text-sm font-medium transition-all pb-1 border-b-2 ${
                isActive 
                  ? 'border-blue-600 text-blue-600 font-semibold' 
                  : 'border-transparent text-gray-500 hover:text-blue-600'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span>{link.name}</span>
            </button>
          );
        })}
      </div>

      {/* Search and User Profile Area */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search internships..."
            className="w-64 px-4 py-2 pl-10 text-sm transition-all bg-gray-100 border border-transparent rounded-full outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100">
          <Bell size={20} />
          <span className="absolute w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full top-2 right-2"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold leading-tight text-gray-800">Alex Perera</p>
            <p className="text-xs text-gray-500">Undergraduate</p>
          </div>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="object-cover w-10 h-10 transition-all border border-blue-100 rounded-full cursor-pointer hover:border-blue-500"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;