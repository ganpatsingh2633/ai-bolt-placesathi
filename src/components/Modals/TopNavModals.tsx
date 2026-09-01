import React from 'react';
import { useApp } from '../../context/AppContext';

export const TopNavModals: React.FC = () => {
  const {
    isResourcesModalOpen,
    setIsResourcesModalOpen,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    isCompaniesModalOpen,
    setIsCompaniesModalOpen,
    isNotificationsModalOpen,
    setIsNotificationsModalOpen,
    notifications,
    markNotificationAsRead,
    openSolveProblemModal,
    problems,
    openAptitudeQuiz
  } = useApp();

  return (
    <>
      {/* 1. Resources Modal */}
      {isResourcesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bento-card max-w-2xl w-full p-6 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center pb-3 border-b border-[#e4e4e7] dark:border-[#222222] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7c3aed] dark:text-[#a78bfa]">menu_book</span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Placement Preparation Resources</h3>
              </div>
              <button onClick={() => setIsResourcesModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <div className="p-4 bg-zinc-50 dark:bg-[#161616] border border-[#e4e4e7] dark:border-[#222222] rounded-[12px] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">SDE Sheet - Top 150 Interview Questions</h4>
                  <p className="text-xs text-zinc-500 dark:text-[#a1a1aa] mt-0.5">Striver / NeetCode curated track mapped to product interviews.</p>
                </div>
                <button
                  onClick={() => {
                    setIsResourcesModalOpen(false);
                    openSolveProblemModal(problems[0]);
                  }}
                  className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-[8px] text-xs font-semibold shadow-[0_0_10px_#7c3aed40] cursor-pointer"
                >
                  Start Practice
                </button>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-[#161616] border border-[#e4e4e7] dark:border-[#222222] rounded-[12px] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">RS Aggarwal Quantitative Cheatsheet</h4>
                  <p className="text-xs text-zinc-500 dark:text-[#a1a1aa] mt-0.5">Formulas for Speed, Distance, Permutations &amp; Combinations, Work &amp; Time.</p>
                </div>
                <button
                  onClick={() => {
                    setIsResourcesModalOpen(false);
                    openAptitudeQuiz();
                  }}
                  className="px-3.5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-[8px] text-xs font-semibold shadow-[0_0_10px_#10b98140] cursor-pointer"
                >
                  Test Formulas
                </button>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-[#161616] border border-[#e4e4e7] dark:border-[#222222] rounded-[12px] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">System Design Primer (HLD / LLD)</h4>
                  <p className="text-xs text-zinc-500 dark:text-[#a1a1aa] mt-0.5">Caching, Load Balancers, Sharding, Database Consistency Models.</p>
                </div>
                <span className="text-xs font-semibold text-[#7c3aed] dark:text-[#a78bfa] bg-[#7c3aed20] border border-[#7c3aed30] px-2.5 py-1 rounded-full">
                  PDF Guide
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bento-card max-w-2xl w-full p-6 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center pb-3 border-b border-[#e4e4e7] dark:border-[#222222] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7c3aed] dark:text-[#a78bfa]">calendar_month</span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Campus Placement Schedule 2024</h3>
              </div>
              <button onClick={() => setIsScheduleModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-zinc-50 dark:bg-[#161616] border border-[#e4e4e7] dark:border-[#222222] rounded-[12px] flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-[#10b981] uppercase">Tomorrow, 10:00 AM</span>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white mt-0.5">Google Software Engineering Online Assessment</h4>
                  <p className="text-xs text-zinc-500 dark:text-[#a1a1aa]">2 Coding Questions • 90 Minutes Proctoring Window</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#10b98120] text-[#10b981] border border-[#10b98130]">
                  Confirmed
                </span>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-[#161616] border border-[#e4e4e7] dark:border-[#222222] rounded-[12px] flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-[#7c3aed] dark:text-[#a78bfa] uppercase">Oct 30, 2:00 PM</span>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white mt-0.5">Microsoft SDE Technical Interview Round 1</h4>
                  <p className="text-xs text-zinc-500 dark:text-[#a1a1aa]">Teams Video Call with Senior Principal Engineer</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#7c3aed20] text-[#7c3aed] dark:text-[#a78bfa] border border-[#7c3aed30]">
                  Scheduled
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Companies Modal */}
      {isCompaniesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bento-card max-w-2xl w-full p-6 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center pb-3 border-b border-[#e4e4e7] dark:border-[#222222] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7c3aed] dark:text-[#a78bfa]">business</span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Visiting Campus Recruiters</h3>
              </div>
              <button onClick={() => setIsCompaniesModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
              {[
                { name: 'Google', ctc: '₹44.5 LPA', role: 'Software Engineer', cutoff: '8.00 CGPA' },
                { name: 'Microsoft', ctc: '₹51.0 LPA', role: 'SDE Core', cutoff: '7.50 CGPA' },
                { name: 'Amazon', ctc: '₹45.0 LPA', role: 'SDE I (AWS)', cutoff: '7.00 CGPA' },
                { name: 'Goldman Sachs', ctc: '₹34.0 LPA', role: 'Quantitative Analyst', cutoff: '7.80 CGPA' },
                { name: 'Adobe', ctc: '₹41.0 LPA', role: 'Member of Tech Staff', cutoff: '7.50 CGPA' },
                { name: 'Oracle', ctc: '₹22.0 LPA', role: 'Cloud Engineer', cutoff: '7.00 CGPA' },
              ].map((comp, idx) => (
                <div key={idx} className="p-4 bg-zinc-50 dark:bg-[#161616] border border-[#e4e4e7] dark:border-[#222222] rounded-[12px] flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{comp.name}</h4>
                      <span className="text-xs font-bold text-[#10b981]">{comp.ctc}</span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-[#a1a1aa]">{comp.role}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#e4e4e7] dark:border-[#222222] text-[11px] text-zinc-400 flex justify-between">
                    <span>Cutoff: {comp.cutoff}</span>
                    <span className="text-[#10b981] font-semibold">Eligible</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Notifications Modal */}
      {isNotificationsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bento-card max-w-md w-full p-6 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center pb-3 border-b border-[#e4e4e7] dark:border-[#222222] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7c3aed] dark:text-[#a78bfa]">notifications</span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Notifications</h3>
              </div>
              <button onClick={() => setIsNotificationsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`p-3.5 rounded-[12px] border transition-all cursor-pointer ${
                    notif.read
                      ? 'border-[#e4e4e7] dark:border-[#222222] bg-zinc-50 dark:bg-[#161616] text-zinc-500 dark:text-[#a1a1aa]'
                      : 'border-[#7c3aed40] bg-[#7c3aed15] dark:bg-[#7c3aed20] text-zinc-900 dark:text-white shadow-[0_0_10px_#7c3aed15]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-xs md:text-sm">{notif.title}</h4>
                    <span className="text-[10px] text-zinc-400 shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-[#a1a1aa] mt-1">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
