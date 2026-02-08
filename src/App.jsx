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
import AccountPreferences from './components/Studentmaindashboard/Editprofile/Tabs/AccountPreferences/AccountPreferences';
import Signsecurity from './components/Studentmaindashboard/Editprofile/Tabs/Signsecurity/Signsecurity';
import VisibilitySettings from './components/Studentmaindashboard/Editprofile/Tabs/VisibilitySettings/VisibilitySettings';
import DataPrivacy from './components/Studentmaindashboard/Editprofile/Tabs/DataPrivacy/DataPrivacy';

import Companydashbord from './components/Companymaindashboard/Companydashbord/Companydashbord';
import CompanyNavbar from './components/Companymaindashboard/Maincompo/Companynavbar/Companynavbar';

import Companymanagejobs from './components/Companymaindashboard/Maincompo/Companymanagejobs/Companymanagejobs';
import CompanypostaJob from './components/Companymaindashboard/Maincompo/CompanypostaJob/CompanypostaJob';
import Companyapplication from './components/Companymaindashboard/Maincompo/Companyapplication/Companyapplication';
import Companyprofile from './components/Companymaindashboard/Maincompo/Companyprofile/Companyprofile';

import AdminDashboard from './components/Admindashboardmain/Admindashboard/Admindashboard';
import AdminNavbar from './components/Admindashboardmain/Adminnavbar/Adminnavbar';
import Adminusermanagemnt from './components/Adminusermanagemnt/Adminusermanagemnt';
import Admincompanyverification from './components/Admincompanyverification/Admincompanyverification';
import Adminjob from './components/Admindashboardmain/Adminmaincompo/Adminjob/Adminjob';
import Adminsystemsettings from './components/Admindashboardmain/Adminmaincompo/Adminsystemsettings/Adminsystemsettings';
import AdminUserManagement from './components/Admindashboardmain/Adminmaincompo/Adminusermanagemnt/Adminusermanagemnt';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/enter-otp" element={<EnterOTP />} />

        {/* Student Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/cv-generate" element={<Cvgenerate />} />
        <Route path="/edit-profile" element={<Editprofile />} />
        <Route path="/find-jobs" element={<FindJob />} />
        <Route path="/applications" element={<Manageapplication />} />
        <Route path="/accountPreferences" element={<AccountPreferences />} />
        <Route path="/signsecurity" element={<Signsecurity/>} />
        <Route path="/visibilitySettings" element={<VisibilitySettings/>} />
        <Route path="/dataPrivacy" element={<DataPrivacy/>} />

        {/* Company Routes */}
        <Route path="/company-dashboard" element={<Companydashbord/>} />
        <Route path="/companyNavbar" element={<CompanyNavbar/>} />
        <Route path="/companypostaJob/:id?" element={<CompanypostaJob/>} />
        <Route path="/companymanagejobs" element={<Companymanagejobs/>}/>
        <Route path="/companyapplication" element={<Companyapplication/>}/>
        <Route path="/companyprofile" element={<Companyprofile/>}/>



        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/admin-navbar" element={<AdminNavbar/>} />
        


        <Route path="/admin-users" element={<AdminUserManagement/>} />
        <Route path="/admin-verifications" element={<Admincompanyverification/>} />
        <Route path="/admin-jobs" element={<Adminjob/>} />
        <Route path="/admin-settings" element={<Adminsystemsettings/>} />
        
        
      </Routes>
    </Router>
  );
}

export default App;