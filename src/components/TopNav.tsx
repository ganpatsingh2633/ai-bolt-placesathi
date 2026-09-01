import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const TopNav: React.FC = () => {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    searchQuery, 
    setSearchQuery, 
    setActiveTab, 
    setIsCheckStatusOpen,
    setIsResourcesOpen,
    setIsScheduleOpen,
    setIsCompaniesOpen,
    setIsNotificationsOpen,
    profile
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 z-30 bg-[#ffffff]/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-[#e4e4e7] dark:border-[#222222] flex justify-between items-center h-16 px-4 md:px-8 transition-colors">
      {/* Brand / Left Title */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className="text-left group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-[#7c3aed] transition-colors">
              place- sathi
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 ml-4">
          <button 
            onClick={() => setIsResourcesOpen(true)}
            className="text-sm font-medium text-zinc-600 dark:text-[#a1a1aa] hover:text-[#7c3aed] dark:hover:text-white transition-colors cursor-pointer"
          >
            Resources
          </button>
          <button 
            onClick={() => setIsScheduleOpen(true)}
            className="text-sm font-medium text-zinc-600 dark:text-[#a1a1aa] hover:text-[#7c3aed] dark:hover:text-white transition-colors cursor-pointer"
          >
            Schedule
          </button>
          <button 
            onClick={() => setIsCompaniesOpen(true)}
            className="text-sm font-medium text-zinc-600 dark:text-[#a1a1aa] hover:text-[#7c3aed] dark:hover:text-white transition-colors cursor-pointer"
          >
            Companies
          </button>
        </nav>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-2 md:gap-3.5">
        {/* Search */}
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search resources..."
            className={`pl-9 pr-4 py-1.5 bg-zinc-100 dark:bg-[#111111] border ${
              isSearchFocused ? 'border-[#7c3aed] ring-1 ring-[#7c3aed]' : 'border-[#e4e4e7] dark:border-[#222222]'
            } rounded-[12px] text-xs md:text-sm text-zinc-900 dark:text-gray-200 focus:outline-none w-36 md:w-56 transition-all`}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>

        {/* Check Status CTA Button */}
        <button
          onClick={() => setIsCheckStatusOpen(true)}
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-xs md:text-sm px-3.5 md:px-4 py-2 rounded-[12px] shadow-[0_0_12px_#7c3aed33] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Check Status</span>
        </button>

        {/* Notifications */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer p-2 rounded-[12px] hover:bg-zinc-100 dark:hover:bg-[#18181b] border border-transparent hover:border-[#e4e4e7] dark:hover:border-[#222222] relative"
          title="Notifications"
          aria-label="View notifications"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef4444] rounded-full ring-2 ring-white dark:ring-[#050505]"></span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer p-2 rounded-[12px] hover:bg-zinc-100 dark:hover:bg-[#18181b] border border-transparent hover:border-[#e4e4e7] dark:hover:border-[#222222]"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle dark mode"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* User Avatar */}
        <button
          onClick={() => setActiveTab('settings')}
          className="w-8 h-8 rounded-full overflow-hidden border border-[#e4e4e7] dark:border-[#222222] ml-1 cursor-pointer hover:ring-2 hover:ring-[#7c3aed] transition-all shrink-0"
          title="Alex Carter Profile"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwb7Xqr6IWUXoam5e8eV55LvyNMDPyIZlKaDSSU4Ky6XxksZk3T8ieUEJpe8j7kCKKItbHuRQsVconlXwdk8RkqmwIbWLkvjO6pyjUzCO_4hcTZw4KDCexFItCDUVhzim51afbl98X9DHpqhuow5tvacCm7xtM2VEJACz2QVb7U2d3vUqPp3ULV9MW1DDx6j-4SG0aupm0oFpeWmN_pT7gzModRkv7NHlowLBVISlv_ySHYwie7VyG"
            alt={profile.fullName}
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};
