export type Grade = "1st Secondary" | "2nd Secondary" | "3rd Secondary";
export type Section = "Scientific Science" | "Scientific Math" | "Literary";

export interface UserProfile {
  uid: string;
  name: string;
  username: string;
  bio?: string;
  grade: Grade;
  section?: Section;
  school?: string;
  governorate?: string;
  photoURL?: string;
  xp: number;
  streak: number;
  coins: number;
  accuracy: number;
  totalExams: number;
  rank?: number;
  badges: string[];
  followersCount: number;
  followingCount: number;
  isPublic: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chaptersCount?: number;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  duration: number; // minutes
  type: "Mock" | "Subjective" | "Competitive" | "AI-Generated";
  difficulty: "Easy" | "Medium" | "Hard";
  questionsCount: number;
  xpReward: number;
  coinReward: number;
  subjectName?: string;
}

export interface Question {
  id: string;
  text: string;
  type: "MCQ" | "TF" | "Multi-Select";
  options: string[];
  correctAnswer: string;
  explanation?: string;
  imageURL?: string;
}

export interface Submission {
  id: string;
  userId: string;
  examId: string;
  score: number;
  percentage: number;
  timeTaken: number; // seconds
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  answers: Record<string, string>;
  createdAt: any;
  examTitle?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "exam" | "rank" | "achievement" | "system";
  read: boolean;
  createdAt: any;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: any;
}
