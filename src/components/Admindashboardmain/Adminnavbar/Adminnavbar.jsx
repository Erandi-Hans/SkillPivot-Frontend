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
  Search,
  LogIn,
  RefreshCw,
  ChevronDown
} from 'lucide-react';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const isAuthPage = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup';

  const adminLinks = [
    { name: 'Dashboard Overview', icon: LayoutDashboard, path: '/admin-dashboard' },
    { name: 'User Management', icon: Users, path: '/admin-users' },
    { name: 'Company Verification', icon: Building2, path: '/admin-verifications' },
    { name: 'Job Moderation', icon: ShieldCheck, path: '/admin-jobs' },
    { name: 'System Settings', icon: Settings, path: '/admin-settings' },
  ];

  const handleLogout = () => {
    navigate('/signin');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 shadow-sm bg-white/95 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/admin-dashboard')}
          >
            <div className="p-2 text-white transition-all bg-blue-600 rounded-lg shadow-md group-hover:scale-110 shadow-blue-200">
              <Zap size={20} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <h1 className="flex items-center gap-1 text-xl font-black leading-none tracking-tight text-slate-800">
                SKILLPIVOT<span className="text-blue-600">LK</span>
                <span className="ml-1 text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold border border-blue-100">ADMIN</span>
              </h1>
            </div>
          </div>

          {/* Nav Links */}
          {!isAuthPage && (
            <div className="items-center hidden gap-1 xl:flex">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.name}
                    onClick={() => navigate(link.path)}
                    className={`flex items-center gap-2 px-4 py-2 text-[13px] font-bold transition-all rounded-xl ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50/50' 
                        : 'text-slate-500 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    <span>{link.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            {!isAuthPage && (
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search records..." 
                  className="w-48 py-2 pl-10 pr-4 text-xs transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white"
                />
              </div>
            )}

            {!isAuthPage ? (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <button className="relative p-2 transition-colors rounded-full text-slate-400 hover:bg-gray-100">
                  <Bell size={20} />
                  <span className="absolute w-2 h-2 bg-red-500 border-2 border-white rounded-full top-2 right-2"></span>
                </button>

                <div className="relative">
                  <button 
                    onClick={() => setShowAdminMenu(!showAdminMenu)}
                    className="flex items-center gap-2 p-1 transition-all border border-transparent rounded-full hover:bg-gray-50 hover:border-gray-100"
                  >
                    <div className="flex items-center justify-center w-8 h-8 text-xs font-bold text-blue-600 border border-blue-100 rounded-full shadow-sm bg-blue-50">
                      AD
                    </div>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${showAdminMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showAdminMenu && (
                    <>
                      <div className="fixed inset-0 z-[-1]" onClick={() => setShowAdminMenu(false)}></div>
                      <div className="absolute right-0 py-1 mt-3 overflow-hidden duration-100 bg-white border border-gray-100 shadow-2xl w-60 rounded-2xl animate-in fade-in zoom-in">
                        <div className="px-4 py-3 border-b border-gray-50">
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">System Administrator</p>
                          <p className="text-sm font-bold text-slate-800">admin@skillpivot.lk</p>
                        </div>
                        <button onClick={() => navigate('/admin-settings')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <Settings size={16} /> Admin Settings
                        </button>
                        <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <RefreshCw size={16} /> Change Role
                        </button>
                        <div className="mt-1 border-t border-gray-50">
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold">
                            <LogOut size={16} /> Log Out System
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/signin')}
                className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl shadow-blue-200 hover:bg-blue-700 active:scale-95"
              >
                <LogIn size={16} /> Admin Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;