import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AptitudeAttempt } from '../types';

export const AptitudeScreen: React.FC = () => {
  const { 
    aptitudeAttempts, 
    openAptitudeQuiz, 
    openAptitudeReviewModal 
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredAttempts = categoryFilter === 'All'
    ? aptitudeAttempts
    : aptitudeAttempts.filter(a => a.category === categoryFilter);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Aptitude Practice
          </h2>
          <p className="text-sm md:text-base text-zinc-500 dark:text-[#a1a1aa] mt-1">
            Track your accuracy, evaluate section breakdown, and review past test attempts.
          </p>
        </div>
        <button
          onClick={openAptitudeQuiz}
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-[12px] font-semibold text-sm flex items-center gap-2 active:scale-95 transition-all shadow-[0_0_15px_#7c3aed40] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Start New Set
        </button>
      </div>

      {/* Bento Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {/* Logical Reasoning Card */}
        <div 
          onClick={() => setCategoryFilter(categoryFilter === 'Logical Reasoning' ? 'All' : 'Logical Reasoning')}
          className={`bento-card flex items-center justify-between transition-all cursor-pointer group ${
            categoryFilter === 'Logical Reasoning' ? 'ring-2 ring-[#7c3aed]' : ''
          }`}
        >
          <div>
            <div className="bento-label">LOGICAL REASONING</div>
            <div className="bento-stat mt-1 group-hover:text-[#7c3aed] dark:group-hover:text-[#a78bfa] transition-colors">
              78%
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              Accuracy (Last 10 Sets)
            </div>
          </div>
          <div className="relative w-20 h-20 md:w-22 md:h-22 shrink-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-zinc-200 dark:text-zinc-800 stroke-current"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                strokeWidth="8"
              />
              <circle
                className="text-[#7c3aed] stroke-current progress-ring__circle"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                strokeDasharray="251.2"
                strokeDashoffset="55.26"
                strokeLinecap="round"
                strokeWidth="8"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#7c3aed] text-[24px]">
                extension
              </span>
            </div>
          </div>
        </div>

        {/* Quantitative Card */}
        <div 
          onClick={() => setCategoryFilter(categoryFilter === 'Quantitative' ? 'All' : 'Quantitative')}
          className={`bento-card flex items-center justify-between transition-all cursor-pointer group ${
            categoryFilter === 'Quantitative' ? 'ring-2 ring-[#10b981]' : ''
          }`}
        >
          <div>
            <div className="bento-label">QUANTITATIVE</div>
            <div className="bento-stat mt-1 group-hover:text-[#10b981] transition-colors">
              85%
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              Accuracy (Last 10 Sets)
            </div>
          </div>
          <div className="relative w-20 h-20 md:w-22 md:h-22 shrink-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-zinc-200 dark:text-zinc-800 stroke-current"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                strokeWidth="8"
              />
              <circle
                className="text-[#10b981] stroke-current progress-ring__circle"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                strokeDasharray="251.2"
                strokeDashoffset="37.68"
                strokeLinecap="round"
                strokeWidth="8"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#10b981] text-[24px]">
                calculate
              </span>
            </div>
          </div>
        </div>

        {/* Verbal Ability Card */}
        <div 
          onClick={() => setCategoryFilter(categoryFilter === 'Verbal Ability' ? 'All' : 'Verbal Ability')}
          className={`bento-card flex items-center justify-between transition-all cursor-pointer group ${
            categoryFilter === 'Verbal Ability' ? 'ring-2 ring-[#f59e0b]' : ''
          }`}
        >
          <div>
            <div className="bento-label">VERBAL ABILITY</div>
            <div className="bento-stat mt-1 group-hover:text-[#f59e0b] transition-colors">
              62%
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              Accuracy (Last 10 Sets)
            </div>
          </div>
          <div className="relative w-20 h-20 md:w-22 md:h-22 shrink-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-zinc-200 dark:text-zinc-800 stroke-current"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                strokeWidth="8"
              />
              <circle
                className="text-[#f59e0b] stroke-current progress-ring__circle"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                strokeDasharray="251.2"
                strokeDashoffset="95.45"
                strokeLinecap="round"
                strokeWidth="8"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#f59e0b] text-[24px]">
                spellcheck
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Attempt History Table Card */}
      <div className="bento-card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e4e4e7] dark:border-[#222222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-zinc-50 dark:bg-[#161616]">
          <div className="flex items-center gap-3">
            <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white">
              Attempt History
            </h3>
            {categoryFilter !== 'All' && (
              <span className="text-xs bg-[#7c3aed20] text-[#7c3aed] dark:text-[#a78bfa] px-2.5 py-0.5 rounded-md font-semibold">
                Filtered: {categoryFilter}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {categoryFilter !== 'All' && (
              <button
                onClick={() => setCategoryFilter('All')}
                className="text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                Reset Filter
              </button>
            )}
            <button 
              onClick={openAptitudeQuiz}
              className="text-[#7c3aed] dark:text-[#a78bfa] text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              TAKE NEW TEST <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="bg-zinc-50 dark:bg-[#161616] border-b border-[#e4e4e7] dark:border-[#222222]">
                <th className="text-[11px] uppercase tracking-[1px] font-semibold text-zinc-500 dark:text-[#a1a1aa] py-3.5 px-6 w-1/3">
                  Topic Focus
                </th>
                <th className="text-[11px] uppercase tracking-[1px] font-semibold text-zinc-500 dark:text-[#a1a1aa] py-3.5 px-6 w-1/4">
                  Date &amp; Time
                </th>
                <th className="text-[11px] uppercase tracking-[1px] font-semibold text-zinc-500 dark:text-[#a1a1aa] py-3.5 px-6 w-1/4">
                  Score / Accuracy
                </th>
                <th className="text-[11px] uppercase tracking-[1px] font-semibold text-zinc-500 dark:text-[#a1a1aa] py-3.5 px-6 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e4e7] dark:divide-[#222222]">
              {filteredAttempts.map((attempt) => {
                const isHigh = attempt.scorePercentage >= 80;
                const isMed = attempt.scorePercentage >= 60 && attempt.scorePercentage < 80;

                return (
                  <tr
                    key={attempt.id}
                    className="hover:bg-zinc-50 dark:hover:bg-[#161616] transition-colors group"
                  >
                    {/* Topic Focus */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          attempt.category === 'Logical Reasoning'
                            ? 'bg-[#7c3aed20] text-[#7c3aed] dark:text-[#a78bfa]'
                            : attempt.category === 'Quantitative'
                            ? 'bg-[#10b98120] text-[#10b981]'
                            : 'bg-[#f59e0b20] text-[#f59e0b]'
                        }`}>
                          <span className="material-symbols-outlined text-[18px]">
                            {attempt.category === 'Logical Reasoning'
                              ? 'extension'
                              : attempt.category === 'Quantitative'
                              ? 'calculate'
                              : 'spellcheck'}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-zinc-900 dark:text-gray-200">
                            {attempt.topic}
                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            {attempt.totalQuestions} Questions
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Date & Time */}
                    <td className="py-4 px-6">
                      <div className="text-sm text-zinc-900 dark:text-gray-200">
                        {attempt.date}
                      </div>
                      <div className="text-xs text-zinc-400 font-mono">
                        {attempt.time}
                      </div>
                    </td>

                    {/* Score / Accuracy */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-sm md:text-base font-bold text-zinc-900 dark:text-white">
                          {attempt.correctAnswers}/{attempt.totalQuestions}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-md font-bold ${
                          isHigh
                            ? 'bg-[#10b98120] text-[#10b981] border border-[#10b98130]'
                            : isMed
                            ? 'bg-[#f59e0b20] text-[#f59e0b] border border-[#f59e0b30]'
                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                        }`}>
                          {attempt.scorePercentage}%
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => openAptitudeReviewModal(attempt)}
                        className="text-xs font-semibold text-[#7c3aed] dark:text-[#a78bfa] border border-[#7c3aed40] px-3.5 py-1.5 rounded-[8px] hover:bg-[#7c3aed] hover:text-white transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        Review <span className="material-symbols-outlined text-[16px]">analytics</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
