import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(29);
  const navigate = useNavigate();

  // තත්පර 29 සිට පහළට ගණනය කරන Timer එක
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // OTP Input එක හැසිරවීම (Next box එකට ඉබේම මාරු වීම)
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    console.log("Verifying OTP:", finalOtp);
    // මෙතැනදී Backend එකට OTP එක යවා පරීක්ෂා කරන්න
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-sans bg-slate-50">
      
      {/* Back Link */}
      <button 
        onClick={() => navigate('/signin')}
        className="absolute flex items-center text-sm font-medium transition-colors top-10 text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Login
      </button>

      {/* Main Card */}
      <div className="w-full max-w-md p-10 bg-white shadow-xl rounded-[2rem] text-center border border-slate-100">
        
        {/* Shield Icon */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-slate-800">Enter OTP</h2>
        <p className="mb-1 text-sm text-slate-500">
          We've sent a 4-digit code to <span className="font-semibold text-slate-700">student@university.edu</span>
        </p>
        <p className="mb-8 text-sm text-slate-500">Please verify your identity.</p>

        <form onSubmit={handleVerify}>
          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="h-16 text-2xl font-bold text-center transition-all border-2 w-14 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none"
                value={data}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
              />
            ))}
          </div>

          <div className="mb-8 text-sm">
            <span className="text-slate-500">Didn't receive code? </span>
            <button 
              type="button" 
              disabled={timer > 0}
              className={`font-bold ${timer > 0 ? 'text-slate-300' : 'text-blue-600 hover:underline'}`}
            >
              Resend Code
            </button>
            {timer > 0 && (
              <p className="mt-1 text-xs text-slate-400">Wait 00:{timer < 10 ? `0${timer}` : timer}s before resending</p>
            )}
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="flex items-center justify-center w-full py-4 text-sm font-bold text-white transition-all bg-blue-600 shadow-lg rounded-2xl hover:bg-blue-700 shadow-blue-100"
            >
              Verify Code <ChevronRight className="w-4 h-4 ml-1" />
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="w-full py-3 text-sm font-bold transition-all text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Footer Text */}
      <p className="mt-8 text-[11px] text-slate-400 font-medium">
        Protected by SkillPivotlk Security
      </p>
    </div>
  );
};

export default VerifyOTP;