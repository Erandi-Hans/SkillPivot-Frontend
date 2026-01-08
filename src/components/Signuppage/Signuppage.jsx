import React, { useState } from 'react';
import { LayoutGrid, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signuppage = () => {
    // Navigate function initialization
    const navigate = useNavigate();

    // Form states
    const [role, setRole] = useState('Internship Seeker');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Connection to your .NET Auth API
            const response = await axios.post('https://localhost:7118/api/Auth/register', {
                email: email,
                password: password,
                role: role,
                firstName: firstName, // සාමාන්‍යයෙන් register වලදී මේවාත් යවනවා
                lastName: lastName
            });
            alert("Account created successfully!");
            navigate('/signin'); // සාර්ථක වූ පසු signin පිටුවට යොමු කිරීම
        } catch (error) {
            alert("Error: " + (error.response?.data?.message || "Registration failed"));
        }
    };

    return (
        // Main background wrapper
        <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-slate-200">
            
            {/* The Main "Card" Container */}
            <div className="bg-white w-full max-w-[1000px] flex flex-col lg:flex-row rounded-[2rem] shadow-2xl overflow-hidden min-h-[700px]">
                
                {/* Left Side - Blue Branding Section */}
                <div className="lg:w-[40%] bg-blue-600 p-10 flex flex-col justify-between text-white">
                    <div>
                        <div className="flex items-center gap-2 mb-10">
                            <div className="bg-white p-1.5 rounded-lg">
                                <LayoutGrid className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-xl italic font-bold tracking-tight">SkillPivotlk</span>
                        </div>
                        <h1 className="mb-6 text-4xl font-bold leading-tight">Start your journey today.</h1>
                        <p className="text-base leading-relaxed text-blue-100">
                            Join thousands of IT students finding their perfect internship match. 
                            Connect with top companies and kickstart your career.
                        </p>
                    </div>
                    
                    <div>
                        <div className="flex mb-4 -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 overflow-hidden bg-gray-300 border-2 border-blue-600 rounded-full">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                </div>
                            ))}
                            <div className="flex items-center justify-center w-10 h-10 text-xs font-bold bg-blue-500 border-2 border-blue-600 rounded-full">+2k</div>
                        </div>
                        <p className="text-xs text-blue-100">Trusted by students from top universities</p>
                    </div>
                </div>

                {/* Right Side - Form Section */}
                <div className="flex-1 p-10 overflow-y-auto bg-white lg:p-14">
                    <div className="mb-6 text-right">
                        <span className="text-sm text-gray-400">Already a member? </span>
                        <button 
                            className="text-sm font-semibold text-blue-600 hover:underline" 
                            onClick={() => navigate('/signin')}
                        >
                            Sign In
                        </button>
                    </div>

                    <h2 className="mb-2 text-3xl font-bold text-gray-900">Create an account</h2>
                    <p className="mb-8 text-sm text-gray-500">Enter your details below to create your account and get started.</p>

                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Role Selection */}
                        <div>
                            <label className="block mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">Select your role</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Company', 'Internship Seeker', 'Admin'].map((r) => (
                                    <label key={r} className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${role === r ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-blue-300'}`}>
                                        <input type="radio" name="role" value={r} checked={role === r} onChange={(e) => setRole(e.target.value)} className="hidden" />
                                        <div className={`w-3 h-3 rounded-full border mr-2 flex items-center justify-center ${role === r ? 'border-blue-600' : 'border-gray-400'}`}>
                                            {role === r && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />}
                                        </div>
                                        <span className="text-xs font-semibold text-gray-700">{r}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">First name</label>
                                <input type="text" placeholder="John" className="w-full p-3 transition-all border border-gray-100 outline-none bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Last name</label>
                                <input type="text" placeholder="Doe" className="w-full p-3 transition-all border border-gray-100 outline-none bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                                <input type="email" placeholder="john@example.com" className="w-full p-3 pl-10 transition-all border border-gray-100 outline-none bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full p-3 pl-10 transition-all border border-gray-100 outline-none bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="terms" className="w-4 h-4 text-blue-600 rounded" required />
                            <label htmlFor="terms" className="text-xs text-gray-500">I agree to the <span className="font-medium text-blue-600">Terms and Conditions</span> and <span className="font-medium text-blue-600">Privacy Policy</span>.</label>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]">
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signuppage;