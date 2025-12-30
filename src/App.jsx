import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import RoleSelection from './components/RoleSelectionPage/RoleSelection';
import SignIn from './components/SignInPage/SignIn';
import Signuppage from './components/Signuppage/Signuppage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Role Selection */}
        <Route path="/" element={<RoleSelection />} />
        
        {/* Sign In Page */}
        <Route path="/signin" element={<SignIn />} />

          {/* Sign up Page */}
        <Route path="/signup" element={<Signuppage/>} />
        
       

      </Routes>
    </Router>
    
  );
}

export default App;