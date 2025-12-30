import React, { useState, useEffect } from 'react'; // 1. useState සහ useEffect import කරන්න අමතක වී ඇත
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, Lock, EyeOff } from 'lucide-react';

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  
  const roleFromUrl = searchParams.get('role') || 'Internship Seeker';
  const [selectedRole, setSelectedRole] = useState(roleFromUrl);


  useEffect(() => {
    const urlRole = searchParams.get('role');
    if (urlRole) {
      setSelectedRole(urlRole);
    }
  }, [searchParams]);

  const handleSignIn = (e) => {
    e.preventDefault(); // Page එක refresh වීම නවත්වයි
    console.log("Signing in as:", selectedRole);
    

    if (selectedRole === 'Admin') navigate('/admin-dashboard');
    else if (selectedRole === 'Company') navigate('/company-dashboard');
    else navigate('/student-dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 font-sans bg-slate-50">
      <div className="w-full max-w-[480px] rounded-[2rem] bg-white p-12 shadow-xl">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-8 font-medium text-gray-500 hover:text-blue-600">
            ← Back
        </button>
        
        <h2 className="text-4xl font-bold text-gray-900">Sign in</h2>
        <p className="mt-2 text-gray-500">Welcome back! Please enter your details.</p>

        {/* --- Role Selection Radio Buttons --- */}
        <div className="flex p-1 mt-8 mb-8 bg-gray-100 rounded-2xl">
          {['Company', 'Internship Seeker', 'Admin'].map((role) => (
            <label key={role} className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="role"
                value={role}
                checked={selectedRole === role}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="hidden peer"
              />
              <div className="py-2.5 text-xs font-bold text-center transition-all duration-200 peer-checked:bg-white peer-checked:text-blue-600 peer-checked:shadow-sm rounded-xl text-gray-500">
                {role === 'Internship Seeker' ? 'Intern' : role}
              </div>
            </label>
          ))}
        </div>

        
        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email address</label>
            <div className="relative">
              <Mail className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2" size={20} />
              <input 
                type="email" 
                placeholder="student@skillpivot.lk" 
                className="w-full p-4 pl-12 border border-gray-200 rounded-xl bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2" size={20} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full p-4 pl-12 border border-gray-200 rounded-xl bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                required 
              />
              <EyeOff className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-4 top-1/2" size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /> Remember me
            </label>
            {/* type="button" නොදැම්මොත් මෙය click කළ විටත් form එක submit විය හැක */}
            <button type="button" onClick={() => navigate('/forgot-password')} className="text-sm font-bold text-blue-600 hover:underline">Forgot password?</button>
          </div>

          {/* 3. Button එකේ text එක dynamic කිරීම */}
          <button type="submit" className="w-full p-4 text-lg font-bold text-white transition bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 shadow-blue-200">
            Sign in as {selectedRole.split(' ')[0]}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
          <div className="relative flex justify-center text-sm"><span className="px-4 text-gray-500 uppercase bg-white">Or continue with</span></div>
        </div>

        <div className="flex gap-4">
          <button type="button" className="flex items-center justify-center w-1/2 gap-2 p-3 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50">
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="h-5" alt="Google" /> Google
          </button>
          <button type="button" className="flex items-center justify-center w-1/2 gap-2 p-3 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50">
            <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="h-5" alt="LinkedIn" /> LinkedIn
          </button>
        </div>

        <p className="mt-10 text-center text-gray-500">
          Don't have an account? 
          <button type="button" onClick={() => navigate('/signup')} className="ml-1 font-bold text-blue-600 hover:underline">Sign up for free</button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;