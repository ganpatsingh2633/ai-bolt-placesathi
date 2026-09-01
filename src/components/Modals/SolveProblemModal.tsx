import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DSAProblem } from '../../types';

export const SolveProblemModal: React.FC = () => {
  const { selectedProblemForSolve, closeSolveProblemModal, toggleProblemStatus, showToast } = useApp();
  
  if (!selectedProblemForSolve) return null;

  const problem = selectedProblemForSolve;
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'javascript' | 'java'>('python');
  const [code, setCode] = useState<string>(() => {
    return problem.starterCode?.[selectedLanguage] || 
`# Solution for ${problem.title}
def solve():
    # Write your solution here
    pass`;
  });

  const [activeTab, setActiveTab] = useState<'description' | 'solution' | 'notes'>('description');
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'running' | 'passed' | 'failed'; message?: string }>({ status: 'idle' });
  const [customNotes, setCustomNotes] = useState(problem.notes || '');

  const handleLanguageChange = (lang: 'python' | 'javascript' | 'java') => {
    setSelectedLanguage(lang);
    if (problem.starterCode?.[lang]) {
      setCode(problem.starterCode[lang]!);
    }
  };

  const handleRunCode = () => {
    setTestResult({ status: 'running' });
    setTimeout(() => {
      setTestResult({
        status: 'passed',
        message: 'All 3 test cases passed! Runtime: 42ms (Beats 92.4% of submissions)'
      });
      showToast('Tests Passed!', 'All sample test cases executed successfully.', 'info');
    }, 700);
  };

  const handleSubmit = () => {
    setTestResult({ status: 'running' });
    setTimeout(() => {
      setTestResult({
        status: 'passed',
        message: 'Accepted! Runtime: 38ms, Memory: 16.4 MB. Complexity: ' + (problem.timeComplexity || 'O(n)')
      });
      toggleProblemStatus(problem.id, 'Solved');
      setTimeout(() => {
        closeSolveProblemModal();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e4e4e7] dark:border-[#222222] rounded-[20px] max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#e4e4e7] dark:border-[#222222] flex justify-between items-center bg-zinc-50 dark:bg-[#161616] shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              {problem.title}
            </h2>
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
              problem.difficulty === 'Easy'
                ? 'bg-[#10b98120] text-[#10b981] border border-[#10b98130]'
                : problem.difficulty === 'Medium'
                ? 'bg-[#f59e0b20] text-[#f59e0b] border border-[#f59e0b30]'
                : 'bg-[#ef444420] text-[#ef4444] border border-[#ef444430]'
            }`}>
              {problem.difficulty}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:inline">
              Topic: <strong className="text-zinc-900 dark:text-white">{problem.topic}</strong>
            </span>
          </div>

          <button
            onClick={closeSolveProblemModal}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Modal Body: Split view (Left: Description/Examples, Right: Code Editor) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Panel */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#e4e4e7] dark:border-[#222222] flex flex-col h-full overflow-hidden bg-white dark:bg-[#0d0d0d]">
            {/* Tabs */}
            <div className="flex border-b border-[#e4e4e7] dark:border-[#222222] bg-zinc-50 dark:bg-[#141414] px-4 pt-2 shrink-0">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'description'
                    ? 'border-[#7c3aed] text-[#7c3aed] dark:text-white'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                }`}
              >
                Problem Description
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'notes'
                    ? 'border-[#7c3aed] text-[#7c3aed] dark:text-white'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                }`}
              >
                Complexity &amp; Notes
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs md:text-sm text-zinc-700 dark:text-zinc-300">
              {activeTab === 'description' && (
                <>
                  <div className="whitespace-pre-line leading-relaxed text-zinc-700 dark:text-[#a1a1aa]">
                    {problem.description || 'Practice problem for placement assessment.'}
                  </div>

                  {problem.examples && problem.examples.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">
                        Examples
                      </h4>
                      {problem.examples.map((ex, idx) => (
                        <div key={idx} className="bg-zinc-50 dark:bg-[#161616] border border-[#e4e4e7] dark:border-[#222222] p-3 rounded-[10px] font-mono text-xs space-y-1">
                          <div><span className="text-zinc-400">Input: </span><span className="text-[#7c3aed] dark:text-[#a78bfa]">{ex.input}</span></div>
                          <div><span className="text-zinc-400">Output: </span><span className="text-[#10b981]">{ex.output}</span></div>
                          {ex.explanation && (
                            <div className="text-[11px] text-zinc-500 dark:text-[#a1a1aa] font-sans pt-1">
                              Explanation: {ex.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#e4e4e7] dark:border-[#222222] text-xs text-zinc-500 space-y-1">
                    <div>• 2 ≤ nums.length ≤ 10<sup>4</sup></div>
                    <div>• -10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></div>
                    <div>• Only one valid answer exists.</div>
                  </div>
                </>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <div className="bg-[#7c3aed15] dark:bg-[#7c3aed20] p-3.5 rounded-[12px] border border-[#7c3aed30]">
                    <h4 className="font-bold text-[#7c3aed] dark:text-[#a78bfa] text-xs mb-1">Target Time Complexity</h4>
                    <p className="font-mono text-sm font-bold text-[#10b981]">{problem.timeComplexity || 'O(n)'}</p>
                    <h4 className="font-bold text-[#7c3aed] dark:text-[#a78bfa] text-xs mt-3 mb-1">Space Complexity</h4>
                    <p className="font-mono text-sm font-bold text-[#10b981]">{problem.spaceComplexity || 'O(1)'}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                      Personal Key Takeaways &amp; Approach
                    </label>
                    <textarea
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder="Write your intuition, edge cases, hash map lookup strategy..."
                      rows={5}
                      className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] p-3 text-xs bg-zinc-50 dark:bg-[#161616] text-zinc-900 dark:text-gray-200 outline-none"
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Code Workspace */}
          <div className="lg:col-span-7 flex flex-col h-full overflow-hidden bg-[#050505] text-gray-200">
            {/* Editor Toolbar */}
            <div className="flex justify-between items-center px-4 py-2 bg-[#111111] border-b border-[#222222] shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Language:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as any)}
                  className="bg-[#18181b] text-white text-xs border border-[#27272a] rounded px-2.5 py-1 outline-none cursor-pointer"
                >
                  <option value="python">Python 3</option>
                  <option value="javascript">JavaScript (ES6)</option>
                  <option value="java">Java 17</option>
                </select>
              </div>

              <div className="text-xs text-zinc-400 flex items-center gap-2">
                <span>Editor Ready</span>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="flex-1 p-4 font-mono text-xs md:text-sm overflow-auto">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full bg-transparent text-[#e6edf3] font-mono resize-none outline-none leading-relaxed"
              ></textarea>
            </div>

            {/* Output / Test Results Box */}
            {testResult.status !== 'idle' && (
              <div className="p-3.5 bg-[#111111] border-t border-[#222222] shrink-0 font-mono text-xs">
                {testResult.status === 'running' && (
                  <div className="flex items-center gap-2 text-amber-400">
                    <span className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
                    Running sample test cases on container...
                  </div>
                )}
                {testResult.status === 'passed' && (
                  <div className="text-[#10b981] flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] mt-0.5">check_circle</span>
                    <div>
                      <strong className="block font-bold">Execution Successful</strong>
                      <span className="text-zinc-400 text-[11px]">{testResult.message}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Editor Action Buttons */}
            <div className="px-5 py-3 bg-[#111111] border-t border-[#222222] flex justify-between items-center shrink-0">
              <button
                onClick={() => {
                  toggleProblemStatus(problem.id, problem.status === 'Solved' ? 'Unsolved' : 'Solved');
                  showToast('Status Toggled', `Problem is now ${problem.status === 'Solved' ? 'Unsolved' : 'Solved'}.`, 'info');
                }}
                className="text-xs text-zinc-400 hover:text-white cursor-pointer underline"
              >
                Mark as {problem.status === 'Solved' ? 'Unsolved' : 'Solved'}
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRunCode}
                  disabled={testResult.status === 'running'}
                  className="px-4 py-2 rounded-[8px] text-xs font-semibold bg-[#222222] text-zinc-200 hover:bg-[#333333] transition-all cursor-pointer disabled:opacity-50"
                >
                  Run Code
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={testResult.status === 'running'}
                  className="px-5 py-2 rounded-[8px] text-xs font-bold bg-[#7c3aed] hover:bg-[#6d28d9] text-white transition-all cursor-pointer shadow-[0_0_15px_#7c3aed40] active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
                  Submit Solution
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
