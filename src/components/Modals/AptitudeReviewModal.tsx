import React from 'react';
import { useApp } from '../../context/AppContext';

export const AptitudeReviewModal: React.FC = () => {
  const { selectedAttemptForReview, closeAptitudeReviewModal } = useApp();

  if (!selectedAttemptForReview) return null;

  const attempt = selectedAttemptForReview;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div className="bento-card max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp p-0">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e4e4e7] dark:border-[#222222] flex justify-between items-center bg-zinc-50 dark:bg-[#161616]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Attempt Review: {attempt.topic}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#10b98120] text-[#10b981] border border-[#10b98140]">
                {attempt.scorePercentage}% Score
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-[#a1a1aa] mt-0.5">
              Taken on {attempt.date} at {attempt.time} • {attempt.correctAnswers}/{attempt.totalQuestions} Correct
            </p>
          </div>

          <button
            onClick={closeAptitudeReviewModal}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Question Review List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {attempt.questions?.map((q, idx) => {
            const isCorrect = q.userAnswer === q.correctAnswer;
            return (
              <div
                key={q.id}
                className="p-5 rounded-[16px] border border-[#e4e4e7] dark:border-[#222222] bg-zinc-50 dark:bg-[#161616] space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-zinc-500">
                    <span>Q{idx + 1}.</span>
                    <span>{q.category}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    isCorrect
                      ? 'bg-[#10b98120] text-[#10b981] border border-[#10b98130]'
                      : 'bg-red-500/20 text-red-500 border border-red-500/30'
                  }`}>
                    {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                  </span>
                </div>

                <p className="font-semibold text-sm md:text-base text-zinc-900 dark:text-gray-100">
                  {q.question}
                </p>

                {/* Options display */}
                <div className="space-y-1.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isUserPick = q.userAnswer === optIdx;
                    const isCorrectOpt = q.correctAnswer === optIdx;

                    let badgeStyle = 'border-[#e4e4e7] dark:border-[#262626] bg-white dark:bg-[#1f1f1f] text-zinc-700 dark:text-zinc-300';
                    if (isCorrectOpt) {
                      badgeStyle = 'border-[#10b981] bg-[#10b98115] text-[#10b981] font-bold';
                    } else if (isUserPick && !isCorrectOpt) {
                      badgeStyle = 'border-red-500/50 bg-red-500/10 text-red-500 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-[8px] border text-xs flex items-center justify-between ${badgeStyle}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </div>
                        {isCorrectOpt && (
                          <span className="text-[11px] font-bold text-[#10b981] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">check</span> Correct Answer
                          </span>
                        )}
                        {isUserPick && !isCorrectOpt && (
                          <span className="text-[11px] font-bold text-red-500">
                            Your Selection
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="pt-2 border-t border-[#e4e4e7] dark:border-[#222222] text-xs text-zinc-600 dark:text-zinc-300 bg-white dark:bg-[#121212] p-3 rounded-[10px] border border-[#e4e4e7] dark:border-[#222222]">
                    <strong className="text-[#7c3aed] dark:text-[#a78bfa] block mb-1">Detailed Solution:</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#e4e4e7] dark:border-[#222222] flex justify-end bg-zinc-50 dark:bg-[#161616]">
          <button
            onClick={closeAptitudeReviewModal}
            className="px-5 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-semibold rounded-[8px] transition-all shadow-[0_0_12px_#7c3aed40] cursor-pointer"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};
