import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CompanyApplication } from '../types';

export const ApplicationsScreen: React.FC = () => {
  const { applications, showToast } = useApp();
  const [apps, setApps] = useState<CompanyApplication[]>(applications);
  const [stageFilter, setStageFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New application form
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('Software Engineer');
  const [newCTC, setNewCTC] = useState('₹32 LPA');
  const [newStage, setNewStage] = useState<CompanyApplication['stage']>('Applied');

  const filteredApps = stageFilter === 'All'
    ? apps
    : apps.filter(a => a.stage === stageFilter);

  const stages: Array<CompanyApplication['stage']> = [
    'Applied',
    'OA Round',
    'Technical Round',
    'HR Round',
    'Selected',
    'Rejected'
  ];

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim()) return;

    const newApp: CompanyApplication = {
      id: 'app-' + Date.now(),
      companyName: newCompany,
      logo: `https://${newCompany.toLowerCase().replace(/\s+/g, '')}.com/favicon.ico`,
      role: newRole,
      stage: newStage,
      appliedDate: 'Today',
      ctc: newCTC,
      location: 'Bangalore / Hybrid',
      tier: 'Product Based'
    };

    setApps(prev => [newApp, ...prev]);
    setIsAddModalOpen(false);
    setNewCompany('');
    showToast('Application Added', `Tracked application for ${newCompany}.`, 'success');
  };

  const handleUpdateStage = (id: string, stage: CompanyApplication['stage']) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, stage } : a));
    showToast('Stage Updated', `Updated status to ${stage}.`, 'info');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Campus Applications
          </h1>
          <p className="text-sm md:text-base text-zinc-500 dark:text-[#a1a1aa] mt-1">
            Track your recruitment drive rounds, test links, and offer letters in one unified board.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-[12px] text-sm font-semibold active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_15px_#7c3aed40] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_business</span>
          Track New Company
        </button>
      </div>

      {/* Stage Filters Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setStageFilter('All')}
          className={`px-4 py-1.5 rounded-[10px] text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            stageFilter === 'All'
              ? 'bg-[#7c3aed] text-white shadow-[0_0_12px_#7c3aed40]'
              : 'bento-card py-1.5 px-4 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          All Applications ({apps.length})
        </button>
        {stages.map(st => {
          const count = apps.filter(a => a.stage === st).length;
          return (
            <button
              key={st}
              onClick={() => setStageFilter(st)}
              className={`px-3.5 py-1.5 rounded-[10px] text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                stageFilter === st
                  ? 'bg-[#7c3aed] text-white shadow-[0_0_12px_#7c3aed40]'
                  : 'bento-card py-1.5 px-3.5 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {/* Applications Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="bento-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[10px] bg-zinc-100 dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#222222] flex items-center justify-center font-bold text-zinc-900 dark:text-white text-base">
                    {app.companyName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                      {app.companyName}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-[#a1a1aa]">
                      {app.role}
                    </p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                  app.stage === 'Selected'
                    ? 'bg-[#10b98120] text-[#10b981] border border-[#10b98130]'
                    : app.stage === 'Rejected'
                    ? 'bg-[#ef444420] text-[#ef4444] border border-[#ef444430]'
                    : 'bg-[#7c3aed20] text-[#7c3aed] dark:text-[#a78bfa] border border-[#7c3aed30]'
                }`}>
                  {app.stage}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-300 my-3 bg-zinc-50 dark:bg-[#161616] p-3 rounded-[10px] border border-[#e4e4e7] dark:border-[#222222]">
                <div>
                  <span className="text-zinc-400 block text-[11px]">Package / CTC</span>
                  <strong className="text-zinc-900 dark:text-white">{app.ctc}</strong>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px]">Location</span>
                  <strong className="text-zinc-900 dark:text-white">{app.location}</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#e4e4e7] dark:border-[#222222] flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">Applied: {app.appliedDate}</span>
              
              <div className="relative">
                <select
                  value={app.stage}
                  onChange={(e) => handleUpdateStage(app.id, e.target.value as CompanyApplication['stage'])}
                  className="text-xs font-semibold bg-zinc-100 dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#222222] rounded-[8px] px-2.5 py-1 text-zinc-900 dark:text-gray-200 outline-none cursor-pointer"
                >
                  {stages.map(s => (
                    <option key={s} value={s} className="bg-white dark:bg-[#18181b]">{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bento-card max-w-md w-full p-6 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center pb-3 border-b border-[#e4e4e7] dark:border-[#222222] mb-4">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Track Company Application</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Company Name</label>
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Uber, Adobe, Oracle"
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Role</label>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Package (CTC)</label>
                  <input
                    type="text"
                    value={newCTC}
                    onChange={(e) => setNewCTC(e.target.value)}
                    className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Current Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as any)}
                    className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
                  >
                    {stages.map(st => (
                      <option key={st} value={st} className="bg-white dark:bg-[#18181b]">{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] text-xs font-semibold text-zinc-600 dark:text-zinc-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-[10px] text-xs font-semibold shadow-[0_0_12px_#7c3aed40] cursor-pointer"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
