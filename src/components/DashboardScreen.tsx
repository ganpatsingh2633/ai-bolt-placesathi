import React from 'react';
import { useApp } from '../context/AppContext';

export const DashboardScreen: React.FC = () => {
  const { 
    setActiveTab, 
    activities, 
    problems, 
    aptitudeAttempts, 
    openSolveProblemModal, 
    openAptitudeQuiz,
    setIsLogSolveOpen,
    setIsCheckStatusOpen,
    profile
  } = useApp();

  // Compute live statistics
  const solvedCount = problems.filter(p => p.status === 'Solved').length;
  const attemptedCount = problems.filter(p => p.status === 'Attempted').length;
  const totalDSA = problems.length;

  const totalAptitudeTests = aptitudeAttempts.length;
  const avgAptitudeAccuracy = totalAptitudeTests > 0 
    ? Math.round(aptitudeAttempts.reduce((acc, curr) => acc + curr.scorePercentage, 0) / totalAptitudeTests) 
    : 82;

  // Mock bar chart heights for weekly velocity
  const velocityBars = [
    { label: 'M', height: '40%', active: false },
    { label: 'T', height: '30%', active: false },
    { label: 'W', height: '60%', active: false },
    { label: 'T', height: '85%', active: true },
    { label: 'F', height: '45%', active: false },
    { label: 'S', height: '95%', active: true },
    { label: 'S', height: '70%', active: false },
    { label: 'M', height: '80%', active: true },
    { label: 'T', height: '45%', active: false },
    { label: 'W', height: '65%', active: false },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Preparation Overview
          </h2>
          <p className="text-sm md:text-base text-zinc-500 dark:text-[#a1a1aa] mt-1">
            Real-time analytics and tracking for campus recruitment drives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLogSolveOpen(true)}
            className="border border-[#e4e4e7] dark:border-[#222222] bg-[#ffffff] dark:bg-[#111111] hover:bg-zinc-50 dark:hover:bg-[#18181b] text-zinc-900 dark:text-gray-200 text-xs md:text-sm font-semibold px-4 py-2.5 rounded-[12px] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Log Solve
          </button>
          <button
            onClick={openAptitudeQuiz}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-[12px] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_#7c3aed40]"
          >
            <span className="material-symbols-outlined text-[18px]">psychology</span>
            Start Aptitude
          </button>
        </div>
      </div>

      {/* Bento Grid Layout (4-column on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        
        {/* CARD 1: Profile Capacity / Readiness (Row 2 span on desktop) */}
        <div className="bento-card lg:row-span-2 flex flex-col justify-between group">
          <div>
            <div className="flex justify-between items-center">
              <div className="bento-label">Profile Readiness</div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#7c3aed20] text-[#7c3aed] dark:text-[#a78bfa]">
                Ready
              </span>
            </div>
            
            <div className="flex items-baseline gap-2 mt-1">
              <div className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">75%</div>
              <span className="text-xs text-zinc-400">Score</span>
            </div>

            {/* Progress tracks */}
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">DSA Core Sheet</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">90%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#7c3aed] rounded-full animate-bar" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">Aptitude Readiness</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">82%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#10b981] rounded-full animate-bar" style={{ width: '82%', animationDelay: '0.1s' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">Resume & Portfolio</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">50%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#f59e0b] rounded-full animate-bar" style={{ width: '50%', animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#e4e4e7] dark:border-[#222222]">
            <div className="bento-label">Target Tier 1 Companies</div>
            <div className="flex items-center mt-2">
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111111] bg-[#e11d48] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                G
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111111] bg-[#2563eb] text-white flex items-center justify-center font-bold text-xs shadow-sm -ml-2">
                M
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111111] bg-[#16a34a] text-white flex items-center justify-center font-bold text-xs shadow-sm -ml-2">
                A
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111111] bg-[#9333ea] text-white flex items-center justify-center font-bold text-xs shadow-sm -ml-2">
                U
              </div>
              <span className="text-xs text-zinc-400 ml-3">+8 more</span>
            </div>

            <button
              onClick={() => setActiveTab('settings')}
              className="mt-4 w-full py-2 px-3 rounded-[12px] bg-zinc-100 dark:bg-[#1a1a1e] hover:bg-zinc-200 dark:hover:bg-[#27272a] text-zinc-900 dark:text-gray-200 text-xs font-semibold transition-all cursor-pointer border border-[#e4e4e7] dark:border-[#27272a]"
            >
              Update Profile Details
            </button>
          </div>
        </div>

        {/* CARD 2: Weekly Momentum & Bar Chart (Span 2 on desktop) */}
        <div className="bento-card lg:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <div className="bento-label">Weekly Problem Solving Velocity</div>
              <div className="bento-stat mt-1">38 Solved</div>
            </div>
            <div className="trend trend-up">
              +14% vs last week
            </div>
          </div>

          {/* Bento bar chart */}
          <div className="mt-6">
            <div className="bar-chart">
              {velocityBars.map((bar, idx) => (
                <div 
                  key={idx} 
                  className={`bar ${bar.active ? 'active' : ''}`} 
                  style={{ height: bar.height }}
                  title={`Day ${idx + 1}: ${bar.height}`}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-zinc-400 dark:text-zinc-500 mt-2 px-1 font-mono">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
              <span>Sun</span>
              <span>Today</span>
            </div>
          </div>
        </div>

        {/* CARD 3: Current Placement Status (1 col) */}
        <div className="bento-card flex flex-col justify-between">
          <div>
            <div className="bento-label">Current Status</div>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981]"></div>
              <span className="font-bold text-base text-zinc-900 dark:text-white">All Systems Go</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Eligible for all Tier 1 and Day 1 recruitment drives.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#e4e4e7] dark:border-[#222222] flex justify-between items-center text-xs">
            <span className="text-zinc-400">Next OA:</span>
            <span className="font-semibold text-[#7c3aed] dark:text-[#a78bfa]">Google (Tomorrow)</span>
          </div>
        </div>

        {/* CARD 4: Total DSA Problems (1 col) */}
        <div className="bento-card flex flex-col justify-between">
          <div>
            <div className="bento-label">Total DSA Completed</div>
            <div className="bento-stat mt-1">{solvedCount} <span className="text-lg font-normal text-zinc-400">/ {totalDSA}</span></div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="trend trend-up">
              +4 this week
            </div>
            <button
              onClick={() => setActiveTab('dsa')}
              className="text-xs font-semibold text-[#7c3aed] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Tracker <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* CARD 5: Activity Logs (Span 2 on desktop) */}
        <div className="bento-card lg:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <div className="bento-label">Recent System Activity</div>
            <button
              onClick={() => setActiveTab('dsa')}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              View All Logs
            </button>
          </div>

          <div className="space-y-1 mt-1">
            {activities.slice(0, 4).map((act) => (
              <div 
                key={act.id}
                className="flex items-center justify-between py-2 border-b border-[#e4e4e7] dark:border-[#222222] last:border-0"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    act.type === 'dsa_solved' ? 'bg-[#10b981]' : 'bg-[#7c3aed]'
                  }`}></div>
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-300 truncate">
                    {act.title}
                  </span>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-600 shrink-0 font-mono ml-2">
                  {act.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 6: Aptitude Accuracy (1 col) */}
        <div className="bento-card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div className="bento-label">Aptitude Accuracy</div>
              <div className="trend trend-accent">
                {avgAptitudeAccuracy}%
              </div>
            </div>
            <div className="bento-stat mt-1">{avgAptitudeAccuracy}%</div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#e4e4e7] dark:border-[#222222] space-y-1.5 text-xs">
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Quantitative:</span>
              <span className="font-semibold text-zinc-900 dark:text-white">85%</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Logical Reasoning:</span>
              <span className="font-semibold text-zinc-900 dark:text-white">78%</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Verbal Ability:</span>
              <span className="font-semibold text-zinc-900 dark:text-white">62%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
