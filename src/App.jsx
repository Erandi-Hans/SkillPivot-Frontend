import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import RoleSelection from './components/LoginSignin/RoleSelectionPage/RoleSelection';
import SignIn from './components/LoginSignin/SignInPage/SignIn';
import Signuppage from './components/LoginSignin/Signuppage/Signuppage';
import ForgotPassword from './components/LoginSignin/Forgetpassword/Forgetpassword';
import EnterOTP from './components/LoginSignin/EnterOTP/EnterOTP';
import StudentDashboard from './components/Studentmaindashboard/StudentDashboard/StudentDashboard';
import Cvgenerate from './components/Studentmaindashboard/Cvgenerate/Cvgenerate';
import Editprofile from './components/Studentmaindashboard/Editprofile/Editprofile';
import FindJob from './components/Studentmaindashboard/FindJob/FindJob';
import Manageapplication from './components/Studentmaindashboard/Manageapplication/Manageapplication';

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

      {/* Generate cv*/}
      <Route path="/cv-generate" element={<Cvgenerate />} />

       {/* Edit profile*/}
      <Route path="/edit-profile" element={<Editprofile />} />

       {/* Find jobs*/}
      <Route path="/find-jobs" element={<FindJob />} />

       {/* Manage applications*/}
      <Route path="/applications" element={<Manageapplication />} />
      

      </Routes>
    </Router>
    
  );
}

export default App;