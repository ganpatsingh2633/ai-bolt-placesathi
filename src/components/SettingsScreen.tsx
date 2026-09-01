import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudentProfile } from '../types';

export const SettingsScreen: React.FC = () => {
  const { profile, updateProfile, addSkill, removeSkill } = useApp();

  const [formData, setFormData] = useState<StudentProfile>({ ...profile });
  const [skillInput, setSkillInput] = useState('');

  const handleInputChange = (field: keyof StudentProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (skillInput.trim()) {
        addSkill(skillInput.trim());
        setFormData(prev => ({
          ...prev,
          technicalSkills: [...prev.technicalSkills, skillInput.trim()]
        }));
        setSkillInput('');
      }
    }
  };

  const handleRemoveSkill = (skill: string) => {
    removeSkill(skill);
    setFormData(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn pb-16">
      {/* Header Profile Overview */}
      <div className="bento-card flex flex-col sm:flex-row items-center sm:items-center gap-6">
        <div className="relative">
          <img
            src={formData.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDcsmArWW-LxdFSX95H20B-0Lg6GEgLjnTWjygnzwOpSPdzbaMaskVkk10NSxTWG4CumwC5ltUJSC2zGPHwqFPNGU896olkQVcjtBRgDfdH4PCnrsR6r8pnirtmtYQK8eBVTUCSZBNlqHO_3vOFcrcmsCrPX3barI58lufyown7DyWTKP6I7goQf1daJwj9L_LyQ_c4WqGMbsx4HXjFqUaC8cTmzaa6B2uhg60mJh90TxiHPMkYFBMl"}
            alt="Profile Picture"
            className="w-20 h-20 md:w-24 md:h-24 rounded-[16px] object-cover border-2 border-[#7c3aed40] shadow-md shrink-0"
          />
          <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#10b981] rounded-full border-2 border-white dark:border-[#111111] flex items-center justify-center text-white text-[11px] font-bold" title="Active Student">
            ✓
          </span>
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {formData.fullName}
            </h1>
            <span className="inline-block px-3 py-1 bg-[#10b98120] text-[#10b981] border border-[#10b98130] rounded-full text-xs font-semibold self-center sm:self-auto">
              Placement Verified
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs md:text-sm text-zinc-500 dark:text-[#a1a1aa] mt-2">
            <span className="flex items-center gap-1.5 bg-zinc-100 dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#222222] px-2.5 py-1 rounded-[8px]">
              <span className="material-symbols-outlined text-[16px] text-[#7c3aed] dark:text-[#a78bfa]">badge</span>
              ID: {formData.collegeId}
            </span>
            <span className="flex items-center gap-1.5 bg-zinc-100 dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#222222] px-2.5 py-1 rounded-[8px]">
              <span className="material-symbols-outlined text-[16px] text-[#7c3aed] dark:text-[#a78bfa]">school</span>
              {formData.branch}
            </span>
          </div>
        </div>
      </div>

      {/* Forms Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        {/* Left Column (Personal & Academic) */}
        <div className="col-span-1 md:col-span-8 flex flex-col gap-4 md:gap-5">
          {/* Personal Info Card */}
          <div className="bento-card">
            <h2 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white mb-4 pb-3 border-b border-[#e4e4e7] dark:border-[#222222] flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#7c3aed] dark:text-[#a78bfa]">person</span>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm text-zinc-900 dark:text-gray-200 bg-zinc-100 dark:bg-[#18181b] focus:border-[#7c3aed] outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  College ID
                </label>
                <input
                  type="text"
                  value={formData.collegeId}
                  disabled
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm bg-zinc-200 dark:bg-[#141414] text-zinc-400 dark:text-zinc-600 cursor-not-allowed outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Graduation Year
                </label>
                <select
                  value={formData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm text-zinc-900 dark:text-gray-200 bg-zinc-100 dark:bg-[#18181b] focus:border-[#7c3aed] outline-none cursor-pointer"
                >
                  <option value="2023" className="bg-white dark:bg-[#18181b]">2023</option>
                  <option value="2024" className="bg-white dark:bg-[#18181b]">2024</option>
                  <option value="2025" className="bg-white dark:bg-[#18181b]">2025</option>
                  <option value="2026" className="bg-white dark:bg-[#18181b]">2026</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm text-zinc-900 dark:text-gray-200 bg-zinc-100 dark:bg-[#18181b] focus:border-[#7c3aed] outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Academic Details Card */}
          <div className="bento-card">
            <h2 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white mb-4 pb-3 border-b border-[#e4e4e7] dark:border-[#222222] flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#7c3aed] dark:text-[#a78bfa]">school</span>
              Academic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Branch / Major
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => handleInputChange('branch', e.target.value)}
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm text-zinc-900 dark:text-gray-200 bg-zinc-100 dark:bg-[#18181b] focus:border-[#7c3aed] outline-none cursor-pointer"
                >
                  <option value="Computer Science & Engineering" className="bg-white dark:bg-[#18181b]">Computer Science &amp; Engineering</option>
                  <option value="Information Technology" className="bg-white dark:bg-[#18181b]">Information Technology</option>
                  <option value="Electronics & Communication" className="bg-white dark:bg-[#18181b]">Electronics &amp; Communication</option>
                  <option value="Data Science & AI" className="bg-white dark:bg-[#18181b]">Data Science &amp; AI</option>
                  <option value="Mechanical Engineering" className="bg-white dark:bg-[#18181b]">Mechanical Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Target Tier
                </label>
                <select
                  value={formData.targetTier}
                  onChange={(e) => handleInputChange('targetTier', e.target.value)}
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm text-zinc-900 dark:text-gray-200 bg-zinc-100 dark:bg-[#18181b] focus:border-[#7c3aed] outline-none cursor-pointer"
                >
                  <option value="Product Based" className="bg-white dark:bg-[#18181b]">Product Based (Day 1 / High CTC)</option>
                  <option value="FinTech" className="bg-white dark:bg-[#18181b]">FinTech &amp; Quantitative</option>
                  <option value="Service Based" className="bg-white dark:bg-[#18181b]">Service Based / IT Services</option>
                  <option value="Core Engineering" className="bg-white dark:bg-[#18181b]">Core Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Current CGPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={(e) => handleInputChange('cgpa', parseFloat(e.target.value) || 0)}
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm text-zinc-900 dark:text-gray-200 bg-zinc-100 dark:bg-[#18181b] focus:border-[#7c3aed] outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Skills & Professional) */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-4 md:gap-5">
          {/* Skills Card */}
          <div className="bento-card">
            <h2 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white mb-4 pb-3 border-b border-[#e4e4e7] dark:border-[#222222] flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#7c3aed] dark:text-[#a78bfa]">code</span>
              Technical Skills
            </h2>
            <div className="mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Add a skill + Enter"
                className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-xs md:text-sm text-zinc-900 dark:text-gray-200 bg-zinc-100 dark:bg-[#18181b] focus:border-[#7c3aed] outline-none transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technicalSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-zinc-200 text-xs px-3 py-1 rounded-[8px] border border-[#e4e4e7] dark:border-[#222222] font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-500 transition-colors p-0.5 rounded-full cursor-pointer"
                    title={`Remove ${skill}`}
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Professional Card */}
          <div className="bento-card">
            <h2 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white mb-4 pb-3 border-b border-[#e4e4e7] dark:border-[#222222] flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#7c3aed] dark:text-[#a78bfa]">link</span>
              Professional Links
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Resume Link (Drive/Portfolio)
                </label>
                <input
                  type="url"
                  value={formData.resumeLink}
                  onChange={(e) => handleInputChange('resumeLink', e.target.value)}
                  placeholder="https://..."
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-xs md:text-sm text-zinc-900 dark:text-gray-200 bg-zinc-100 dark:bg-[#18181b] focus:border-[#7c3aed] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={formData.linkedInProfile}
                  onChange={(e) => handleInputChange('linkedInProfile', e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-xs md:text-sm text-zinc-900 dark:text-gray-200 bg-zinc-100 dark:bg-[#18181b] focus:border-[#7c3aed] outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Action */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm md:text-base px-8 py-3 rounded-[12px] active:scale-95 transition-all shadow-[0_0_15px_#7c3aed40] flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">save</span>
          Save Changes
        </button>
      </div>
    </form>
  );
};
