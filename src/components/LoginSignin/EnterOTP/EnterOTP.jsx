import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnterOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(29);

  // Timer logic for resending code
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen font-sans bg-slate-50">
      
      {/* Top Navigation */}
      <header className="p-6">
        <button 
          onClick={() => navigate('/signin')}
          className="flex items-center text-sm font-medium transition-colors text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Login
        </button>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center flex-grow p-4">
        <div className="w-full max-w-md p-10 bg-white border shadow-sm rounded-3xl border-slate-100">
          
          {/* Shield Icon */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 text-blue-600 rounded-xl bg-blue-50">
              <ShieldCheck size={24} />
            </div>
          </div>

          <h2 className="mb-2 text-2xl font-bold text-center text-slate-800">Enter OTP</h2>
          <p className="mb-8 text-sm text-center text-slate-500">
            We've sent a 4-digit code to <span className="font-semibold text-slate-700">student@university.edu</span>. 
            Please verify your identity.
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="text-xl font-bold text-center transition-all bg-white border-2 w-14 h-14 rounded-xl border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                value={data}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
              />
            ))}
          </div>

          <div className="mb-8 text-sm text-center">
            <p className="text-slate-500">
              Didn't receive code? 
              <button 
                disabled={timer > 0}
                className={`ml-1 font-bold ${timer > 0 ? 'text-slate-300 cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
              >
                Resend Code
              </button>
            </p>
            {timer > 0 && (
              <p className="mt-1 text-xs font-medium text-slate-400">
                Wait 00:{timer < 10 ? `0${timer}` : timer}s before resending
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              className="flex items-center justify-center w-full py-4 font-bold text-white transition-all bg-blue-600 shadow-lg rounded-2xl hover:bg-blue-700 active:scale-95 shadow-blue-100"
            >
              Verify Code <ArrowRight size={18} className="ml-2" />
            </button>
            <button 
              onClick={() => navigate('/signin')}
              className="w-full py-4 font-bold transition-colors border border-slate-100 rounded-2xl text-slate-500 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center">
        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
          Protected by SkillPivotlk Security
        </p>
      </footer>
    </div>
  );
};

export default EnterOTP;
