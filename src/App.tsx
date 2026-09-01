import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';

// Screens
import { DashboardScreen } from './components/DashboardScreen';
import { DSAPracticeScreen } from './components/DSAPracticeScreen';
import { AptitudeScreen } from './components/AptitudeScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { MockInterviewsScreen } from './components/MockInterviewsScreen';
import { ApplicationsScreen } from './components/ApplicationsScreen';
import { SupportScreen } from './components/SupportScreen';

// Modals
import { SolveProblemModal } from './components/Modals/SolveProblemModal';
import { LogSolveModal } from './components/Modals/LogSolveModal';
import { AptitudeQuizModal } from './components/Modals/AptitudeQuizModal';
import { AptitudeReviewModal } from './components/Modals/AptitudeReviewModal';
import { CheckStatusModal } from './components/Modals/CheckStatusModal';
import { TopNavModals } from './components/Modals/TopNavModals';

const MainLayout: React.FC = () => {
  const { activeTab, toast } = useApp();

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-[#18181b] dark:text-[#ffffff] flex flex-col font-sans transition-colors duration-200 selection:bg-[#7c3aed33] selection:text-[#a78bfa]">
      {/* Fixed Sidebar for Desktop */}
      <Sidebar />

      {/* Main Content Layout Container */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        {/* Top Navbar */}
        <TopNav />

        {/* Main Content Area */}
        <main className="flex-1 pt-20 pb-20 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <DashboardScreen />}
          {activeTab === 'dsa' && <DSAPracticeScreen />}
          {activeTab === 'aptitude' && <AptitudeScreen />}
          {activeTab === 'interviews' && <MockInterviewsScreen />}
          {activeTab === 'applications' && <ApplicationsScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
          {activeTab === 'support' && <SupportScreen />}
        </main>
      </div>

      {/* Mobile Navigation bar */}
      <MobileNav />

      {/* Interactive Modals */}
      <SolveProblemModal />
      <LogSolveModal />
      <AptitudeQuizModal />
      <AptitudeReviewModal />
      <CheckStatusModal />
      <TopNavModals />

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 animate-slideUp">
          <div className={`p-4 rounded-[16px] border shadow-2xl flex items-start gap-3 max-w-sm ${
            toast.type === 'success'
              ? 'bg-[#064e3b] dark:bg-[#064e3b] border-[#10b981] text-[#d1fae5]'
              : toast.type === 'error'
              ? 'bg-[#450a0a] dark:bg-[#450a0a] border-[#ef4444] text-[#fee2e2]'
              : 'bg-[#ffffff] dark:bg-[#111111] border-[#e4e4e7] dark:border-[#222222] text-[#18181b] dark:text-white'
          }`}>
            <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">
              {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
            </span>
            <div>
              <h4 className="font-bold text-xs md:text-sm">{toast.title}</h4>
              <p className="text-xs opacity-90 mt-0.5">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
