import React, { useState } from 'react';
import { AppData, ThemeConfig, SocialLink, BusinessCase } from '../types';
import { X, Save, Plus, Trash2, Layout, Type, Palette, Share2, User, Edit2, ChevronDown, ChevronUp, Image as ImageIcon, Video, Mic, Quote, Upload, Loader2, Link as LinkIcon, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../firebase';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  data: AppData;
  onUpdateData: (newData: AppData) => void;
  theme: ThemeConfig;
  onUpdateTheme: (newTheme: ThemeConfig) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  isOpen, onClose, data, onUpdateData, theme, onUpdateTheme 
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'theme'>('theme');
  const [localData, setLocalData] = useState<AppData>(data);
  const [localTheme, setLocalTheme] = useState<ThemeConfig>(theme);
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateData(localData);
    onUpdateTheme(localTheme);
    onClose();
  };

  const fonts = ['Inter', 'Playfair Display', 'Space Grotesk'];
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#000000'];
  const iconOptions = ['Instagram', 'Linkedin', 'Video', 'Twitter', 'Facebook', 'Youtube', 'Github', 'Mail', 'Globe'];

  // --- Social Media Handlers ---
  const updateSocial = (index: number, field: keyof SocialLink, value: string) => {
    const newSocials = [...localData.profile.socials];
    newSocials[index] = { ...newSocials[index], [field]: value };
    setLocalData({ ...localData, profile: { ...localData.profile, socials: newSocials } });
  };

  const addSocial = () => {
    setLocalData({
        ...localData,
        profile: {
            ...localData.profile,
            socials: [...localData.profile.socials, { platform: 'New Platform', url: 'https://', iconName: 'Globe' }]
        }
    });
  };

  const removeSocial = (index: number) => {
     const newSocials = [...localData.profile.socials];
     newSocials.splice(index, 1);
     setLocalData({ ...localData, profile: { ...localData.profile, socials: newSocials } });
  };

  // --- Business Case Handlers ---
  const handleAddCase = () => {
    const newCase: BusinessCase = {
        id: Date.now().toString(),
        title: "New Project",
        client: "Client Name",
        image: "https://picsum.photos/600/400",
        role: { DE: "Rolle", FR: "Rôle", EN: "Role" },
        description: { DE: "Beschreibung", FR: "Description", EN: "Description" },
        tags: ["Tag1"],
        details: {
            resultMetric: "",
            testimonial: "",
            testimonialAuthor: "",
            videoUrl: "",
            audioUrl: "",
            images: []
        }
    };
    setLocalData({ ...localData, cases: [newCase, ...localData.cases] });
    setExpandedCaseId(newCase.id);
  };

  const updateCase = (id: string, updates: Partial<BusinessCase>) => {
      setLocalData({
          ...localData,
          cases: localData.cases.map(c => c.id === id ? { ...c, ...updates } : c)
      });
  };

  const updateCaseDetail = (id: string, field: string, value: any) => {
      setLocalData({
          ...localData,
          cases: localData.cases.map(c => {
              if (c.id !== id) return c;
              return {
                  ...c,
                  details: {
                      ...c.details,
                      [field]: value
                  }
              };
          })
      });
  };

  const updateCaseLocalized = (id: string, field: 'role' | 'description', lang: 'DE' | 'FR' | 'EN', value: string) => {
      setLocalData({
          ...localData,
          cases: localData.cases.map(c => {
              if (c.id !== id) return c;
              return {
                  ...c,
                  [field]: {
                      ...c[field],
                      [lang]: value
                  }
              };
          })
      });
  };

  // --- Image Management ---
  const moveImage = (caseId: string, index: number, direction: 'left' | 'right') => {
    const currentCase = localData.cases.find(c => c.id === caseId);
    if (!currentCase || !currentCase.details?.images) return;
    
    const newImages = [...currentCase.details.images];
    if (direction === 'left' && index > 0) {
        [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
    } else if (direction === 'right' && index < newImages.length - 1) {
        [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    }
    
    updateCaseDetail(caseId, 'images', newImages);
  };

  const setPrimaryImage = (caseId: string, imageUrl: string) => {
    updateCase(caseId, { image: imageUrl });
  };

  // --- Image Upload Handler ---
  const handleImageUpload = async (caseId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    if (!storage) {
        console.error("Firebase Storage is not available.");
        alert("Image upload is currently unavailable due to configuration issues.");
        return;
    }

    setUploading(true);
    // Explicitly cast to File[] to avoid 'unknown' type in loop
    const files = Array.from(e.target.files) as File[];
    const uploadedUrls: string[] = [];

    try {
        for (const file of files) {
            // Compat API usage
            const storageRef = storage.ref(`cases/${caseId}/${Date.now()}_${file.name}`);
            const snapshot = await storageRef.put(file);
            const url = await snapshot.ref.getDownloadURL();
            uploadedUrls.push(url);
        }

        const currentCase = localData.cases.find(c => c.id === caseId);
        if (currentCase) {
            const currentImages = currentCase.details?.images || [];
            updateCaseDetail(caseId, 'images', [...currentImages, ...uploadedUrls]);
        }
    } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload images. Check console for details.");
    } finally {
        setUploading(false);
        // Reset input
        e.target.value = '';
    }
  };

  const addCustomUrl = (caseId: string) => {
    if(!customUrlInput) return;
    const currentCase = localData.cases.find(c => c.id === caseId);
    if (currentCase) {
        const currentImages = currentCase.details?.images || [];
        updateCaseDetail(caseId, 'images', [...currentImages, customUrlInput]);
        setCustomUrlInput('');
    }
  };

  const removeImage = (caseId: string, indexToRemove: number) => {
    const currentCase = localData.cases.find(c => c.id === caseId);
    if (currentCase) {
        const currentImages = currentCase.details?.images || [];
        const newImages = currentImages.filter((_, idx) => idx !== indexToRemove);
        updateCaseDetail(caseId, 'images', newImages);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">CMS Dashboard</h2>
            <p className="text-sm text-gray-500">Manage content & personalize experience</p>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button 
            onClick={() => setActiveTab('theme')}
            className={`flex-1 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === 'theme' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            <Palette size={18} /> Theme & Style
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === 'content' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            <Layout size={18} /> Content & Data
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-slate-900">
          {activeTab === 'theme' ? (
            <div className="space-y-8 max-w-2xl mx-auto">
              {/* Theme Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><Palette size={20} /> Brand Color</h3>
                <div className="flex flex-wrap gap-4">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setLocalTheme({...localTheme, primaryColor: color})}
                      className={`w-12 h-12 rounded-full border-2 transition ${localTheme.primaryColor === color ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <input 
                    type="color" 
                    value={localTheme.primaryColor}
                    onChange={(e) => setLocalTheme({...localTheme, primaryColor: e.target.value})}
                    className="w-12 h-12 rounded-full cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><Type size={20} /> Typography</h3>
                <div className="grid grid-cols-3 gap-4">
                  {fonts.map(font => (
                    <button
                      key={font}
                      onClick={() => setLocalTheme({...localTheme, fontPrimary: font as any})}
                      className={`p-4 border rounded-xl text-center transition ${localTheme.fontPrimary === font ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200'}`}
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><User size={20} /> Personalization</h3>
                <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Company Name</label>
                  <input 
                    type="text" 
                    value={localTheme.companyNameTarget || ''} 
                    onChange={(e) => setLocalTheme({...localTheme, companyNameTarget: e.target.value})}
                    placeholder="e.g. Google, Swiss Post"
                    className="w-full p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700"
                  />
                  <p className="text-xs text-gray-500">Displays a personalized greeting on the Hero section.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
               {/* Profile Section */}
               <section className="space-y-6">
                 <h3 className="text-xl font-bold pb-2 border-b">Profile Information</h3>
                 <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-sm font-medium">Name</label>
                     <input 
                        className="w-full p-2 border rounded" 
                        value={localData.profile.name} 
                        onChange={(e) => setLocalData({...localData, profile: { ...localData.profile, name: e.target.value }})}
                      />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-medium">Location</label>
                     <input 
                        className="w-full p-2 border rounded" 
                        value={localData.profile.location} 
                        onChange={(e) => setLocalData({...localData, profile: { ...localData.profile, location: e.target.value }})}
                      />
                   </div>
                   <div className="md:col-span-2 space-y-2">
                     <label className="text-sm font-medium">Tagline (EN)</label>
                     <input 
                        className="w-full p-2 border rounded" 
                        value={localData.profile.tagline.EN} 
                        onChange={(e) => setLocalData({...localData, profile: { ...localData.profile, tagline: { ...localData.profile.tagline, EN: e.target.value } }})}
                      />
                   </div>
                 </div>

                 <div className="space-y-3">
                   <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Social Links</label>
                      <button onClick={addSocial} className="text-sm text-blue-600 flex items-center gap-1"><Plus size={14}/> Add</button>
                   </div>
                   {localData.profile.socials.map((social, idx) => (
                     <div key={idx} className="flex gap-2 items-center">
                        <select 
                          className="p-2 border rounded w-32"
                          value={social.iconName}
                          onChange={(e) => updateSocial(idx, 'iconName', e.target.value)}
                        >
                          {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <input 
                          className="flex-1 p-2 border rounded"
                          value={social.platform}
                          onChange={(e) => updateSocial(idx, 'platform', e.target.value)}
                          placeholder="Platform Name"
                        />
                        <input 
                          className="flex-1 p-2 border rounded"
                          value={social.url}
                          onChange={(e) => updateSocial(idx, 'url', e.target.value)}
                          placeholder="URL"
                        />
                        <button onClick={() => removeSocial(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                     </div>
                   ))}
                 </div>
               </section>

               {/* Cases Section */}
               <section className="space-y-6">
                 <div className="flex justify-between items-center pb-2 border-b">
                    <h3 className="text-xl font-bold">Business Cases</h3>
                    <button onClick={handleAddCase} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      <Plus size={18} /> Add Case
                    </button>
                 </div>
                 
                 <div className="space-y-4">
                   {localData.cases.map(item => (
                     <div key={item.id} className="border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden">
                       <div 
                         className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 cursor-pointer"
                         onClick={() => setExpandedCaseId(expandedCaseId === item.id ? null : item.id)}
                       >
                         <div className="flex items-center gap-4">
                           <img src={item.image} className="w-12 h-12 rounded object-cover" alt="" />
                           <div>
                             <h4 className="font-bold">{item.title}</h4>
                             <p className="text-sm text-gray-500">{item.client}</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-3">
                           <button onClick={(e) => { e.stopPropagation(); /* Logic to remove case */ }} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18}/></button>
                           {expandedCaseId === item.id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                         </div>
                       </div>

                       {expandedCaseId === item.id && (
                         <div className="p-6 border-t border-gray-200 dark:border-slate-800 space-y-6 bg-white dark:bg-slate-900">
                            <div className="grid md:grid-cols-2 gap-4">
                               <div className="space-y-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                                  <input className="w-full p-2 border rounded" value={item.title} onChange={(e) => updateCase(item.id, { title: e.target.value })} />
                               </div>
                               <div className="space-y-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase">Client</label>
                                  <input className="w-full p-2 border rounded" value={item.client} onChange={(e) => updateCase(item.id, { client: e.target.value })} />
                               </div>
                               <div className="space-y-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase">Metric / Result</label>
                                  <input className="w-full p-2 border rounded" value={item.details?.resultMetric || ''} onChange={(e) => updateCaseDetail(item.id, 'resultMetric', e.target.value)} />
                               </div>
                               <div className="space-y-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase">Video URL</label>
                                  <input className="w-full p-2 border rounded" value={item.details?.videoUrl || ''} onChange={(e) => updateCaseDetail(item.id, 'videoUrl', e.target.value)} />
                               </div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Description (EN)</label>
                                <textarea className="w-full p-2 border rounded h-24" value={item.description.EN} onChange={(e) => updateCaseLocalized(item.id, 'description', 'EN', e.target.value)} />
                            </div>

                            <div className="space-y-3">
                                <h5 className="font-bold text-sm flex items-center gap-2"><ImageIcon size={16}/> Gallery Images</h5>
                                <div className="flex flex-wrap gap-3">
                                    {item.details?.images?.map((img, idx) => (
                                        <div key={idx} className="relative w-28 h-28 rounded-lg overflow-hidden group border border-gray-200 dark:border-gray-700 bg-gray-50">
                                            <img src={img} className="w-full h-full object-cover" alt="" />
                                            
                                            {/* Action Overlay */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1">
                                                <div className="flex justify-between">
                                                    <button 
                                                        onClick={() => setPrimaryImage(item.id, img)} 
                                                        className={`p-1.5 rounded hover:bg-white/20 transition ${item.image === img ? 'text-yellow-400' : 'text-white'}`}
                                                        title="Set as Primary"
                                                    >
                                                        <Star size={14} fill={item.image === img ? "currentColor" : "none"} />
                                                    </button>
                                                    <button 
                                                        onClick={() => removeImage(item.id, idx)} 
                                                        className="p-1.5 text-red-400 hover:bg-white/20 rounded transition"
                                                        title="Remove"
                                                    >
                                                        <X size={14}/>
                                                    </button>
                                                </div>
                                                
                                                <div className="flex justify-between">
                                                    <button 
                                                        onClick={() => moveImage(item.id, idx, 'left')} 
                                                        disabled={idx === 0}
                                                        className={`p-1 rounded hover:bg-white/20 text-white transition ${idx === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                                        title="Move Left"
                                                    >
                                                        <ChevronLeft size={14} />
                                                    </button>
                                                     <button 
                                                        onClick={() => moveImage(item.id, idx, 'right')} 
                                                        disabled={idx === (item.details?.images?.length || 0) - 1}
                                                        className={`p-1 rounded hover:bg-white/20 text-white transition ${idx === (item.details?.images?.length || 0) - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                                        title="Move Right"
                                                    >
                                                        <ChevronRight size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Primary Indicator Badge (visible when not hovering) */}
                                            {item.image === img && (
                                                <div className="absolute top-1 left-1 bg-yellow-400 text-white rounded-full p-0.5 shadow-sm group-hover:hidden">
                                                    <Star size={10} fill="currentColor" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    
                                    <label className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:text-blue-500 transition bg-gray-50 dark:bg-slate-800">
                                        {uploading ? <Loader2 className="animate-spin" size={24}/> : <Upload size={24}/>}
                                        <span className="text-xs mt-2 font-medium">Upload</span>
                                        <input type="file" className="hidden" multiple accept="image/*" onChange={(e) => handleImageUpload(item.id, e)} />
                                    </label>
                                </div>
                                <div className="flex gap-2">
                                   <input 
                                     placeholder="Or paste image URL" 
                                     className="flex-1 p-2 border rounded text-sm"
                                     value={customUrlInput}
                                     onChange={(e) => setCustomUrlInput(e.target.value)}
                                   />
                                   <button onClick={() => addCustomUrl(item.id)} className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">Add</button>
                                </div>
                            </div>
                         </div>
                       )}
                     </div>
                   ))}
                 </div>
               </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3 bg-gray-50 dark:bg-slate-800">
          <button onClick={onClose} className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-200 transition">
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="px-6 py-2 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2"
            style={{ backgroundColor: localTheme.primaryColor }}
          >
            <Save size={18} /> Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;