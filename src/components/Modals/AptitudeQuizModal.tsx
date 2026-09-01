import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AptitudeQuestion } from '../../types';

export const AptitudeQuizModal: React.FC = () => {
  const { isAptitudeQuizOpen, closeAptitudeQuiz, activeQuizQuestions, recordAptitudeAttempt, showToast } = useApp();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isFinished, setIsFinished] = useState(false);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number; percentage: number } | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!isAptitudeQuizOpen || isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isAptitudeQuizOpen, isFinished]);

  if (!isAptitudeQuizOpen) return null;

  const currentQ = activeQuizQuestions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optIdx
    }));
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    const answeredList: AptitudeQuestion[] = activeQuizQuestions.map(q => {
      const userAns = selectedAnswers[q.id];
      if (userAns === q.correctAnswer) {
        correct++;
      }
      return {
        ...q,
        userAnswer: userAns
      };
    });

    const total = activeQuizQuestions.length;
    const percentage = Math.round((correct / total) * 100);

    setQuizScore({ correct, total, percentage });
    setIsFinished(true);

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    recordAptitudeAttempt({
      topic: `${currentQ?.category || 'Aptitude'} Practice Set`,
      category: currentQ?.category || 'Logical Reasoning',
      date: dateStr,
      time: timeStr,
      scorePercentage: percentage,
      totalQuestions: total,
      correctAnswers: correct,
      questions: answeredList
    });

    showToast('Test Completed!', `You scored ${percentage}% (${correct}/${total} correct). Recorded in history.`, 'success');
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div className="bento-card max-w-3xl w-full flex flex-col shadow-2xl overflow-hidden max-h-[90vh] animate-scaleUp p-0">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e4e4e7] dark:border-[#222222] flex justify-between items-center bg-zinc-50 dark:bg-[#161616]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#7c3aed] dark:text-[#a78bfa]">psychology</span>
            <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white">
              Aptitude Practice Set
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#7c3aed20] text-[#7c3aed] dark:text-[#a78bfa] border border-[#7c3aed30] font-semibold">
              {currentQ?.category || 'General'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {!isFinished && (
              <div className="flex items-center gap-1.5 font-mono font-bold text-xs md:text-sm text-zinc-900 dark:text-gray-200 bg-white dark:bg-[#222222] px-3 py-1.5 rounded-[8px] border border-[#e4e4e7] dark:border-[#333333]">
                <span className="material-symbols-outlined text-[16px] text-amber-500">timer</span>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>
            )}
            <button
              onClick={closeAptitudeQuiz}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {!isFinished ? (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Question Counter Bar */}
            <div className="flex items-center justify-between text-xs text-zinc-500 pb-2 border-b border-[#e4e4e7] dark:border-[#222222]">
              <span>Question {currentIdx + 1} of {activeQuizQuestions.length}</span>
              <span>Answered: {Object.keys(selectedAnswers).length}/{activeQuizQuestions.length}</span>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <h4 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-gray-100 leading-relaxed">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQ.id] === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-3.5 rounded-[12px] border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#7c3aed] bg-[#7c3aed15] dark:bg-[#7c3aed25] text-zinc-900 dark:text-white shadow-[0_0_10px_#7c3aed20] font-semibold'
                          : 'border-[#e4e4e7] dark:border-[#222222] bg-zinc-50 dark:bg-[#161616] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#1c1c1c]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-[#7c3aed] text-white' : 'bg-zinc-200 dark:bg-[#27272a] text-zinc-500'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs md:text-sm">{opt}</span>
                      </div>

                      <span className={`material-symbols-outlined text-[20px] ${
                        isSelected ? 'text-[#7c3aed] dark:text-[#a78bfa]' : 'text-zinc-400'
                      }`}>
                        {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-[#e4e4e7] dark:border-[#222222]">
              <button
                onClick={() => setCurrentIdx(prev => Math.max(prev - 1, 0))}
                disabled={currentIdx === 0}
                className="px-4 py-2 border border-[#e4e4e7] dark:border-[#222222] rounded-[8px] text-xs font-semibold disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>

              <div className="flex gap-1.5">
                {activeQuizQuestions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`w-7 h-7 rounded-[6px] text-xs font-semibold transition-all cursor-pointer ${
                      currentIdx === i
                        ? 'bg-[#7c3aed] text-white shadow-[0_0_8px_#7c3aed50]'
                        : selectedAnswers[activeQuizQuestions[i].id] !== undefined
                        ? 'bg-[#10b98120] text-[#10b981] border border-[#10b98140]'
                        : 'bg-zinc-100 dark:bg-[#1f1f1f] text-zinc-400'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {currentIdx === activeQuizQuestions.length - 1 ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-[8px] text-xs font-bold shadow-[0_0_12px_#10b98140] cursor-pointer active:scale-95"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIdx(prev => Math.min(prev + 1, activeQuizQuestions.length - 1))}
                  className="px-5 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-[8px] text-xs font-semibold shadow-[0_0_12px_#7c3aed40] cursor-pointer"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="p-8 text-center space-y-6 flex-1 overflow-y-auto">
            <div className="w-20 h-20 rounded-full bg-[#10b98120] text-[#10b981] border border-[#10b98140] flex items-center justify-center mx-auto shadow-[0_0_20px_#10b98130]">
              <span className="material-symbols-outlined text-[44px]">verified</span>
            </div>

            <div>
              <h4 className="text-2xl font-black text-zinc-900 dark:text-white">
                Test Completed!
              </h4>
              <p className="text-sm text-zinc-500 dark:text-[#a1a1aa] mt-1">
                Your performance has been benchmarked for placement readiness.
              </p>
            </div>

            <div className="max-w-xs mx-auto bg-zinc-50 dark:bg-[#161616] border border-[#e4e4e7] dark:border-[#222222] p-5 rounded-[16px]">
              <div className="text-3xl font-black text-[#7c3aed] dark:text-[#a78bfa]">
                {quizScore?.percentage}%
              </div>
              <p className="text-xs text-zinc-500 dark:text-[#a1a1aa] mt-1">
                {quizScore?.correct} out of {quizScore?.total} Correct
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={closeAptitudeQuiz}
                className="px-6 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-xs md:text-sm rounded-[8px] shadow-[0_0_15px_#7c3aed40] cursor-pointer"
              >
                Close &amp; View Progress
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
