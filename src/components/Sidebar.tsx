import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, openSolveProblemModal, problems, openAptitudeQuiz } = useApp();

  const navItems: Array<{ id: TabType; label: string; icon: string }> = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'dsa', label: 'DSA Practice', icon: 'code' },
    { id: 'aptitude', label: 'Aptitude', icon: 'psychology' },
    { id: 'interviews', label: 'Mock Interviews', icon: 'video_chat' },
    { id: 'applications', label: 'Applications', icon: 'work_history' },
  ];

  const handleQuickPractice = () => {
    const unsolved = problems.find(p => p.status === 'Unsolved') || problems[0];
    if (unsolved) {
      openSolveProblemModal(unsolved);
    } else {
      openAptitudeQuiz();
    }
  };

  return (
    <aside className="bg-[#ffffff] dark:bg-[#09090b] h-screen w-64 fixed left-0 top-0 border-r border-[#e4e4e7] dark:border-[#222222] flex flex-col p-4 z-40 hidden md:flex transition-colors">
      {/* Brand Header */}
      <div 
        onClick={() => setActiveTab('settings')}
        className="flex items-center gap-3 mb-6 px-2 mt-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-[#18181b] p-2.5 rounded-[16px] border border-transparent hover:border-[#e4e4e7] dark:hover:border-[#27272a] transition-all"
        title="View Student Profile"
      >
        <div className="w-10 h-10 rounded-xl bg-[#7c3aed] flex items-center justify-center font-bold text-white shadow-[0_0_12px_#7c3aed40] shrink-0">
          <span className="material-symbols-outlined text-[22px]">school</span>
        </div>
        <div className="overflow-hidden">
          <h1 className="text-[17px] font-bold text-zinc-900 dark:text-white tracking-tight truncate">
            place- sathi
          </h1>
          <p className="text-[11px] uppercase tracking-[1px] font-semibold text-zinc-500 dark:text-[#a1a1aa] truncate">
            Student Portal
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto pr-1">
        <div className="text-[10px] uppercase tracking-[1.5px] font-bold text-zinc-400 dark:text-zinc-500 px-3 py-1 mb-1">
          Menu
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-sm font-medium transition-all duration-200 cursor-pointer active:scale-98 text-left ${
                isActive
                  ? 'bg-[#7c3aed] text-white font-semibold shadow-[0_0_15px_#7c3aed33]'
                  : 'text-zinc-600 dark:text-[#a1a1aa] hover:bg-zinc-100 dark:hover:bg-[#18181b] hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <span 
                className={`material-symbols-outlined text-[20px] ${isActive ? 'filled text-white' : 'text-zinc-400 dark:text-zinc-500'}`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* CTA & Footer */}
      <div className="mt-auto flex flex-col gap-3 pt-3">
        <button
          onClick={handleQuickPractice}
          className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-2.5 rounded-[14px] text-sm font-semibold transition-all shadow-[0_0_15px_#7c3aed40] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">bolt</span>
          Practice Now
        </button>

        <div className="pt-3 border-t border-[#e4e4e7] dark:border-[#222222] flex flex-col gap-1">
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-3 py-2 rounded-[12px] text-sm font-medium transition-all duration-200 cursor-pointer active:scale-98 text-left ${
              activeTab === 'settings'
                ? 'bg-zinc-100 dark:bg-[#18181b] text-[#7c3aed] dark:text-white font-semibold'
                : 'text-zinc-600 dark:text-[#a1a1aa] hover:bg-zinc-100 dark:hover:bg-[#18181b] hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined text-[18px] ${activeTab === 'settings' ? 'filled' : ''}`}>
              settings
            </span>
            <span>Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`flex items-center gap-3 px-3 py-2 rounded-[12px] text-sm font-medium transition-all duration-200 cursor-pointer active:scale-98 text-left ${
              activeTab === 'support'
                ? 'bg-zinc-100 dark:bg-[#18181b] text-[#7c3aed] dark:text-white font-semibold'
                : 'text-zinc-600 dark:text-[#a1a1aa] hover:bg-zinc-100 dark:hover:bg-[#18181b] hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            <span>Support</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
