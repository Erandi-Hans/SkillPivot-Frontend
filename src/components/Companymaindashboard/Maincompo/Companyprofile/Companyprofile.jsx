import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CompanyNavbar from '../Companynavbar/Companynavbar.jsx';
import { Building2, Globe, Mail, MapPin, Camera, Save, Linkedin } from 'lucide-react';

const Companyprofile = () => {
  const fileInputRef = useRef(null);
  const companyId = 1; // Replace with dynamic ID from your auth context/session

  // 1. State for Form Data
  const [formData, setFormData] = useState({
    CompanyName: '',
    Industry: '',
    Description: '',
    Website: '',
    ContactEmail: '',
    LinkedIn: '',
    Location: ''
  });

  // 2. State for Image Preview
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // 3. Fetch Data on Load
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`https://localhost:7118/api/Companies/${companyId}`);
        const data = response.data;
        setFormData({
          CompanyName: data.CompanyName || '',
          Industry: data.Industry || '',
          Description: data.Description || '',
          Website: data.Website || '',
          ContactEmail: data.ContactEmail || '',
          LinkedIn: data.LinkedIn || '',
          Location: data.Location || ''
        });
        // If your backend returns a logo URL, set it here
        if (data.LogoUrl) setImagePreview(data.LogoUrl);
      } catch (error) {
        console.error("Error fetching company profile:", error);
      }
    };
    fetchCompanyData();
  }, [companyId]);

  // 4. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 5. Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 6. Save Changes to Backend
  const handleSave = async () => {
    try {
      // Use FormData if you are uploading a file to the backend
      const dataToSend = new FormData();
      dataToSend.append('CompanyName', formData.CompanyName);
      dataToSend.append('Industry', formData.Industry);
      dataToSend.append('Description', formData.Description);
      dataToSend.append('Website', formData.Website);
      dataToSend.append('ContactEmail', formData.ContactEmail);
      dataToSend.append('Location', formData.Location);
      if (selectedFile) {
        dataToSend.append('Logo', selectedFile);
      }

      // Update API endpoint based on your Swagger
      await axios.put(`https://localhost:7118/api/Companies/${companyId}`, dataToSend);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <CompanyNavbar />
      <main className="container max-w-5xl px-4 py-8 mx-auto">
        <div className="p-8 bg-white border shadow-md rounded-3xl border-slate-200">
          
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Company Profile</h1>
              <p className="mt-1 text-slate-500">Update your company's public information and branding.</p>
            </div>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 active:scale-95 shadow-blue-200"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            
            {/* Logo Section */}
            <div className="flex flex-col items-center p-6 border border-slate-100 bg-slate-50/50 rounded-3xl h-fit">
              <div className="relative group">
                <div className="flex items-center justify-center w-32 h-32 overflow-hidden bg-white border-4 border-white shadow-xl rounded-3xl">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Logo" className="object-cover w-full h-full" />
                  ) : (
                    <Building2 size={48} className="text-slate-300" />
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  className="hidden" 
                  accept="image/*"
                />
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-[-10px] right-[-10px] p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all group-hover:scale-110"
                >
                  <Camera size={18} />
                </button>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-800">{formData.CompanyName || 'Company Name'}</h3>
              <p className="text-sm text-slate-500">Hiring Manager</p>
            </div>

            {/* Form Section */}
            <div className="space-y-8 lg:col-span-2">
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800">General Information</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600">Company Name</label>
                    <input name="CompanyName" value={formData.CompanyName} onChange={handleChange} type="text" className="w-full px-4 py-3 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600">Industry</label>
                    <input name="Industry" value={formData.Industry} onChange={handleChange} type="text" className="w-full px-4 py-3 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">About Company</label>
                  <textarea name="Description" value={formData.Description} onChange={handleChange} rows="4" className="w-full px-4 py-3 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500" placeholder="Describe your company..."></textarea>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800">Contact & Social Links</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="relative">
                    <label className="block mb-1 text-sm font-semibold text-slate-600">Website URL</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-3.5 text-slate-400" size={16} />
                      <input name="Website" value={formData.Website} onChange={handleChange} type="url" placeholder="https://..." className="w-full py-3 pr-4 border outline-none pl-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block mb-1 text-sm font-semibold text-slate-600">Official Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 text-slate-400" size={16} />
                      <input name="ContactEmail" value={formData.ContactEmail} onChange={handleChange} type="email" placeholder="hr@company.com" className="w-full py-3 pr-4 border outline-none pl-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block mb-1 text-sm font-semibold text-slate-600">Headquarters</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 text-slate-400" size={16} />
                      <input name="Location" value={formData.Location} onChange={handleChange} type="text" placeholder="Colombo, Sri Lanka" className="w-full py-3 pr-4 border outline-none pl-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Companyprofile;