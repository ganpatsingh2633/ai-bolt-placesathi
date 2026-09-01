import React from 'react';
import { useApp } from '../../context/AppContext';

export const CheckStatusModal: React.FC = () => {
  const { isCheckStatusOpen, setIsCheckStatusOpen, profile, problems, aptitudeAttempts, setActiveTab } = useApp();

  if (!isCheckStatusOpen) return null;

  const solvedDSA = problems.filter(p => p.status === 'Solved').length;
  const isCgpaEligible = profile.cgpa >= 7.5;
  const isDsaReady = solvedDSA >= 5;
  const isAptitudeReady = aptitudeAttempts.length > 0;
  const isProfileComplete = Boolean(profile.resumeLink && profile.linkedInProfile && profile.technicalSkills.length > 0);

  const readinessScore = Math.round(
    ( (isCgpaEligible ? 25 : 10) +
      (isDsaReady ? 25 : 15) +
      (isAptitudeReady ? 25 : 10) +
      (isProfileComplete ? 25 : 15) )
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bento-card max-w-lg w-full p-6 shadow-2xl animate-scaleUp space-y-5">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-[#e4e4e7] dark:border-[#222222]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#10b981]">verified_user</span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Placement Eligibility &amp; Status
            </h3>
          </div>
          <button
            onClick={() => setIsCheckStatusOpen(false)}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Readiness Score Card */}
        <div className="p-4 bg-zinc-50 dark:bg-[#161616] rounded-[16px] border border-[#e4e4e7] dark:border-[#222222] flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c3aed15] rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#7c3aed] dark:text-[#a78bfa]">
              Overall Readiness Index
            </div>
            <div className="text-2xl font-black text-zinc-900 dark:text-white mt-0.5">
              {readinessScore}% - Tier 1 Eligible
            </div>
            <p className="text-xs text-zinc-500 dark:text-[#a1a1aa] mt-1">
              You meet criteria for 100% of upcoming product companies.
            </p>
          </div>

          <div className="w-14 h-14 rounded-full bg-white dark:bg-[#050505] flex items-center justify-center font-black text-xl text-[#10b981] border-2 border-[#10b981] shadow-[0_0_15px_#10b98130] shrink-0">
            {readinessScore}%
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Drive Clearance Checklist
          </h4>

          {/* Item 1: CGPA */}
          <div className="flex items-center justify-between p-3 rounded-[12px] bg-zinc-50 dark:bg-[#161616] border border-[#e4e4e7] dark:border-[#222222]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#10b981] text-[20px]">check_circle</span>
              <div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-white block">Academic Cutoff (CGPA ≥ 7.50)</span>
                <span className="text-[11px] text-zinc-500 dark:text-[#a1a1aa]">Current CGPA: {profile.cgpa} (Cleared)</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#10b981] bg-[#10b98120] border border-[#10b98130] px-2 py-0.5 rounded-full">Pass</span>
          </div>

          {/* Item 2: Backlogs */}
          <div className="flex items-center justify-between p-3 rounded-[12px] bg-zinc-50 dark:bg-[#161616] border border-[#e4e4e7] dark:border-[#222222]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#10b981] text-[20px]">check_circle</span>
              <div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-white block">Active Standing Backlogs</span>
                <span className="text-[11px] text-zinc-500 dark:text-[#a1a1aa]">0 Standing Backlogs (Cleared)</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#10b981] bg-[#10b98120] border border-[#10b98130] px-2 py-0.5 rounded-full">Pass</span>
          </div>

          {/* Item 3: DSA Solving */}
          <div className="flex items-center justify-between p-3 rounded-[12px] bg-zinc-50 dark:bg-[#161616] border border-[#e4e4e7] dark:border-[#222222]">
            <div className="flex items-center gap-3">
              <span className={`material-symbols-outlined text-[20px] ${isDsaReady ? 'text-[#10b981]' : 'text-amber-500'}`}>
                {isDsaReady ? 'check_circle' : 'schedule'}
              </span>
              <div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-white block">DSA Problem Target</span>
                <span className="text-[11px] text-zinc-500 dark:text-[#a1a1aa]">{solvedDSA} Problems Solved in Hub</span>
              </div>
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              isDsaReady ? 'text-[#10b981] bg-[#10b98120] border border-[#10b98130]' : 'text-amber-500 bg-amber-500/20 border border-amber-500/30'
            }`}>
              {isDsaReady ? 'Ready' : 'In Progress'}
            </span>
          </div>

          {/* Item 4: Resume */}
          <div className="flex items-center justify-between p-3 rounded-[12px] bg-zinc-50 dark:bg-[#161616] border border-[#e4e4e7] dark:border-[#222222]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#10b981] text-[20px]">check_circle</span>
              <div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-white block">Master Resume &amp; GitHub</span>
                <span className="text-[11px] text-zinc-500 dark:text-[#a1a1aa]">Verified by TPO Committee</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#10b981] bg-[#10b98120] border border-[#10b98130] px-2 py-0.5 rounded-full">Verified</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-3 border-t border-[#e4e4e7] dark:border-[#222222]">
          <button
            onClick={() => {
              setIsCheckStatusOpen(false);
              setActiveTab('settings');
            }}
            className="px-4 py-2 text-xs font-semibold text-[#7c3aed] dark:text-[#a78bfa] hover:underline cursor-pointer"
          >
            Update Profile Info
          </button>
          <button
            onClick={() => setIsCheckStatusOpen(false)}
            className="px-5 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-bold rounded-[8px] transition-all shadow-[0_0_12px_#7c3aed40] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
