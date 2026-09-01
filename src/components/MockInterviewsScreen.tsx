import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MockInterviewSession } from '../types';

export const MockInterviewsScreen: React.FC = () => {
  const { mockInterviews, showToast } = useApp();
  const [sessions, setSessions] = useState<MockInterviewSession[]>(mockInterviews);
  const [isScheduling, setIsScheduling] = useState(false);
  const [activeSession, setActiveSession] = useState<MockInterviewSession | null>(null);

  // New interview form state
  const [newTitle, setNewTitle] = useState('Data Structures & System Design Mock');
  const [newInterviewer, setNewInterviewer] = useState('AI Technical Interviewer (Gemini)');
  const [newRole, setNewRole] = useState('SDE I Placement Track');
  const [newDate, setNewDate] = useState('Tomorrow, 6:00 PM');

  const handleCreateMock = (e: React.FormEvent) => {
    e.preventDefault();
    const newMock: MockInterviewSession = {
      id: 'mock-' + Date.now(),
      title: newTitle,
      interviewer: newInterviewer,
      role: newRole,
      scheduledDate: newDate,
      status: 'Upcoming'
    };
    setSessions(prev => [newMock, ...prev]);
    setIsScheduling(false);
    showToast('Mock Interview Scheduled!', `Slot confirmed for ${newDate}. Check your calendar.`, 'success');
  };

  const handleStartSimulation = (session: MockInterviewSession) => {
    setActiveSession(session);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Mock Interviews
          </h1>
          <p className="text-sm md:text-base text-zinc-500 dark:text-[#a1a1aa] mt-1">
            Simulate realistic technical and behavioral campus drive interview rounds.
          </p>
        </div>
        <button
          onClick={() => setIsScheduling(true)}
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-[12px] text-sm font-semibold active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_15px_#7c3aed40] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">videocam</span>
          Schedule Mock Interview
        </button>
      </div>

      {/* Grid: Upcoming vs Completed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {/* Next Scheduled Banner */}
        <div className="bento-card bg-gradient-to-br from-zinc-900 via-[#18181b] to-[#121020] text-white flex flex-col justify-between border-[#333333]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] uppercase tracking-[1px] font-semibold bg-[#7c3aed30] text-[#a78bfa] border border-[#7c3aed40] px-3 py-1 rounded-full">
                Upcoming Simulation
              </span>
              <span className="text-xs text-zinc-400">1-on-1 AI Evaluator</span>
            </div>
            <h3 className="text-xl font-extrabold mb-1 text-white">
              {sessions[0]?.title || 'Full Stack & DSA Coding Round'}
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              With {sessions[0]?.interviewer || 'Senior Campus Evaluator'} • {sessions[0]?.scheduledDate}
            </p>
          </div>

          <div className="pt-4 border-t border-[#333333] flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              Environment: <strong className="text-white">Live Code + Audio</strong>
            </div>
            <button
              onClick={() => handleStartSimulation(sessions[0])}
              className="bg-[#7c3aed] text-white px-4 py-2 rounded-[10px] text-xs font-bold hover:bg-[#6d28d9] transition-all cursor-pointer active:scale-95 shadow-[0_0_12px_#7c3aed40]"
            >
              Enter Practice Room
            </button>
          </div>
        </div>

        {/* Readiness Checklist */}
        <div className="bento-card flex flex-col justify-between">
          <div>
            <div className="bento-label mb-2">
              INTERVIEW EVALUATION METRICS
            </div>
            <div className="space-y-3 mt-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-zinc-600 dark:text-zinc-300">Code Optimization &amp; Correctness</span>
                  <span className="font-bold text-[#10b981]">88%</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#10b981] h-full rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-zinc-600 dark:text-zinc-300">Communication &amp; Articulation</span>
                  <span className="font-bold text-[#7c3aed] dark:text-[#a78bfa]">82%</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#7c3aed] h-full rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-zinc-600 dark:text-zinc-300">Behavioral (STAR Method)</span>
                  <span className="font-bold text-[#f59e0b]">75%</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#f59e0b] h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#e4e4e7] dark:border-[#222222] text-xs text-zinc-500 dark:text-[#a1a1aa] flex items-center justify-between">
            <span>Average Score:</span>
            <strong className="text-zinc-900 dark:text-white font-mono text-sm">81.6 / 100 <span className="text-[#10b981] font-sans text-xs">(Top 12%)</span></strong>
          </div>
        </div>
      </div>

      {/* Session History List */}
      <div className="bento-card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e4e4e7] dark:border-[#222222] bg-zinc-50 dark:bg-[#161616]">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            Past Sessions &amp; Scorecards
          </h3>
        </div>
        <div className="divide-y divide-[#e4e4e7] dark:divide-[#222222]">
          {sessions.map((sess) => (
            <div key={sess.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-[#161616] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[10px] bg-[#7c3aed20] text-[#7c3aed] dark:text-[#a78bfa] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">video_chat</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-zinc-900 dark:text-white">
                    {sess.title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-[#a1a1aa] mt-0.5">
                    {sess.interviewer} • {sess.role} • {sess.scheduledDate}
                  </p>
                  {sess.feedback && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 bg-zinc-50 dark:bg-[#161616] p-2.5 rounded-[8px] border border-[#e4e4e7] dark:border-[#222222]">
                      <strong className="text-[#7c3aed] dark:text-[#a78bfa]">Feedback:</strong> {sess.feedback}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                {sess.score && (
                  <span className="px-3 py-1 rounded-md bg-[#10b98120] text-[#10b981] border border-[#10b98130] text-xs font-bold">
                    Score: {sess.score}%
                  </span>
                )}
                <span className={`px-3 py-1 rounded-md text-xs font-semibold ${
                  sess.status === 'Upcoming' 
                    ? 'bg-[#7c3aed20] text-[#7c3aed] dark:text-[#a78bfa] border border-[#7c3aed30]' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}>
                  {sess.status}
                </span>
                <button
                  onClick={() => handleStartSimulation(sess)}
                  className="text-xs font-semibold px-3 py-1.5 border border-[#7c3aed40] text-[#7c3aed] dark:text-[#a78bfa] rounded-[8px] hover:bg-[#7c3aed] hover:text-white transition-colors cursor-pointer"
                >
                  {sess.status === 'Upcoming' ? 'Start Session' : 'View Report'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduling Modal */}
      {isScheduling && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bento-card max-w-lg w-full p-6 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center pb-3 border-b border-[#e4e4e7] dark:border-[#222222] mb-4">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Schedule Mock Interview</h3>
              <button onClick={() => setIsScheduling(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateMock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Interview Topic / Track</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Interviewer Type</label>
                <select
                  value={newInterviewer}
                  onChange={(e) => setNewInterviewer(e.target.value)}
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
                >
                  <option value="AI Technical Interviewer (Gemini)">AI Technical Interviewer (Gemini Live)</option>
                  <option value="Peer Student (Class of 2024)">Peer Student (Class of 2024)</option>
                  <option value="Alumni Mentor (Google/Microsoft)">Alumni Mentor (Google/Microsoft)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Date &amp; Time</label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
                  placeholder="e.g. Tomorrow, 4:30 PM"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsScheduling(false)}
                  className="px-4 py-2 border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] text-xs font-semibold text-zinc-600 dark:text-zinc-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-[10px] text-xs font-semibold shadow-[0_0_12px_#7c3aed40] cursor-pointer"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Practice Room Simulation Modal */}
      {activeSession && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bento-card max-w-2xl w-full p-6 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center pb-3 border-b border-[#e4e4e7] dark:border-[#222222] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Mock Interview Room: {activeSession.title}
                </h3>
              </div>
              <button onClick={() => setActiveSession(null)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="p-4 bg-zinc-50 dark:bg-[#161616] rounded-[10px] border border-[#e4e4e7] dark:border-[#222222]">
                <p className="font-semibold text-[#7c3aed] dark:text-[#a78bfa] mb-1">
                  Prompt Question from {activeSession.interviewer}:
                </p>
                <p className="italic">
                  "Explain how you would design a rate limiter for an API with millions of daily requests. What data structures would you choose in Redis and how would you prevent race conditions?"
                </p>
              </div>

              <textarea
                placeholder="Type your structured answer (Architecture, Algorithms, Edge cases)..."
                rows={5}
                className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] p-3 text-xs md:text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
              ></textarea>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-[#a1a1aa]">
                  <span className="material-symbols-outlined text-[16px]">mic</span> Audio Enabled
                  <span className="material-symbols-outlined text-[16px] ml-2">videocam</span> Video Enabled
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveSession(null)}
                    className="px-4 py-2 border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] text-xs font-semibold cursor-pointer"
                  >
                    Leave Room
                  </button>
                  <button
                    onClick={() => {
                      showToast('Answer Submitted', 'AI is evaluating your technical articulation...', 'success');
                      setActiveSession(null);
                    }}
                    className="px-4 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-[10px] text-xs font-semibold shadow-[0_0_12px_#7c3aed40] cursor-pointer"
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
