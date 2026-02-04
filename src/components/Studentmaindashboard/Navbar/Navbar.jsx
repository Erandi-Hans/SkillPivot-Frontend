import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, 
  FileUser, 
  Search, 
  UserRoundPen, 
  ClipboardCheck,
  Zap,
  LogOut,
  User,
  RefreshCw,
  LogIn 
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const [userData, setUserData] = useState({ firstName: '', lastName: '', profilePicture: '' });

  const userId = localStorage.getItem('userId') || 11;
  const isAuthPage = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup';

  // දත්ත ලබාගන්නා function එක වෙනම ලියා ගනිමු
  const fetchUser = async () => {
    if (!isAuthPage) {
      try {
        const response = await axios.get(`https://localhost:7118/api/Users/${userId}`);
        setUserData({
          firstName: response.data.Firstname,
          lastName: response.data.Lastname,
          profilePicture: response.data.ProfilePicture 
            ? `https://localhost:7118/uploads/${response.data.ProfilePicture}` 
            : null
        });
      } catch (error) {
        console.error("Error fetching navbar user data", error);
      }
    }
  };

  useEffect(() => {
    fetchUser();

    // අලුත් logic එක: පේජ් එක Refresh නොවී Navbar එක Update කිරීමට event එකක් Listen කිරීම
    window.addEventListener('profileUpdate', fetchUser);

    return () => {
      window.removeEventListener('profileUpdate', fetchUser);
    };
  }, [isAuthPage, userId]);

  const navLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/student-dashboard' },
    { name: 'Generate CV', icon: FileUser, path: '/cv-generate' },
    { name: 'Find Jobs', icon: Search, path: '/find-jobs' },
    { name: 'Edit Profile', icon: UserRoundPen, path: '/edit-profile' },
    { name: 'Applications', icon: ClipboardCheck, path: '/applications' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/signin');
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 bg-white border-b border-gray-200 shadow-sm backdrop-blur-md bg-white/90">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate(isAuthPage ? '/' : '/student-dashboard')}>
        <div className="p-2 text-white transition-transform bg-blue-600 rounded-lg group-hover:scale-110">
          <Zap size={20} fill="currentColor" />
        </div>
        <h1 className="text-xl font-bold tracking-tight uppercase text-slate-800">
          SkillPivot<span className="text-blue-600">lk</span>
        </h1>
      </div>

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

      <div className="flex items-center gap-4">
        {!isAuthPage ? (
          <div className="relative flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold leading-tight text-gray-800">
                {userData.firstName} {userData.lastName}
              </p>
              <p className="text-[10px] font-medium text-blue-600 uppercase tracking-wider">Undergraduate</p>
            </div>
            
            <div className="relative cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <div className="w-10 h-10 overflow-hidden border-2 border-transparent rounded-full hover:border-blue-500">
                {userData.profilePicture ? (
                    <img src={userData.profilePicture} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200">
                        <User size={20} className="text-gray-500" />
                    </div>
                )}
              </div>
              
              {showProfileMenu && (
                <div className="absolute right-0 py-2 mt-3 bg-white border border-gray-100 shadow-xl w-52 rounded-xl">
                  <button onClick={() => { navigate('/edit-profile'); setShowProfileMenu(false); }} className="flex items-center w-full gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                    <User size={16} /> My Profile
                  </button>
                  <button onClick={() => { navigate('/'); setShowProfileMenu(false); }} className="flex items-center w-full gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                    <RefreshCw size={16} /> Change Role
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <button onClick={handleLogout} className="flex items-center w-full gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/signin')} className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg active:scale-95">
            <LogIn size={16} /> Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;