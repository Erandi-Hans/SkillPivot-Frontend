import React from 'react';

const SecurityRow = ({ title, value, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between px-2 py-5 transition border-b border-gray-100 cursor-pointer group hover:bg-gray-50 last:border-0"
  >
    <div className="flex-1">
      <p className="text-[15px] font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
        {title}
      </p>
      {value && <p className="mt-1 text-sm font-normal text-gray-500">{value}</p>}
    </div>
    <span className="ml-4 font-light text-gray-400 transition-transform group-hover:translate-x-1">
      →
    </span>
  </div>
);

const Signsecurity = () => {
  return (
    <div className="max-w-2xl pb-12 mx-auto space-y-6">
      
      {/* SECTION 1: Account Access */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Account access</h2>
          <p className="mb-4 text-sm text-gray-500">Select an option to make changes.</p>
          
          <div className="flex flex-col">
            <SecurityRow 
              title="Email addresses" 
              value="erandi2287hansika@gmail.com" 
            />
            <SecurityRow 
              title="Phone numbers" 
              value="Add a phone number in case you have trouble signing in" 
            />
            <SecurityRow 
              title="Change password" 
              value="Choose a unique password to protect your account" 
            />
             <SecurityRow 
              title="Passkeys" 
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Added Protection */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Added protection</h2>
          <div className="flex flex-col">
            <SecurityRow 
              title="Two-step verification" 
              value="Off" 
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Signsecurity;