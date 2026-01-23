import React from 'react';
import CompanyNavbar from '../../Companynavbar/Companynavbar.jsx';
import { Building2, Globe, Mail, MapPin, Camera, Save, Github, Linkedin } from 'lucide-react';

const Companyprofile = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navigation Bar */}
      <CompanyNavbar />

      <main className="container max-w-5xl px-4 py-8 mx-auto">
        <div className="p-8 bg-white border shadow-md rounded-3xl border-slate-200">
          
          {/* Header Section */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Company Profile</h1>
              <p className="mt-1 text-slate-500">Update your company's public information and branding.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 active:scale-95 shadow-blue-200">
              <Save size={18} />
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            
            {/* Left Column: Logo & Branding */}
            <div className="flex flex-col items-center p-6 border border-slate-100 bg-slate-50/50 rounded-3xl h-fit">
              <div className="relative group">
                <div className="flex items-center justify-center w-32 h-32 overflow-hidden bg-white border-4 border-white shadow-xl rounded-3xl">
                  <Building2 size={48} className="text-slate-300" />
                  {/* Placeholder for uploaded logo */}
                </div>
                <button className="absolute bottom-[-10px] right-[-10px] p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all group-hover:scale-110">
                  <Camera size={18} />
                </button>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-800">TechSys SL</h3>
              <p className="text-sm text-slate-500">Hiring Manager</p>
            </div>

            {/* Right Column: Edit Form Details */}
            <div className="space-y-8 lg:col-span-2">
              
              {/* General Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800">General Information</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600">Company Name</label>
                    <input type="text" defaultValue="TechSys SL" className="w-full px-4 py-3 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600">Industry</label>
                    <input type="text" defaultValue="Software Development" className="w-full px-4 py-3 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">About Company</label>
                  <textarea rows="4" className="w-full px-4 py-3 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" placeholder="Describe your company..."></textarea>
                </div>
              </div>

              {/* Contact & Links */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800">Contact & Social Links</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="relative">
                    <Globe className="absolute left-4 top-10 text-slate-400" size={16} />
                    <label className="block mb-1 text-sm font-semibold text-slate-600">Website URL</label>
                    <input type="url" placeholder="https://..." className="w-full py-3 pr-4 border outline-none pl-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-10 text-slate-400" size={16} />
                    <label className="block mb-1 text-sm font-semibold text-slate-600">Official Email</label>
                    <input type="email" placeholder="hr@company.com" className="w-full py-3 pr-4 border outline-none pl-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500" />
                  </div>
                  <div className="relative">
                    <Linkedin className="absolute left-4 top-10 text-slate-400" size={16} />
                    <label className="block mb-1 text-sm font-semibold text-slate-600">LinkedIn</label>
                    <input type="text" placeholder="linkedin.com/company/..." className="w-full py-3 pr-4 border outline-none pl-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500" />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-10 text-slate-400" size={16} />
                    <label className="block mb-1 text-sm font-semibold text-slate-600">Headquarters</label>
                    <input type="text" placeholder="Colombo, Sri Lanka" className="w-full py-3 pr-4 border outline-none pl-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Companyprofile;