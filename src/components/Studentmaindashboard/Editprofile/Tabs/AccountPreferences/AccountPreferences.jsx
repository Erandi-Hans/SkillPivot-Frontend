import React from 'react';

// පොදු Row Component එකක් (වෙලාව ඉතිරි කර ගැනීමට)
const SettingRow = ({ title, value, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between px-2 py-4 transition border-b border-gray-100 rounded-md cursor-pointer group hover:bg-gray-50 last:border-0"
  >
    <div className="flex-1">
      <p className="text-[15px] font-medium text-gray-800 group-hover:text-blue-600">
        {title}
      </p>
      {value && <p className="text-sm text-gray-500 mt-0.5">{value}</p>}
    </div>
    <span className="font-light text-gray-400 transition-transform group-hover:translate-x-1">
      →
    </span>
  </div>
);

const AccountPreferences = () => {
  return (
    <div className="max-w-2xl pb-10 mx-auto space-y-6">
      
      {/* 1. Profile Information */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Profile information</h2>
          <div className="flex flex-col">
            <SettingRow title="Name, location, and industry" />
            <SettingRow title="Personal demographic information" />
            <SettingRow title="Verifications" />
          </div>
        </div>
      </section>

      {/* 2. Display Section */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Display</h2>
          <SettingRow title="Dark mode" value="Off" />
        </div>
      </section>

      {/* 3. General Preferences Section */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">General preferences</h2>
          <div className="flex flex-col">
            <SettingRow title="Language" value="English" />
            <SettingRow title="Content language" value="English" />
            <SettingRow title="Autoplay videos" value="On" />
            <SettingRow title="Sound effects" value="On" />
            <SettingRow title="Showing profile photos" value="All LinkedIn members" />
            <SettingRow title="Preferred feed view" value="Most relevant posts (Recommended)" />
          </div>
        </div>
      </section>

      {/* 4. Account Management (අමතර වැදගත් කොටසක්) */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Account management</h2>
          <div className="flex flex-col">
            <SettingRow title="Hibernate account" />
            <SettingRow title="Close account" />
          </div>
        </div>
      </section>

      {/* Footer Links (LinkedIn විලාසිතාවට) */}
      <div className="flex flex-wrap justify-center gap-4 py-6 text-xs text-gray-500">
        <span>Help Center</span>
        <span>Privacy Policy</span>
        <span>Accessibility</span>
        <span>User Agreement</span>
      </div>

    </div>
  );
};

export default AccountPreferences;