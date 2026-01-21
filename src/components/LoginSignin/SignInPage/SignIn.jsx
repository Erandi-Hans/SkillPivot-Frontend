import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react';

const SignIn = () => {
  // Hooks for navigation and retrieving URL parameters
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Component states
  const [selectedRole, setSelectedRole] = useState(searchParams.get('role') || 'Internship Seeker');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission and redirect based on role
  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Signing in with Email:", email);
    // Role based navigation logic
    if (selectedRole === 'Admin') {
      navigate('/admin-dashboard');
    } else if (selectedRole === 'Company') {
      navigate('/company-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  };

  // Logic for Google Sign-In (Standard placeholder)
  const handleGoogleSignIn = () => {
    console.log("Redirecting to Google OAuth...");
    // Integration logic for Google goes here
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 font-sans bg-slate-50">
      <div className="w-full max-w-[480px] rounded-[2rem] bg-white p-10 shadow-xl">
        
        {/* Back Button */}
        <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-6 font-medium text-gray-500 hover:text-blue-600">
          ← Back
        </button>

        <h2 className="text-4xl font-bold tracking-tight text-gray-900">Sign in</h2>
        <p className="mt-2 text-gray-500">Welcome back! Please enter your details.</p>

        {/* Role Selector Tabs */}
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

        {/* --- MAIN SIGN IN FORM --- */}
        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email address</label>
            <div className="relative">
              <Mail className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2" size={20} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com"
                className="w-full p-4 pl-12 border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-blue-500" required />
            </div>
          </div>

          {/* Password Input */}
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

          {/* Forgot Password Link - Placed right after Password Input */}
          <div className="flex justify-end">
            <Link to="/forget-password" size="sm" className="text-sm font-bold text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Email Sign-In Button */}
          <button type="submit" className="w-full p-4 text-lg font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 shadow-blue-200">
            Continue with Email
          </button>
        </form>

        {/* --- DIVIDER --- */}
        <div className="relative my-8 text-center">
          <span className="relative z-10 px-4 text-sm text-gray-400 bg-white">Or</span>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100"></div>
        </div>

        {/* --- GOOGLE SIGN IN OPTION --- */}
        <button 
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full gap-3 p-4 font-semibold transition-all border border-gray-200 rounded-xl hover:bg-gray-50"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>

        {/* Sign Up Link */}
        <p className="mt-8 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;