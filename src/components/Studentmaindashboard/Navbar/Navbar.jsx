import React, { useState } from 'react';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const navLinks = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Generate CV', icon: '📄' },
    { name: 'Find Jobs', icon: '💼' },
    { name: 'Edit Profile', icon: '👤' },
    { name: 'Manage Applications', icon: '✅' },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      {/* වම් පස - Logo */}
      <div className="flex items-center gap-2">
        <div className="p-2 bg-blue-600 rounded-lg">
          <span className="text-xl font-bold text-white">⚡</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800">
          SKILLPIVOT<span className="text-blue-600">LK</span>
        </h1>
      </div>

      {/* මැද කොටස - Navigation Links */}
      <div className="items-center hidden gap-6 lg:flex">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => setActiveTab(link.name)}
            className={`flex items-center gap-2 text-sm font-medium transition-all pb-1 border-b-2 ${
              activeTab === link.name 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-blue-600'
            }`}
          >
            <span>{link.name}</span>
          </button>
        ))}
      </div>

      {/* දකුණු පස - Search & Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search internships..."
            className="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 rounded-full hover:bg-gray-100">
          🔔
          <span className="absolute w-2 h-2 bg-red-500 border-2 border-white rounded-full top-2 right-2"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-gray-800">Alex Perera</p>
            <p className="text-xs text-gray-500">Undergraduate</p>
          </div>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 border border-blue-100 rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;