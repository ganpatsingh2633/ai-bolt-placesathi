import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DSAProblem, DifficultyLevel, ProblemStatus } from '../types';

export const DSAPracticeScreen: React.FC = () => {
  const { 
    problems, 
    searchQuery, 
    setSearchQuery, 
    openSolveProblemModal, 
    setIsLogSolveOpen, 
    toggleProblemStatus 
  } = useApp();

  const [selectedTopic, setSelectedTopic] = useState<string>('All Topics');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<ProblemStatus | 'All'>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Extract all unique topics
  const topics = useMemo(() => {
    const set = new Set<string>();
    problems.forEach(p => set.add(p.topic));
    return ['All Topics', ...Array.from(set)];
  }, [problems]);

  // Filter problems
  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.topic.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTopic = selectedTopic === 'All Topics' || p.topic === selectedTopic;
      const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
      const matchesStatus = selectedStatusFilter === 'All' || p.status === selectedStatusFilter;

      return matchesSearch && matchesTopic && matchesDifficulty && matchesStatus;
    });
  }, [problems, searchQuery, selectedTopic, selectedDifficulty, selectedStatusFilter]);

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage) || 1;
  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProblems.slice(start, start + itemsPerPage);
  }, [filteredProblems, currentPage, itemsPerPage]);

  const handleDifficultyClick = (diff: DifficultyLevel) => {
    setSelectedDifficulty(prev => prev === diff ? 'All' : diff);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            DSA Practice Tracker
          </h1>
          <p className="text-sm md:text-base text-zinc-500 dark:text-[#a1a1aa] mt-1">
            Monitor your problem-solving progress and curated sheets for technical rounds.
          </p>
        </div>
        <button
          onClick={() => setIsLogSolveOpen(true)}
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-[12px] text-sm font-semibold active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_15px_#7c3aed40] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Log New Solve
        </button>
      </header>

      {/* Filters & Search Toolbar in a Bento Card */}
      <section className="bento-card p-4 md:p-5 flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search problem title..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-100 dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] text-sm text-zinc-900 dark:text-gray-200 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] outline-none transition-all"
            />
          </div>

          <div className="h-6 w-px bg-[#e4e4e7] dark:bg-[#222222] hidden sm:block"></div>

          {/* Topic Dropdown */}
          <div className="relative w-full sm:w-48">
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-zinc-100 dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 pr-9 text-sm text-zinc-900 dark:text-gray-200 focus:border-[#7c3aed] outline-none cursor-pointer"
            >
              {topics.map(t => (
                <option key={t} value={t} className="bg-white dark:bg-[#18181b]">{t}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-[20px]">
              arrow_drop_down
            </span>
          </div>

          {/* Status filter toggle */}
          <div className="relative w-full sm:w-36">
            <select
              value={selectedStatusFilter}
              onChange={(e) => {
                setSelectedStatusFilter(e.target.value as ProblemStatus | 'All');
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-zinc-100 dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 pr-8 text-sm text-zinc-900 dark:text-gray-200 focus:border-[#7c3aed] outline-none cursor-pointer"
            >
              <option value="All" className="bg-white dark:bg-[#18181b]">All Statuses</option>
              <option value="Solved" className="bg-white dark:bg-[#18181b]">Solved</option>
              <option value="Attempted" className="bg-white dark:bg-[#18181b]">Attempted</option>
              <option value="Unsolved" className="bg-white dark:bg-[#18181b]">Unsolved</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-[20px]">
              arrow_drop_down
            </span>
          </div>
        </div>

        {/* Difficulty Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          <span className="bento-label mr-1 whitespace-nowrap mb-0">
            DIFFICULTY:
          </span>
          <button
            onClick={() => handleDifficultyClick('Easy')}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              selectedDifficulty === 'Easy'
                ? 'bg-[#10b981] text-white border-[#10b981]'
                : 'border-[#10b98140] text-[#10b981] bg-[#10b98115] hover:bg-[#10b98125]'
            }`}
          >
            Easy
          </button>
          <button
            onClick={() => handleDifficultyClick('Medium')}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              selectedDifficulty === 'Medium'
                ? 'bg-[#f59e0b] text-white border-[#f59e0b]'
                : 'border-[#f59e0b40] text-[#f59e0b] bg-[#f59e0b15] hover:bg-[#f59e0b25]'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => handleDifficultyClick('Hard')}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              selectedDifficulty === 'Hard'
                ? 'bg-[#ef4444] text-white border-[#ef4444]'
                : 'border-[#ef444440] text-[#ef4444] bg-[#ef444415] hover:bg-[#ef444425]'
            }`}
          >
            Hard
          </button>
        </div>
      </section>

      {/* Data Table Section */}
      <section className="bento-card p-0 overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-zinc-50 dark:bg-[#161616] border-b border-[#e4e4e7] dark:border-[#222222]">
                <th className="py-3.5 px-6 text-[11px] uppercase tracking-[1px] font-semibold text-zinc-500 dark:text-[#a1a1aa]">
                  Problem Title
                </th>
                <th className="py-3.5 px-6 text-[11px] uppercase tracking-[1px] font-semibold text-zinc-500 dark:text-[#a1a1aa]">
                  Topic
                </th>
                <th className="py-3.5 px-6 text-[11px] uppercase tracking-[1px] font-semibold text-zinc-500 dark:text-[#a1a1aa]">
                  Difficulty
                </th>
                <th className="py-3.5 px-6 text-[11px] uppercase tracking-[1px] font-semibold text-zinc-500 dark:text-[#a1a1aa]">
                  Status
                </th>
                <th className="py-3.5 px-6 text-[11px] uppercase tracking-[1px] font-semibold text-zinc-500 dark:text-[#a1a1aa] text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e4e7] dark:divide-[#222222]">
              {paginatedProblems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-500 dark:text-zinc-400">
                    <p className="text-base font-medium">No problems found matching your filters.</p>
                    <button
                      onClick={() => {
                        setSelectedTopic('All Topics');
                        setSelectedDifficulty('All');
                        setSelectedStatusFilter('All');
                        setSearchQuery('');
                      }}
                      className="mt-2 text-[#7c3aed] font-semibold underline text-sm cursor-pointer"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedProblems.map((problem) => {
                  return (
                    <tr
                      key={problem.id}
                      className="hover:bg-zinc-50 dark:hover:bg-[#161616] transition-colors group"
                    >
                      {/* Title */}
                      <td className="py-4 px-6">
                        <button
                          onClick={() => openSolveProblemModal(problem)}
                          className="text-[15px] font-semibold text-zinc-900 dark:text-white hover:text-[#7c3aed] text-left transition-colors cursor-pointer"
                        >
                          {problem.title}
                        </button>
                        {problem.timeComplexity && (
                          <span className="block text-xs text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">
                            Complexity: {problem.timeComplexity}
                          </span>
                        )}
                      </td>

                      {/* Topic */}
                      <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-300">
                        {problem.topic}
                      </td>

                      {/* Difficulty Badge */}
                      <td className="py-4 px-6">
                        {problem.difficulty === 'Easy' && (
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold tracking-wide text-[#10b981] bg-[#10b98120] border border-[#10b98130]">
                            Easy
                          </span>
                        )}
                        {problem.difficulty === 'Medium' && (
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold tracking-wide text-[#f59e0b] bg-[#f59e0b20] border border-[#f59e0b30]">
                            Medium
                          </span>
                        )}
                        {problem.difficulty === 'Hard' && (
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold tracking-wide text-[#ef4444] bg-[#ef444420] border border-[#ef444430]">
                            Hard
                          </span>
                        )}
                      </td>

                      {/* Status with Quick Toggle */}
                      <td className="py-4 px-6">
                        {problem.status === 'Solved' && (
                          <div 
                            onClick={() => toggleProblemStatus(problem.id, 'Unsolved')}
                            className="flex items-center gap-2 cursor-pointer group/status"
                            title="Click to toggle status"
                          >
                            <span className="material-symbols-outlined text-[#10b981] text-[18px]">
                              check_circle
                            </span>
                            <span className="text-sm text-zinc-900 dark:text-white font-medium group-hover/status:underline">
                              Solved
                            </span>
                          </div>
                        )}
                        {problem.status === 'Attempted' && (
                          <div 
                            onClick={() => toggleProblemStatus(problem.id, 'Solved')}
                            className="flex items-center gap-2 cursor-pointer group/status"
                            title="Click to toggle status"
                          >
                            <span className="material-symbols-outlined text-[#f59e0b] text-[18px]">
                              schedule
                            </span>
                            <span className="text-sm text-zinc-900 dark:text-white font-medium group-hover/status:underline">
                              Attempted
                            </span>
                          </div>
                        )}
                        {problem.status === 'Unsolved' && (
                          <div 
                            onClick={() => toggleProblemStatus(problem.id, 'Attempted')}
                            className="flex items-center gap-2 cursor-pointer group/status"
                            title="Click to toggle status"
                          >
                            <span className="material-symbols-outlined text-zinc-400 text-[18px]">
                              radio_button_unchecked
                            </span>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400 group-hover/status:underline">
                              Unsolved
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right">
                        {problem.status === 'Solved' && (
                          <button
                            onClick={() => openSolveProblemModal(problem)}
                            className="text-zinc-400 hover:text-[#7c3aed] dark:hover:text-white p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#222222] transition-colors cursor-pointer"
                            title="Review code & notes"
                          >
                            <span className="material-symbols-outlined text-[20px]">refresh</span>
                          </button>
                        )}
                        {problem.status === 'Attempted' && (
                          <button
                            onClick={() => openSolveProblemModal(problem)}
                            className="text-xs text-[#7c3aed] dark:text-[#a78bfa] border border-[#7c3aed40] px-3.5 py-1.5 rounded-[8px] hover:bg-[#7c3aed] hover:text-white transition-colors font-semibold cursor-pointer"
                          >
                            Resume
                          </button>
                        )}
                        {problem.status === 'Unsolved' && (
                          <button
                            onClick={() => openSolveProblemModal(problem)}
                            className="text-xs text-[#7c3aed] dark:text-[#a78bfa] border border-[#7c3aed40] px-3.5 py-1.5 rounded-[8px] hover:bg-[#7c3aed] hover:text-white transition-colors font-semibold cursor-pointer"
                          >
                            Solve
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-[#e4e4e7] dark:border-[#222222] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-50 dark:bg-[#111111]">
          <span className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Showing {filteredProblems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredProblems.length)} of {filteredProblems.length} problems
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-[#e4e4e7] dark:border-[#222222] rounded-lg text-zinc-700 dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-[#18181b] transition-colors text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            <span className="text-xs text-zinc-400 px-1 font-mono">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-[#e4e4e7] dark:border-[#222222] rounded-lg text-zinc-700 dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-[#18181b] transition-colors text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
