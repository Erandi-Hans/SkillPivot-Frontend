import React, { useState } from 'react';
import AdminNavbar from '../../Adminnavbar/Adminnavbar.jsx';
import { 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Mail, 
  Save, 
  Lock, 
  Database,
  RefreshCcw
} from 'lucide-react';

const Adminsystemsettings = () => {
  // Local state for toggling system-wide settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-gray-50 text-slate-900">
      {/* 1. Global Navigation Bar */}
      <AdminNavbar />

      <main className="max-w-5xl p-8 pt-10 mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-slate-800">
            <Settings className="text-blue-600" size={32} />
            System Settings
          </h2>
          <p className="mt-1 text-slate-500">
            Configure platform-wide preferences, security protocols, and system notifications.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Left Sidebar - Settings Categories */}
          <div className="space-y-2 md:col-span-1">
            <button className="flex items-center w-full gap-3 px-4 py-3 font-bold text-white transition-all bg-blue-600 shadow-md rounded-xl">
              <Globe size={18} /> General
            </button>
            <button className="flex items-center w-full gap-3 px-4 py-3 font-semibold transition-all bg-white text-slate-600 rounded-xl hover:bg-gray-100">
              <Shield size={18} /> Security
            </button>
            <button className="flex items-center w-full gap-3 px-4 py-3 font-semibold transition-all bg-white text-slate-600 rounded-xl hover:bg-gray-100">
              <Bell size={18} /> Notifications
            </button>
            <button className="flex items-center w-full gap-3 px-4 py-3 font-semibold transition-all bg-white text-slate-600 rounded-xl hover:bg-gray-100">
              <Database size={18} /> Backup & Data
            </button>
          </div>

          {/* Right Content Area - Actual Form Settings */}
          <div className="space-y-6 md:col-span-2">
            
            {/* General Settings Card */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-3xl">
              <h3 className="flex items-center gap-2 mb-6 text-lg font-bold text-slate-800">
                <Globe size={20} className="text-blue-500" /> Platform Configuration
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-600">Platform Name</label>
                  <input 
                    type="text" 
                    defaultValue="SkillPivotlk" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-600">Support Email</label>
                  <input 
                    type="email" 
                    defaultValue="support@skillpivot.lk" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* System Switches Card */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-3xl">
              <h3 className="flex items-center gap-2 mb-6 text-lg font-bold text-slate-800">
                <Lock size={20} className="text-amber-500" /> System Control
              </h3>
              
              <div className="space-y-6">
                {/* Maintenance Mode Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-700">Maintenance Mode</p>
                    <p className="text-xs text-slate-400">Temporarily disable public access to the platform.</p>
                  </div>
                  <button 
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`w-12 h-6 rounded-full transition-all relative ${maintenanceMode ? 'bg-red-500' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${maintenanceMode ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                {/* Email Notification Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-700">System Notifications</p>
                    <p className="text-xs text-slate-400">Send automatic emails for new user registrations.</p>
                  </div>
                  <button 
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`w-12 h-6 rounded-full transition-all relative ${emailNotifications ? 'bg-emerald-500' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${emailNotifications ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-slate-600 font-bold rounded-xl hover:bg-gray-200 transition-all">
                <RefreshCcw size={18} /> Reset
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-95">
                <Save size={18} /> Save Changes
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Adminsystemsettings;