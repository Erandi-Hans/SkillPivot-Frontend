import React, { useState } from 'react';
import { LayoutGrid, Eye, EyeOff, Mail, Lock, Building2 } from 'lucide-react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signuppage = () => {
    const navigate = useNavigate();

    // Form states
    const [role, setRole] = useState('Internship Seeker');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState(''); // State for company-specific registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Data bundle to be sent to the API
            const registrationData = {
                Email: email,
                Password: password,
                Role: role,
                // Send CompanyName only if the role is 'Company', otherwise send null
                CompanyName: role === 'Company' ? companyName : null,
                // Send names only if the role is NOT 'Company'
                Firstname: role !== 'Company' ? firstName : null, 
                Lastname: role !== 'Company' ? lastName : null
            };

            // Making the POST request to the backend
            const response = await axios.post('https://localhost:7118/api/Auth/register', registrationData);
            
            // Logging the response for debugging purposes
            console.log("Server Response:", response.data);
            
            alert("Account created successfully!");
            navigate('/signin'); 
        } catch (error) {
            // Error handling with custom message from server if available
            alert("Error: " + (error.response?.data?.message || "Registration failed"));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-slate-200">
            <div className="bg-white w-full max-w-[1000px] flex flex-col lg:flex-row rounded-[2rem] shadow-2xl overflow-hidden min-h-[700px]">
                
                {/* Left Side Section - Branding & Info */}
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
                            Connect with top companies and kickstart your career.
                        </p>
                    </div>
                </div>

                {/* Right Side Section - Form Inputs */}
                <div className="flex-1 p-10 overflow-y-auto bg-white lg:p-14">
                    <div className="mb-6 text-right">
                        <span className="text-sm text-gray-400">Already a member? </span>
                        <button className="text-sm font-semibold text-blue-600 hover:underline" onClick={() => navigate('/signin')}>
                            Sign In
                        </button>
                    </div>

                    <h2 className="mb-2 text-3xl font-bold text-gray-900">Create an account</h2>
                    <p className="mb-8 text-sm text-gray-500">Select your role and enter details below.</p>

                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Role Selection Tabs */}
                        <div>
                            <label className="block mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">Select your role</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Company', 'Internship Seeker', 'Admin'].map((r) => (
                                    <label key={r} className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${role === r ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-blue-300'}`}>
                                        <input type="radio" name="role" value={r} checked={role === r} onChange={(e) => setRole(e.target.value)} className="hidden" />
                                        <span className="text-xs font-semibold text-gray-700">{r}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Conditional Fields based on Role */}
                        {role === 'Company' ? (
                            /* Company Specific Field */
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <label className="block mb-1 text-sm font-medium text-gray-700">Company Name</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                                    <input 
                                        type="text" 
                                        placeholder="TechSys Solutions" 
                                        className="w-full p-3 pl-10 transition-all border border-gray-100 outline-none bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500" 
                                        value={companyName} 
                                        onChange={(e) => setCompanyName(e.target.value)} 
                                        required 
                                    />
                                </div>
                            </div>
                        ) : (
                            /* Individual User Fields (Internship Seeker / Admin) */
                            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">First name</label>
                                    <input type="text" placeholder="John" className="w-full p-3 border border-gray-100 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Last name</label>
                                    <input type="text" placeholder="Doe" className="w-full p-3 border border-gray-100 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                </div>
                            </div>
                        )}

                        {/* Common Credentials (Email & Password) */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                                <input type="email" placeholder="john@example.com" className="w-full p-3 pl-10 border border-gray-100 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full p-3 pl-10 border border-gray-100 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-[0.98]">
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signuppage;