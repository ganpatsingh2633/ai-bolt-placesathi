export type TabType = 
  | 'dashboard' 
  | 'dsa' 
  | 'aptitude' 
  | 'interviews' 
  | 'applications' 
  | 'settings' 
  | 'support';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type ProblemStatus = 'Solved' | 'Attempted' | 'Unsolved';

export interface DSAProblem {
  id: string;
  title: string;
  topic: string;
  difficulty: DifficultyLevel;
  status: ProblemStatus;
  acceptanceRate?: string;
  description?: string;
  starterCode?: {
    python?: string;
    java?: string;
    cpp?: string;
    javascript?: string;
  };
  examples?: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  timeComplexity?: string;
  spaceComplexity?: string;
  solvedAt?: string;
  notes?: string;
}

export interface AptitudeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'Logical Reasoning' | 'Quantitative' | 'Verbal Ability';
}

export interface AptitudeAttempt {
  id: string;
  topic: string;
  category: 'Logical Reasoning' | 'Quantitative' | 'Verbal Ability';
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  date: string;
  time: string;
  durationMinutes?: number;
  questions?: Array<AptitudeQuestion & { selectedAnswer?: number; isCorrect?: boolean }>;
}

export interface StudentProfile {
  fullName: string;
  collegeId: string;
  graduationYear: string;
  contactEmail: string;
  branch: string;
  targetTier: string;
  cgpa: number;
  technicalSkills: string[];
  resumeLink: string;
  linkedInProfile: string;
  githubProfile?: string;
  avatarUrl: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  topic: string;
  timeAgo: string;
  timestamp: Date;
  type: 'dsa_solved' | 'aptitude_completed' | 'interview_scheduled' | 'application_updated';
}

export interface CompanyApplication {
  id: string;
  companyName: string;
  logo: string;
  role: string;
  stage: 'Applied' | 'OA Round' | 'Technical Round' | 'HR Round' | 'Selected' | 'Rejected';
  appliedDate: string;
  oaDate?: string;
  ctc: string;
  location: string;
  tier: 'Product Based' | 'Service Based' | 'FinTech' | 'Startup';
}

export interface MockInterviewSession {
  id: string;
  title: string;
  interviewer: string;
  role: string;
  scheduledDate: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  score?: number;
  feedback?: string;
}
