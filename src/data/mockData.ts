import { DSAProblem, AptitudeAttempt, StudentProfile, ActivityItem, CompanyApplication, MockInterviewSession, AptitudeQuestion } from '../types';

export const initialProfile: StudentProfile = {
  fullName: 'Alex Carter',
  collegeId: 'CS2024-089',
  graduationYear: '2024',
  contactEmail: 'alex.carter@university.edu',
  branch: 'Computer Science & Engineering',
  targetTier: 'Product Based',
  cgpa: 8.7,
  technicalSkills: ['Python', 'Java', 'Data Structures', 'React', 'SQL'],
  resumeLink: 'https://portfolio.alexcarter.dev',
  linkedInProfile: 'https://linkedin.com/in/alexcarter-dev',
  githubProfile: 'https://github.com/alexcarter',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcsmArWW-LxdFSX95H20B-0Lg6GEgLjnTWjygnzwOpSPdzbaMaskVkk10NSxTWG4CumwC5ltUJSC2zGPHwqFPNGU896olkQVcjtBRgDfdH4PCnrsR6r8pnirtmtYQK8eBVTUCSZBNlqHO_3vOFcrcmsCrPX3barI58lufyown7DyWTKP6I7goQf1daJwj9L_LyQ_c4WqGMbsx4HXjFqUaC8cTmzaa6B2uhg60mJh90TxiHPMkYFBMl'
};

export const initialDSAProblems: DSAProblem[] = [
  {
    id: 'dsa-1',
    title: 'Two Sum',
    topic: 'Arrays & Hashing',
    difficulty: 'Easy',
    status: 'Solved',
    acceptanceRate: '51.2%',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starterCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`
    },
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
    ]
  },
  {
    id: 'dsa-2',
    title: 'Longest Substring Without Repeating Characters',
    topic: 'Sliding Window',
    difficulty: 'Medium',
    status: 'Unsolved',
    acceptanceRate: '34.8%',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m, n))',
    starterCode: {
      python: `def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    l = 0
    res = 0
    for r in range(len(s)):
        while s[r] in char_set:
            char_set.remove(s[l])
            l += 1
        char_set.add(s[r])
        res = max(res, r - l + 1)
    return res`,
      javascript: `function lengthOfLongestSubstring(s) {
    let set = new Set();
    let l = 0;
    let max = 0;
    for (let r = 0; r < s.length; r++) {
        while (set.has(s[r])) {
            set.delete(s[l]);
            l++;
        }
        set.add(s[r]);
        max = Math.max(max, r - l + 1);
    }
    return max;
}`
    },
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with length 1.' }
    ]
  },
  {
    id: 'dsa-3',
    title: 'Merge K Sorted Lists',
    topic: 'Linked List',
    difficulty: 'Hard',
    status: 'Unsolved',
    acceptanceRate: '48.9%',
    description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.',
    timeComplexity: 'O(N log k)',
    spaceComplexity: 'O(k)',
    starterCode: {
      python: `import heapq

def mergeKLists(lists):
    # Min heap approach
    pass`
    },
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' }
    ]
  },
  {
    id: 'dsa-4',
    title: 'Valid Palindrome',
    topic: 'Two Pointers',
    difficulty: 'Easy',
    status: 'Attempted',
    acceptanceRate: '46.1%',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      python: `def isPalindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True`
    },
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true' },
      { input: 's = "race a car"', output: 'false' }
    ]
  },
  {
    id: 'dsa-5',
    title: 'Best Time to Buy and Sell Stock',
    topic: 'Arrays & Hashing',
    difficulty: 'Easy',
    status: 'Solved',
    acceptanceRate: '54.2%',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. Return the maximum profit you can achieve.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'dsa-6',
    title: 'Valid Parentheses',
    topic: 'Stack',
    difficulty: 'Easy',
    status: 'Solved',
    acceptanceRate: '40.5%',
    description: 'Given a string s containing just characters ()[]{}, determine if input string is valid.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)'
  },
  {
    id: 'dsa-7',
    title: 'Search in Rotated Sorted Array',
    topic: 'Binary Search',
    difficulty: 'Medium',
    status: 'Attempted',
    acceptanceRate: '39.8%',
    description: 'Given rotated sorted array nums with distinct values, search for target index.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'dsa-8',
    title: 'Trapping Rain Water',
    topic: 'Two Pointers',
    difficulty: 'Hard',
    status: 'Unsolved',
    acceptanceRate: '60.3%',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  }
];

export const sampleAptitudeQuestions: AptitudeQuestion[] = [
  {
    id: 'q1',
    category: 'Logical Reasoning',
    question: 'In a certain code language, "ROSE" is written as "6821" and "CHAIR" is written as "73456". What will "SEARCH" be written as in that code?',
    options: ['214673', '214763', '216473', '214637'],
    correctAnswer: 0,
    explanation: 'By direct letter mapping: S=2, E=1, A=4, R=6, C=7, H=3 => 214673.'
  },
  {
    id: 'q2',
    category: 'Logical Reasoning',
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
    options: ['Brother', 'Uncle', 'Father', 'Grandfather'],
    correctAnswer: 2,
    explanation: 'The only son of Suresh’s mother is Suresh himself. Therefore, the boy is Suresh’s son, so Suresh is his father.'
  },
  {
    id: 'q3',
    category: 'Quantitative',
    question: 'A train 125 m long passes a telegraph post in 10 seconds. What is the speed of the train in km/hr?',
    options: ['40 km/hr', '45 km/hr', '50 km/hr', '55 km/hr'],
    correctAnswer: 1,
    explanation: 'Speed = Distance / Time = 125/10 = 12.5 m/s. In km/hr: 12.5 * (18/5) = 45 km/hr.'
  },
  {
    id: 'q4',
    category: 'Quantitative',
    question: 'A person incurs 10% loss by selling a watch for $180. At what price should the watch be sold to earn 10% profit?',
    options: ['$200', '$210', '$220', '$240'],
    correctAnswer: 2,
    explanation: 'Cost Price = 180 / 0.9 = $200. Price for 10% profit = 200 * 1.10 = $220.'
  },
  {
    id: 'q5',
    category: 'Verbal Ability',
    question: 'Choose the word that is most nearly opposite in meaning (Antonym) to "BENEVOLENT":',
    options: ['Compassionate', 'Malevolent', 'Generous', 'Indifferent'],
    correctAnswer: 1,
    explanation: '"Benevolent" means kind and well-meaning. Its direct antonym is "Malevolent" (wishing or appearing to wish evil to others).'
  }
];

export const initialAptitudeAttempts: AptitudeAttempt[] = [
  {
    id: 'apt-1',
    topic: 'Logical Reasoning Set A',
    category: 'Logical Reasoning',
    totalQuestions: 30,
    correctAnswers: 24,
    scorePercentage: 80,
    date: 'Oct 24, 2023',
    time: '10:30 AM',
    durationMinutes: 35,
    questions: [
      {
        id: 'q1',
        category: 'Logical Reasoning',
        question: 'In a certain code language, "ROSE" is written as "6821" and "CHAIR" is written as "73456". What will "SEARCH" be written as in that code?',
        options: ['214673', '214763', '216473', '214637'],
        correctAnswer: 0,
        selectedAnswer: 0,
        isCorrect: true,
        explanation: 'By direct letter mapping: S=2, E=1, A=4, R=6, C=7, H=3 => 214673.'
      },
      {
        id: 'q2',
        category: 'Logical Reasoning',
        question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
        options: ['Brother', 'Uncle', 'Father', 'Grandfather'],
        correctAnswer: 2,
        selectedAnswer: 2,
        isCorrect: true,
        explanation: 'The only son of Suresh’s mother is Suresh himself. Therefore, the boy is Suresh’s son, so Suresh is his father.'
      }
    ]
  },
  {
    id: 'apt-2',
    topic: 'Quantitative Aptitude Basics',
    category: 'Quantitative',
    totalQuestions: 25,
    correctAnswers: 22,
    scorePercentage: 88,
    date: 'Oct 22, 2023',
    time: '02:15 PM',
    durationMinutes: 30,
    questions: [
      {
        id: 'q3',
        category: 'Quantitative',
        question: 'A train 125 m long passes a telegraph post in 10 seconds. What is the speed of the train in km/hr?',
        options: ['40 km/hr', '45 km/hr', '50 km/hr', '55 km/hr'],
        correctAnswer: 1,
        selectedAnswer: 1,
        isCorrect: true,
        explanation: 'Speed = Distance / Time = 125/10 = 12.5 m/s. In km/hr: 12.5 * (18/5) = 45 km/hr.'
      }
    ]
  },
  {
    id: 'apt-3',
    topic: 'Verbal Comprehension',
    category: 'Verbal Ability',
    totalQuestions: 40,
    correctAnswers: 22,
    scorePercentage: 55,
    date: 'Oct 20, 2023',
    time: '09:00 AM',
    durationMinutes: 45,
    questions: [
      {
        id: 'q5',
        category: 'Verbal Ability',
        question: 'Choose the word that is most nearly opposite in meaning to "BENEVOLENT":',
        options: ['Compassionate', 'Malevolent', 'Generous', 'Indifferent'],
        correctAnswer: 1,
        selectedAnswer: 3,
        isCorrect: false,
        explanation: '"Benevolent" means kind and well-meaning. Its antonym is "Malevolent".'
      }
    ]
  }
];

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Solved "Two Sum" in O(n) time',
    topic: 'Arrays',
    timeAgo: '2 hours ago',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000),
    type: 'dsa_solved'
  },
  {
    id: 'act-2',
    title: 'Solved "Valid Palindrome"',
    topic: 'Strings',
    timeAgo: '5 hours ago',
    timestamp: new Date(Date.now() - 5 * 3600 * 1000),
    type: 'dsa_solved'
  },
  {
    id: 'act-3',
    title: 'Completed Aptitude Test #4',
    topic: 'Quantitative',
    timeAgo: '1 day ago',
    timestamp: new Date(Date.now() - 24 * 3600 * 1000),
    type: 'aptitude_completed'
  }
];

export const initialApplications: CompanyApplication[] = [
  {
    id: 'app-1',
    companyName: 'Google',
    logo: 'https://www.google.com/favicon.ico',
    role: 'Software Engineer - Campus 2024',
    stage: 'Technical Round',
    appliedDate: 'Oct 15, 2023',
    oaDate: 'Oct 28, 2023',
    ctc: '$135,000 / ₹42 LPA',
    location: 'Bangalore / Mountain View',
    tier: 'Product Based'
  },
  {
    id: 'app-2',
    companyName: 'Microsoft',
    logo: 'https://www.microsoft.com/favicon.ico',
    role: 'Software Development Engineer',
    stage: 'OA Round',
    appliedDate: 'Oct 18, 2023',
    oaDate: 'Nov 04, 2023',
    ctc: '$125,000 / ₹38 LPA',
    location: 'Hyderabad / Redmond',
    tier: 'Product Based'
  },
  {
    id: 'app-3',
    companyName: 'Amazon',
    logo: 'https://www.amazon.com/favicon.ico',
    role: 'SDE I (Full Time)',
    stage: 'Applied',
    appliedDate: 'Oct 22, 2023',
    ctc: '$120,000 / ₹34 LPA',
    location: 'Seattle / Bangalore',
    tier: 'Product Based'
  },
  {
    id: 'app-4',
    companyName: 'Goldman Sachs',
    logo: 'https://www.goldmansachs.com/favicon.ico',
    role: 'Engineering Analyst',
    stage: 'Selected',
    appliedDate: 'Sep 25, 2023',
    ctc: '$115,000 / ₹32 LPA',
    location: 'New York / Bangalore',
    tier: 'FinTech'
  }
];

export const initialMockInterviews: MockInterviewSession[] = [
  {
    id: 'mock-1',
    title: 'System Design & DSA Peer Interview',
    interviewer: 'Sarah Jenkins (Ex-Meta SDE)',
    role: 'Full Stack Engineer Mock',
    scheduledDate: 'Tomorrow, 4:00 PM',
    status: 'Upcoming'
  },
  {
    id: 'mock-2',
    title: 'Algorithms & Behavioral Simulation',
    interviewer: 'AI Automated Mock Bot',
    role: 'SDE I Placement Drive',
    scheduledDate: 'Completed on Oct 21',
    status: 'Completed',
    score: 88,
    feedback: 'Strong understanding of two-pointer techniques and hash tables. Practice time complexity articulation.'
  }
];

export const initialTopicProgress = [
  { topic: 'Arrays', completed: 45, total: 50, color: '#006c4a' },
  { topic: 'Strings', completed: 30, total: 40, color: '#006c4a' },
  { topic: 'Linked Lists', completed: 15, total: 30, color: '#006c4a' },
  { topic: 'Trees & Graphs', completed: 18, total: 35, color: '#006c4a' },
  { topic: 'Dynamic Programming', completed: 12, total: 30, color: '#006c4a' }
];

export const initialCampusCompanies = [
  {
    id: 'c-1',
    name: 'Google',
    role: 'Software Development Engineer',
    ctc: '₹42 - 50 LPA',
    tier: 'Tier 1 / Product',
    minCgpa: 8.0,
    hiringDate: 'Nov 12, 2024',
    status: 'Open for Registration',
    eligible: true,
    rounds: ['Online Coding Test', 'Technical Interview 1', 'Technical Interview 2', 'Googliness & Leadership']
  },
  {
    id: 'c-2',
    name: 'Microsoft',
    role: 'Software Engineer',
    ctc: '₹38 - 44 LPA',
    tier: 'Tier 1 / Product',
    minCgpa: 7.5,
    hiringDate: 'Nov 18, 2024',
    status: 'Shortlisting',
    eligible: true,
    rounds: ['Online Assessment', 'Technical Round 1', 'System Design Basics', 'AA Round']
  },
  {
    id: 'c-3',
    name: 'Atlassian',
    role: 'Graduate Software Developer',
    ctc: '₹55 LPA (CTC + Stocks)',
    tier: 'Tier 1 / Product',
    minCgpa: 8.5,
    hiringDate: 'Dec 02, 2024',
    status: 'Upcoming',
    eligible: true,
    rounds: ['Coding Challenge', 'Pair Programming', 'Values & Craft Round']
  },
  {
    id: 'c-4',
    name: 'Adobe',
    role: 'Member of Technical Staff',
    ctc: '₹35 LPA',
    tier: 'Tier 1 / Product',
    minCgpa: 7.8,
    hiringDate: 'Dec 10, 2024',
    status: 'Upcoming',
    eligible: true,
    rounds: ['OA (DSA & Aptitude)', 'Technical 1', 'Technical 2', 'Director Round']
  }
];

export const initialResources = [
  {
    title: 'Striver SDE Sheet - Top 191 Problems',
    category: 'DSA & Coding',
    author: 'Take U Forward',
    link: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
    tag: 'Must Do'
  },
  {
    title: 'Campus Aptitude Formula Cheatsheet (Quant & Logical)',
    category: 'Aptitude Prep',
    author: 'Placement Cell Hub',
    link: '#',
    tag: 'PDF'
  },
  {
    title: 'System Design for College Grads (HLD & LLD Basics)',
    category: 'Core Engineering',
    author: 'Alex Carter Notes',
    link: '#',
    tag: 'Guide'
  },
  {
    title: 'Top 50 Behavioral Interview Questions (STAR Method)',
    category: 'HR & Behavioral',
    author: 'Career Advisory',
    link: '#',
    tag: 'Interactive'
  }
];
