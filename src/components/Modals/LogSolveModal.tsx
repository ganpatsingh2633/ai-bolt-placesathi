import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DifficultyLevel } from '../../types';

export const LogSolveModal: React.FC = () => {
  const { isLogSolveOpen, setIsLogSolveOpen, addSolvedProblem } = useApp();

  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('Arrays & Hashing');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Easy');
  const [timeComplexity, setTimeComplexity] = useState('O(n)');
  const [spaceComplexity, setSpaceComplexity] = useState('O(1)');
  const [notes, setNotes] = useState('');

  if (!isLogSolveOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addSolvedProblem({
      title: title.trim(),
      topic,
      difficulty,
      timeComplexity,
      spaceComplexity,
      notes: notes.trim()
    });

    setIsLogSolveOpen(false);
    setTitle('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bento-card max-w-lg w-full p-6 shadow-2xl animate-scaleUp">
        <div className="flex justify-between items-center pb-3.5 border-b border-[#e4e4e7] dark:border-[#222222] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7c3aed] dark:text-[#a78bfa]">add_task</span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Log DSA Problem Solve</h3>
          </div>
          <button
            onClick={() => setIsLogSolveOpen(false)}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Problem Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Trapping Rain Water, Course Schedule"
              className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Topic Focus
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-xs md:text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
              >
                <option value="Arrays & Hashing" className="bg-white dark:bg-[#18181b]">Arrays & Hashing</option>
                <option value="Two Pointers" className="bg-white dark:bg-[#18181b]">Two Pointers</option>
                <option value="Sliding Window" className="bg-white dark:bg-[#18181b]">Sliding Window</option>
                <option value="Linked Lists" className="bg-white dark:bg-[#18181b]">Linked Lists</option>
                <option value="Trees & Graphs" className="bg-white dark:bg-[#18181b]">Trees & Graphs</option>
                <option value="Dynamic Programming" className="bg-white dark:bg-[#18181b]">Dynamic Programming</option>
                <option value="Greedy Algorithms" className="bg-white dark:bg-[#18181b]">Greedy Algorithms</option>
                <option value="Binary Search" className="bg-white dark:bg-[#18181b]">Binary Search</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-xs md:text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
              >
                <option value="Easy" className="bg-white dark:bg-[#18181b]">Easy</option>
                <option value="Medium" className="bg-white dark:bg-[#18181b]">Medium</option>
                <option value="Hard" className="bg-white dark:bg-[#18181b]">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Time Complexity
              </label>
              <input
                type="text"
                value={timeComplexity}
                onChange={(e) => setTimeComplexity(e.target.value)}
                placeholder="e.g. O(n log n)"
                className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-xs md:text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 font-mono outline-none focus:border-[#7c3aed]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Space Complexity
              </label>
              <input
                type="text"
                value={spaceComplexity}
                onChange={(e) => setSpaceComplexity(e.target.value)}
                placeholder="e.g. O(1)"
                className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-xs md:text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 font-mono outline-none focus:border-[#7c3aed]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Key Insights / Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Used monotonic stack to track next greater element..."
              rows={3}
              className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] p-3 text-xs bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#e4e4e7] dark:border-[#222222]">
            <button
              type="button"
              onClick={() => setIsLogSolveOpen(false)}
              className="px-4 py-2 border border-[#e4e4e7] dark:border-[#222222] rounded-[8px] text-xs font-semibold text-zinc-600 dark:text-zinc-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-[8px] text-xs font-semibold shadow-[0_0_12px_#7c3aed40] cursor-pointer active:scale-95 transition-all"
            >
              Log Problem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
