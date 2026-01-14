import React from 'react';
import { Mail, ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EnterOTP from '../EnterOTP/EnterOTP.jsx';

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between min-h-screen font-sans bg-slate-50">
      {/* Header Section */}
      <header className="flex items-center justify-between w-full p-6">
        <div className="text-2xl font-bold text-blue-700">SkillPivotlk</div>
        <button 
          onClick={() => navigate('/signin')}
          className="flex items-center font-medium transition-colors text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Login
        </button>
      </header>

      {/* Main Card Section */}
      <main className="flex items-center justify-center flex-grow p-4">
        <div className="w-full max-w-md p-8 text-center bg-white border shadow-sm rounded-2xl border-slate-100">
          
          {/* Icon Container */}
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-blue-600 rounded-lg bg-blue-50">
            <RotateCcw size={24} />
          </div>

          <h2 className="mb-2 text-2xl font-bold text-slate-800">Forgot password?</h2>
          <p className="px-4 mb-8 text-sm text-slate-500">
            Enter your registered email and we'll send you a secure link to reset your password.
          </p>

          <form className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full py-3 pl-10 pr-4 text-sm transition-all border bg-slate-50 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/enter-otp')} 
              className="w-full py-3 font-bold text-white transition-colors bg-blue-600 shadow-md hover:bg-blue-700 rounded-xl shadow-blue-100"
            >
              Reset Password
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-3 font-semibold tracking-wider bg-white text-slate-400">Or</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="space-y-3">
            <button className="flex items-center justify-center w-full gap-3 px-4 py-3 text-sm font-semibold transition-colors border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>
            <button className="flex items-center justify-center w-full gap-3 px-4 py-3 text-sm font-semibold transition-colors border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700">
              <Mail size={18} className="text-slate-600" />
              Continue with Gmail
            </button>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Need help? <a href="#" className="font-bold text-blue-600 hover:underline">Contact Support</a>
          </p>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="p-8 text-center">
        <div className="flex justify-center space-x-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
          <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600">Terms of Service</a>
          <a href="#" className="hover:text-slate-600">Help Center</a>
        </div>
        <p className="text-[10px] text-slate-400">
          © 2024 SkillPivotlk Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ForgotPassword;