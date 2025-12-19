
import React, { useState } from 'react';
import { Upload, Sparkles, Loader2, LogOut } from 'lucide-react';
import { createProject } from './services/projectService';
import { generateProjectDescription } from './services/geminiService';
import { isBackendConfigured } from './services/apiConfig';
import { signOut, User } from './services/authService';

interface AdminPanelProps {
  user: User;
  onSignOut: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ user, onSignOut }) => {
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    year: new Date().getFullYear().toString(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAiGenerate = async () => {
    if (!formData.title || !formData.category) {
      alert("Please enter a Title and Category first.");
      return;
    }
    setAiLoading(true);
    const description = await generateProjectDescription(formData.title, formData.category);
    setFormData(prev => ({ ...prev, description }));
    setAiLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    onSignOut();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category) return;
    
    setLoading(true);
    const success = await createProject(formData, file || undefined);
    
    if (success) {
      alert("Project created successfully!");
      setFormData({ title: '', category: '', description: '', year: new Date().getFullYear().toString() });
      setFile(null);
    } else {
      alert("Failed to create project.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-8 bg-white border border-gray-200 shadow-xl relative">
      <div className="flex justify-between items-start mb-8 border-b border-black pb-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight uppercase text-ink">RDS Studio</h2>
          <p className="text-xs font-mono text-gray-500 mt-1">
            USER: <span className="text-swiss-red">{user.email}</span>
            {!isBackendConfigured && " (MOCK MODE - NO AWS BACKEND DETECTED)"}
          </p>
        </div>
        <button 
          onClick={handleSignOut}
          className="text-xs font-bold uppercase tracking-widest hover:text-swiss-red transition-colors flex items-center gap-2"
        >
          Logout <LogOut size={14} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full bg-gray-50 border-b border-gray-300 p-3 focus:outline-none focus:border-swiss-red transition-colors"
            placeholder="e.g. Modernist Typography"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border-b border-gray-300 p-3 focus:outline-none focus:border-swiss-red"
              required
            >
              <option value="">Select...</option>
              <option value="Typography">Typography</option>
              <option value="Branding">Branding</option>
              <option value="Photography">Photography</option>
              <option value="Interface">Interface</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border-b border-gray-300 p-3 focus:outline-none focus:border-swiss-red"
            />
          </div>
        </div>

        <div className="relative">
          <div className="flex justify-between items-end mb-2">
            <label className="block text-xs font-bold uppercase tracking-widest">Description</label>
            <button
              type="button"
              onClick={handleAiGenerate}
              disabled={aiLoading}
              className="text-xs font-bold flex items-center gap-1 text-swiss-red hover:text-black transition-colors"
            >
              {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              GENERATE WITH GEMINI
            </button>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
            className="w-full bg-gray-50 border-b border-gray-300 p-3 focus:outline-none focus:border-swiss-red"
            placeholder="Project description..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2">Project Image</label>
          <div className="relative border-2 border-dashed border-gray-300 hover:border-swiss-red transition-colors bg-gray-50 p-8 text-center cursor-pointer">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
            />
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Upload size={24} className="mb-2" />
              <span className="text-xs font-mono">{file ? file.name : "Upload to RDS Storage"}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-swiss-red transition-colors flex items-center justify-center gap-2"
        >
          {loading ? 'Processing...' : 'Sync to Database'}
        </button>
      </form>
    </div>
  );
};
