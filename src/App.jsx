import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import RoleSelection from './components/RoleSelectionPage/RoleSelection';
import SignIn from './components/SignInPage/SignIn';
import Signuppage from './components/Signuppage/Signuppage';
import ForgotPassword from './components/Forgetpassword/Forgetpassword';
import EnterOTP from './components/EnterOTP/EnterOTP';
import StudentDashboard from './components/Studentmaindashboard/StudentDashboard/StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Role Selection */}
        <Route path="/" element={<RoleSelection />} />
        
        {/* Sign In Page */}
        <Route path="/signin" element={<SignIn />} />

          {/* Sign up Page */}
        <Route path="/signup" element={<Signuppage />} />
       
        {/* Forget password page */}
      <Route path="/forget-password" element={<ForgotPassword />} />

      {/* Forget password page */}
      <Route path="/enter-otp" element={<EnterOTP />} />

      {/* Student dashboard */}
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      

      </Routes>
    </Router>
    
  );
}

export default App;