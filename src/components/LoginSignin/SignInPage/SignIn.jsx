import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react'; 

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [selectedRole, setSelectedRole] = useState(searchParams.get('role') || 'Internship Seeker');
  const [showPassword, setShowPassword] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault(); 
    if (selectedRole === 'Admin') {
      navigate('/admin-dashboard');
    } else if (selectedRole === 'Company') {
      navigate('/company-dashboard'); // App.jsx හි path එකටම සමාන විය යුතුය
    } else {
      navigate('/student-dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 font-sans bg-slate-50">
      <div className="w-full max-w-[480px] rounded-[2rem] bg-white p-12 shadow-xl">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-8 font-medium text-gray-500 hover:text-blue-600">
          ← Back
        </button>
        
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">Sign in</h2>
        
        <div className="flex p-1 mt-8 mb-8 bg-gray-100 rounded-2xl">
          {['Company', 'Internship Seeker', 'Admin'].map((role) => (
            <label key={role} className="flex-1 cursor-pointer">
              <input type="radio" name="role" value={role} checked={selectedRole === role}
                onChange={(e) => setSelectedRole(e.target.value)} className="hidden peer" />
              <div className="py-2.5 text-xs font-bold text-center transition-all peer-checked:bg-white peer-checked:text-blue-600 rounded-xl text-gray-500">
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
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@skillpivot.lk" 
                className="w-full p-4 pl-12 border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-blue-500" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2" size={20} />
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" 
                className="w-full p-4 pl-12 border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-blue-500" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2 hover:text-blue-600">
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full p-4 text-lg font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700">
            Sign in as {selectedRole.split(' ')[0]}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;