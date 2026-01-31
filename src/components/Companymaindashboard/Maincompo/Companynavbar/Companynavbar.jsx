import React, { useState, useEffect } from 'react';
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

  // --- Dynamic Data States ---
  const [navData, setNavData] = useState({
    name: localStorage.getItem('companyName') || 'Company Name',
    logo: localStorage.getItem('companyLogo') || null
  });

  // Listen for changes in localStorage (Profile එක update වුණොත් වහාම දැනගන්න)
  useEffect(() => {
    const updateNav = () => {
      setNavData({
        name: localStorage.getItem('companyName') || 'Company Name',
        logo: localStorage.getItem('companyLogo') || null
      });
    };

    // පේජ් එක load වෙනකොට සහ වෙනත් tab එකක update වුණොත් check කරන්න
    window.addEventListener('storage', updateNav);
    return () => window.removeEventListener('storage', updateNav);
  }, []);

  const isAuthPage = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup';

  const navLinks = [
    { name: 'Overview', icon: LayoutDashboard, path: '/company-dashboard' },
    { name: 'Post a Job', icon: PlusCircle, path: '/companypostaJob' },
    { name: 'Manage Jobs', icon: ClipboardList, path: '/companymanagejobs' },
    { name: 'Applicants', icon: Users, path: '/companyapplication' },
    { name: 'Company Profile', icon: Building2, path: '/companyprofile' },
  ];

  const handleLogoClick = () => {
    isAuthPage ? navigate('/') : navigate('/company-dashboard');
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all session data
    navigate('/signin');
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 font-sans bg-white border-b border-gray-200 shadow-sm backdrop-blur-md bg-white/90">
      
      {/* Brand Logo */}
      <div className="flex items-center gap-2 cursor-pointer group" onClick={handleLogoClick}>
        <div className="p-2 text-white transition-transform bg-blue-600 rounded-lg shadow-lg group-hover:scale-110 shadow-blue-200">
          <Zap size={20} fill="currentColor" />
        </div>
        <h1 className="text-xl font-bold tracking-tight uppercase text-slate-800">
          SkillPivot<span className="text-blue-600">lk</span>
        </h1>
      </div>

      {/* Main Navigation Links */}
      {!isAuthPage && (
        <div className="items-center hidden gap-2 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-lg ${
                  isActive ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
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
        
        {!isAuthPage && (
          <button className="relative p-2 transition-all rounded-full text-slate-500 hover:bg-slate-100 hover:text-blue-600">
            <Bell size={20} />
            <span className="absolute w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full top-2 right-2"></span>
          </button>
        )}

        {!isAuthPage ? (
          <div className="relative flex items-center gap-3 pl-4 border-l border-slate-200">
            {/* Displaying Dynamic Company Name */}
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold leading-tight text-slate-900 truncate max-w-[150px]">
                {navData.name}
              </p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Hiring Manager</p>
            </div>
            
            <div className="relative cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              {/* Displaying Dynamic Logo or Icon */}
              <div className="flex items-center justify-center w-10 h-10 overflow-hidden transition-all border-2 border-blue-100 rounded-full shadow-sm bg-blue-50 hover:border-blue-500">
                {navData.logo ? (
                  <img src={navData.logo} alt="Logo" className="object-cover w-full h-full" />
                ) : (
                  <Building2 size={20} className="text-blue-600" />
                )}
              </div>
              
              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 w-56 py-2 mt-3 bg-white border shadow-2xl border-slate-100 rounded-2xl animate-in fade-in zoom-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-slate-50 lg:hidden">
                     <p className="text-sm font-bold text-slate-900">{navData.name}</p>
                  </div>
                  
                  <button onClick={() => { navigate('/companyprofile'); setShowProfileMenu(false); }} className="flex items-center w-full gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Building2 size={16} /> Company Profile
                  </button>
                  
                  <button onClick={() => { navigate('/'); setShowProfileMenu(false); }} className="flex items-center w-full gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <RefreshCw size={16} /> Change Role
                  </button>

                  <div className="my-1 border-t border-slate-100" />
                  
                  <button onClick={handleLogout} className="flex items-center w-full gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/signin')}
            className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95"
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