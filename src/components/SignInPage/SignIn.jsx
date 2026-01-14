import React, { useState, useEffect } from 'react'; 
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react'; 
import Signuppage from '../Signuppage/Signuppage.jsx';
import Studentdashboard from '../Studentmaindashboard/StudentDashboard/StudentDashboard.jsx';
import ForgotPassword from '../Forgetpassword/Forgetpassword.jsx';


const SignIn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  

  const roleFromUrl = searchParams.get('role') || 'Internship Seeker';
  const [selectedRole, setSelectedRole] = useState(roleFromUrl);
  const [showPassword, setShowPassword] = useState(false); 

 
  useEffect(() => {
    const urlRole = searchParams.get('role');
    if (urlRole) {
      setSelectedRole(urlRole);
    }
  }, [searchParams]);

  
  const handleSignIn = (e) => {
    e.preventDefault(); 
    console.log("Signing in as:", selectedRole);

    if (selectedRole === 'Admin') {
      navigate('/admin-dashboard');
    } else if (selectedRole === 'Company') {
      navigate('/company-dashboard');
      
    } else {
      navigate('/student-dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 font-sans bg-slate-50">
      <div className="w-full max-w-[480px] rounded-[2rem] bg-white p-12 shadow-xl">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 mb-8 font-medium text-gray-500 transition-colors hover:text-blue-600"
        >
          ← Back
        </button>
        
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">Sign in</h2>
        <p className="mt-2 text-gray-500">Welcome back! Please enter your details.</p>

        {/* --- Role Selection Tabs --- */}
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

        {/* --- Sign In Form --- */}
        <form onSubmit={handleSignIn} className="space-y-6">
          
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email address</label>
            <div className="relative">
              <Mail className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2" size={20} />
              <input 
                type="email" 
                placeholder="student@skillpivot.lk" 
                className="w-full p-4 pl-12 transition-all border border-gray-200 rounded-xl bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                required 
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2" size={20} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="w-full p-4 pl-12 transition-all border border-gray-200 rounded-xl bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                required 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-4 top-1/2 hover:text-blue-600"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /> 
              <span className="transition-colors group-hover:text-gray-900">Remember me</span>
            </label>
            <button 
              type="button" 
              onClick={() => navigate('/forget-password')} 
              className="text-sm font-bold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            >
              
              Forgot password?
            </button>
          </div>

          {/* Dynamic Login Button */}
          <button 
            type="submit" 
            onClick={() => navigate('/student-dashboard')} 
            className="w-full p-4 text-lg font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] shadow-blue-100"
          >
            Sign in as {selectedRole.split(' ')[0]}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 font-medium text-gray-400 uppercase bg-white">Or continue with</span>
          </div>
        </div>

        {/* Social Logins */}
        <div className="flex gap-4">
          <button type="button" className="flex items-center justify-center w-1/2 gap-2 p-3 text-sm font-semibold transition-all border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300">
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="h-5" alt="Google" /> Google
          </button>
          <button type="button" className="flex items-center justify-center w-1/2 gap-2 p-3 text-sm font-semibold transition-all border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300">
            <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="h-5" alt="LinkedIn" /> LinkedIn
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-10 text-sm text-center text-gray-500">
          Don't have an account? 
          <button 
            type="button" 
            onClick={() => navigate('/signup')} 
            className="ml-1 font-bold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
          >
            Sign up for free
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;