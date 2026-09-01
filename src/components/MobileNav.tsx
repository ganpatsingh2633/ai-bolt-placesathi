import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const items: Array<{ id: TabType; label: string; icon: string }> = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'dsa', label: 'DSA', icon: 'code' },
    { id: 'aptitude', label: 'Aptitude', icon: 'psychology' },
    { id: 'interviews', label: 'Mocks', icon: 'video_chat' },
    { id: 'applications', label: 'Apps', icon: 'work_history' },
    { id: 'settings', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#ffffff]/90 dark:bg-[#050505]/90 backdrop-blur-md border-t border-[#e4e4e7] dark:border-[#222222] flex justify-around items-center h-16 z-50 px-2 pb-safe">
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all cursor-pointer ${
              isActive ? 'text-[#7c3aed] dark:text-[#a78bfa]' : 'text-zinc-500 dark:text-[#a1a1aa] hover:text-[#7c3aed]'
            }`}
          >
            <div className={`px-3 py-1 rounded-[10px] mb-0.5 transition-colors ${
              isActive ? 'bg-[#7c3aed20]' : ''
            }`}>
              <span className={`material-symbols-outlined text-[20px] ${
                isActive ? 'filled text-[#7c3aed] dark:text-[#a78bfa]' : ''
              }`}>
                {item.icon}
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
