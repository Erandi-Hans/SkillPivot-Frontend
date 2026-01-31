import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CompanyNavbar from '../Companynavbar/Companynavbar.jsx';
import { Building2, Globe, Mail, MapPin, Camera, Save, Loader2 } from 'lucide-react';

const Companyprofile = () => {
  const fileInputRef = useRef(null);
  
  // Retrieve the unique Company ID stored during login
  const companyId = localStorage.getItem('companyId');

  // Initialize state for form fields
  const [formData, setFormData] = useState({
    CompanyName: '',
    Industry: '',
    Description: '',
    Website: '',
    ContactEmail: '',
    Location: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  /**
   * 1. Fetch Company Data on Component Mount
   * Retrieves existing profile details from the backend using the companyId.
   */
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!companyId) {
        console.error("No Company ID found in local storage.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7118/api/Companies/${companyId}`);
        const data = response.data;

        // Map backend response to state (ensure keys match backend DTO)
        setFormData({
          CompanyName: data.companyName || '',
          Industry: data.industry || '',
          Description: data.description || '',
          Website: data.website || '',
          ContactEmail: data.contactEmail || '',
          Location: data.location || ''
        });

        // Construct absolute URL for the logo if a path exists
        if (data.logoUrl) {
          setImagePreview(`https://localhost:7118${data.logoUrl}`);
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  /**
   * 2. Handle Text Input Changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * 3. Handle File Selection for Logo
   * Generates a local preview URL before uploading to the server.
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Base64 preview for instant UI feedback
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * 4. Save/Update Profile Logic
   * Uses FormData to handle both text fields and the image file (multipart/form-data).
   */
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const dataToSend = new FormData();
      
      // Append text data
      dataToSend.append('CompanyName', formData.CompanyName);
      dataToSend.append('Industry', formData.Industry);
      dataToSend.append('Description', formData.Description);
      dataToSend.append('Website', formData.Website);
      dataToSend.append('ContactEmail', formData.ContactEmail);
      dataToSend.append('Location', formData.Location);
      
      // Append image file if a new one was selected
      if (selectedFile) {
        dataToSend.append('Logo', selectedFile);
      }

      await axios.put(`https://localhost:7118/api/Companies/${companyId}`, dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Failed to update profile. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  // Render loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-slate-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="font-sans font-medium text-slate-600">Syncing profile data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-slate-100">
      <CompanyNavbar />
      <main className="container max-w-5xl px-4 py-8 mx-auto">
        <div className="p-8 bg-white border shadow-md rounded-3xl border-slate-200">
          
          {/* Header Section */}
          <div className="flex flex-col items-start justify-between gap-4 pb-6 mb-8 border-b sm:flex-row sm:items-center border-slate-100">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Company Profile</h1>
              <p className="mt-1 text-slate-500">Manage your organization's public identity and contact details.</p>
            </div>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSaving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            
            {/* Branding / Logo Upload Section */}
            <div className="flex flex-col items-center p-6 border border-slate-100 bg-slate-50/50 rounded-3xl h-fit">
              <div className="relative group">
                <div className="flex items-center justify-center w-32 h-32 overflow-hidden bg-white border-4 border-white shadow-xl rounded-3xl">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Company Logo" className="object-cover w-full h-full" />
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
                  title="Change Logo"
                  className="absolute bottom-[-5px] right-[-5px] p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
                >
                  <Camera size={18} />
                </button>
              </div>
              <h3 className="mt-6 text-xl font-bold text-center text-slate-800">{formData.CompanyName || 'Organization Name'}</h3>
              <p className="text-sm text-slate-500">Authorized Profile</p>
            </div>

            {/* Information Form Section */}
            <div className="space-y-8 lg:col-span-2">
              {/* General Details */}
              <div className="space-y-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                  General Information
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600">Company Name</label>
                    <input name="CompanyName" value={formData.CompanyName} onChange={handleChange} type="text" className="w-full px-4 py-3 transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600">Industry</label>
                    <input name="Industry" value={formData.Industry} onChange={handleChange} type="text" placeholder="e.g. Technology, Finance" className="w-full px-4 py-3 transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">About the Company</label>
                  <textarea name="Description" value={formData.Description} onChange={handleChange} rows="4" className="w-full px-4 py-3 transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Briefly describe your company's mission and culture..."></textarea>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800">Communication & Presence</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600">Website URL</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-3.5 text-slate-400" size={16} />
                      <input name="Website" value={formData.Website} onChange={handleChange} type="url" placeholder="https://www.example.com" className="w-full py-3 pr-4 border outline-none pl-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600">Public Contact Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 text-slate-400" size={16} />
                      <input name="ContactEmail" value={formData.ContactEmail} onChange={handleChange} type="email" placeholder="contact@org.com" className="w-full py-3 pr-4 border outline-none pl-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-600">Headquarters Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 text-slate-400" size={16} />
                      <input name="Location" value={formData.Location} onChange={handleChange} type="text" placeholder="City, Country" className="w-full py-3 pr-4 border outline-none pl-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
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