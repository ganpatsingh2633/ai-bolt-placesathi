import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  TabType, 
  DSAProblem, 
  AptitudeAttempt, 
  StudentProfile, 
  ActivityItem, 
  CompanyApplication, 
  MockInterviewSession,
  DifficultyLevel,
  ProblemStatus
} from '../types';
import { 
  initialProfile, 
  initialDSAProblems, 
  initialAptitudeAttempts, 
  initialActivities, 
  initialApplications, 
  initialMockInterviews,
  initialTopicProgress
} from '../data/mockData';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Navigation & theme
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Profile
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;

  // DSA State
  problems: DSAProblem[];
  toggleProblemStatus: (id: string, newStatus: ProblemStatus) => void;
  addProblemSolve: (problem: Partial<DSAProblem>) => void;
  selectedProblemForSolve: DSAProblem | null;
  openSolveProblemModal: (problem: DSAProblem) => void;
  closeSolveProblemModal: () => void;

  // Aptitude State
  aptitudeAttempts: AptitudeAttempt[];
  addAptitudeAttempt: (attempt: Omit<AptitudeAttempt, 'id'>) => void;
  selectedAttemptForReview: AptitudeAttempt | null;
  openAptitudeReviewModal: (attempt: AptitudeAttempt) => void;
  closeAptitudeReviewModal: () => void;
  isAptitudeQuizOpen: boolean;
  openAptitudeQuiz: () => void;
  closeAptitudeQuiz: () => void;

  // Modals & Popups
  isLogSolveOpen: boolean;
  setIsLogSolveOpen: (open: boolean) => void;
  isCheckStatusOpen: boolean;
  setIsCheckStatusOpen: (open: boolean) => void;
  isResourcesOpen: boolean;
  setIsResourcesOpen: (open: boolean) => void;
  isScheduleOpen: boolean;
  setIsScheduleOpen: (open: boolean) => void;
  isCompaniesOpen: boolean;
  setIsCompaniesOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isInterviewSchedulerOpen: boolean;
  setIsInterviewSchedulerOpen: (open: boolean) => void;

  // Other records
  activities: ActivityItem[];
  addActivity: (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => void;
  applications: CompanyApplication[];
  mockInterviews: MockInterviewSession[];
  topicProgress: typeof initialTopicProgress;

  // Toasts
  toasts: Toast[];
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('placement_portal_theme') === 'dark';
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Domain states
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('placement_portal_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [problems, setProblems] = useState<DSAProblem[]>(() => {
    const saved = localStorage.getItem('placement_portal_problems');
    return saved ? JSON.parse(saved) : initialDSAProblems;
  });

  const [aptitudeAttempts, setAptitudeAttempts] = useState<AptitudeAttempt[]>(() => {
    const saved = localStorage.getItem('placement_portal_aptitude');
    return saved ? JSON.parse(saved) : initialAptitudeAttempts;
  });

  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [applications, setApplications] = useState<CompanyApplication[]>(initialApplications);
  const [mockInterviews, setMockInterviews] = useState<MockInterviewSession[]>(initialMockInterviews);
  const [topicProgress, setTopicProgress] = useState(initialTopicProgress);

  // Modals
  const [selectedProblemForSolve, setSelectedProblemForSolve] = useState<DSAProblem | null>(null);
  const [selectedAttemptForReview, setSelectedAttemptForReview] = useState<AptitudeAttempt | null>(null);
  const [isAptitudeQuizOpen, setIsAptitudeQuizOpen] = useState(false);
  const [isLogSolveOpen, setIsLogSolveOpen] = useState(false);
  const [isCheckStatusOpen, setIsCheckStatusOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isCompaniesOpen, setIsCompaniesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isInterviewSchedulerOpen, setIsInterviewSchedulerOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('placement_portal_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('placement_portal_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    showToast(isDarkMode ? 'Switched to Light Mode' : 'Switched to Dark Mode', undefined, 'info');
  };

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem('placement_portal_profile', JSON.stringify(profile));
  }, [profile]);

  // Save problems to localStorage
  useEffect(() => {
    localStorage.setItem('placement_portal_problems', JSON.stringify(problems));
  }, [problems]);

  // Save aptitude attempts to localStorage
  useEffect(() => {
    localStorage.setItem('placement_portal_aptitude', JSON.stringify(aptitudeAttempts));
  }, [aptitudeAttempts]);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    showToast('Profile Updated Successfully', 'Your placement profile has been saved.', 'success');
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (profile.technicalSkills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      showToast('Skill already added', `${trimmed} is already in your skills list.`, 'info');
      return;
    }
    setProfile(prev => ({
      ...prev,
      technicalSkills: [...prev.technicalSkills, trimmed]
    }));
    showToast('Skill Added', `Added ${trimmed} to technical skills.`, 'success');
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter(s => s !== skillToRemove)
    }));
  };

  const addActivity = (act: Omit<ActivityItem, 'id' | 'timestamp'>) => {
    const newAct: ActivityItem = {
      ...act,
      id: 'act-' + Date.now(),
      timestamp: new Date()
    };
    setActivities(prev => [newAct, ...prev]);
  };

  const toggleProblemStatus = (id: string, newStatus: ProblemStatus) => {
    setProblems(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: newStatus, solvedAt: newStatus === 'Solved' ? 'Just now' : undefined };
      }
      return p;
    }));

    const problem = problems.find(p => p.id === id);
    if (problem && newStatus === 'Solved') {
      addActivity({
        title: `Solved "${problem.title}"`,
        topic: problem.topic,
        timeAgo: 'Just now',
        type: 'dsa_solved'
      });
      showToast('Problem Solved!', `Marked "${problem.title}" as Solved. Great job!`, 'success');
    }
  };

  const addProblemSolve = (newProb: Partial<DSAProblem>) => {
    const prob: DSAProblem = {
      id: 'dsa-' + Date.now(),
      title: newProb.title || 'Untitled Problem',
      topic: newProb.topic || 'Arrays & Hashing',
      difficulty: (newProb.difficulty as DifficultyLevel) || 'Medium',
      status: (newProb.status as ProblemStatus) || 'Solved',
      acceptanceRate: newProb.acceptanceRate || '50.0%',
      description: newProb.description || 'Custom logged practice problem.',
      timeComplexity: newProb.timeComplexity || 'O(n)',
      spaceComplexity: newProb.spaceComplexity || 'O(1)',
      solvedAt: 'Just now'
    };

    setProblems(prev => [prob, ...prev]);
    addActivity({
      title: `Solved "${prob.title}" in ${prob.timeComplexity}`,
      topic: prob.topic,
      timeAgo: 'Just now',
      type: 'dsa_solved'
    });
    showToast('Solve Logged', `Added "${prob.title}" to DSA Practice tracker.`, 'success');
  };

  const addAptitudeAttempt = (attemptData: Omit<AptitudeAttempt, 'id'>) => {
    const newAttempt: AptitudeAttempt = {
      ...attemptData,
      id: 'apt-' + Date.now()
    };
    setAptitudeAttempts(prev => [newAttempt, ...prev]);
    addActivity({
      title: `Completed ${newAttempt.topic} (${newAttempt.scorePercentage}%)`,
      topic: newAttempt.category,
      timeAgo: 'Just now',
      type: 'aptitude_completed'
    });
    showToast('Test Completed', `Scored ${newAttempt.correctAnswers}/${newAttempt.totalQuestions} (${newAttempt.scorePercentage}%)`, 'success');
  };

  const openSolveProblemModal = (problem: DSAProblem) => {
    setSelectedProblemForSolve(problem);
  };

  const closeSolveProblemModal = () => {
    setSelectedProblemForSolve(null);
  };

  const openAptitudeReviewModal = (attempt: AptitudeAttempt) => {
    setSelectedAttemptForReview(attempt);
  };

  const closeAptitudeReviewModal = () => {
    setSelectedAttemptForReview(null);
  };

  const openAptitudeQuiz = () => {
    setIsAptitudeQuizOpen(true);
  };

  const closeAptitudeQuiz = () => {
    setIsAptitudeQuizOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isDarkMode,
        toggleDarkMode,
        searchQuery,
        setSearchQuery,
        profile,
        updateProfile,
        addSkill,
        removeSkill,
        problems,
        toggleProblemStatus,
        addProblemSolve,
        selectedProblemForSolve,
        openSolveProblemModal,
        closeSolveProblemModal,
        aptitudeAttempts,
        addAptitudeAttempt,
        selectedAttemptForReview,
        openAptitudeReviewModal,
        closeAptitudeReviewModal,
        isAptitudeQuizOpen,
        openAptitudeQuiz,
        closeAptitudeQuiz,
        isLogSolveOpen,
        setIsLogSolveOpen,
        isCheckStatusOpen,
        setIsCheckStatusOpen,
        isResourcesOpen,
        setIsResourcesOpen,
        isScheduleOpen,
        setIsScheduleOpen,
        isCompaniesOpen,
        setIsCompaniesOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isInterviewSchedulerOpen,
        setIsInterviewSchedulerOpen,
        activities,
        addActivity,
        applications,
        mockInterviews,
        topicProgress,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
