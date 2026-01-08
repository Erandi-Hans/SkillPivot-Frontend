import React from 'react';
import Navbar from '../Studentmaindashboard/Navbar/Navbar'; // Navbar එක import කරන්න

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Dashboard එකේ ඉහළින්ම Navbar එක මෙහි ඇතුළත් කරන්න */}
      <Navbar /> 

      <main className="p-6">
        {/* Dashboard එකේ ඉතිරි කොටස් (Profile Strength, Job Matches) මෙතැන් සිට */}
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        {/* ... */}
      </main>
    </div>
  );
};

export default StudentDashboard;