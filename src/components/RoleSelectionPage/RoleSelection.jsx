import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, GraduationCap, ShieldCheck, LayoutGrid } from 'lucide-react';

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    { id: 'company', title: 'Company', desc: 'Register your organization & hire top talent.', icon: <Building2 />, color: 'bg-blue-600' },
    { id: 'seeker', title: 'Internship Seeker', desc: 'Build your profile & apply for internships.', icon: <GraduationCap />, color: 'bg-blue-500' },
    { id: 'admin', title: 'Admin', desc: 'Access platform management tools.', icon: <ShieldCheck />, color: 'bg-indigo-700' }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-6 font-sans bg-blue-50">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
        
        {/* left side */}
        <div className="hidden w-5/12 p-12 text-white bg-gradient-to-b from-blue-600 to-blue-400 md:flex md:flex-col md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold">
               <span className="px-2 text-blue-600 bg-white rounded-lg">S</span> SkillPivotlk
            </div>
            <div className="flex flex-col items-center mt-20 text-center">
              <div className="p-4 mb-6 bg-white/20 rounded-2xl"><LayoutGrid size={48} /></div>
              <h1 className="text-5xl font-bold leading-tight">Welcome</h1>
			  
              <p className="mt-4 text-lg opacity-90">Let's get started! Choose the option that best describes you to proceed to your personalized dashboard.</p>
            </div>
          </div>
          <p className="text-sm opacity-70">© 2025 SkillPivotlk. All rights reserved.</p>
        </div>
		
		

        {/* right side */}
        <div className="flex flex-col items-center justify-center w-full p-12 md:w-7/12">
		
          <div className="mb-10 text-center">
		  
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-xl"><LayoutGrid /></div>
            <h2 className="text-3xl font-bold text-gray-800">Select Your Role</h2>
            <p className="mt-2 text-gray-500">Please select the role that best describes your intent on the platform.</p>
          </div>

          <div className="w-full max-w-md space-y-4">
            {roles.map((role) => (
              <button 
                key={role.id}
                onClick={() => navigate(`/signin?role=${role.title}`)}
                className={`flex w-full items-center justify-between rounded-2xl ${role.color} p-5 text-white transition-transform hover:scale-[1.02] shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/20">{role.icon}</div>
                  <div className="text-left">
                    <p className="text-lg font-bold">{role.title}</p>
                    <p className="text-xs opacity-80">{role.desc}</p>
                  </div>
                </div>
                <span className="text-xl">→</span>
              </button>
            ))}
          </div>
          <p className="mt-10 text-gray-500">Already have an account? <button onClick={() => navigate('/signin')} className="font-bold text-blue-600 hover:underline">Log in here</button></p>
        </div>
		
		
		
		
		
		
		
		
      </div>
    </div>
  );
};

export default RoleSelection;