export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  collegeId?: string;
  profileImage?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export enum UserRole {
  STUDENT = 'student',
  LECTURER = 'lecturer',
  COLLEGE_ADMIN = 'college_admin',
  APP_ADMIN = 'app_admin'
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: Date;
}

export interface College {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  isActive: boolean;
  adminId: string;
  createdAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  collegeId: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Chapter {
  id: string;
  name: string;
  subjectId: string;
  order: number;
  description: string;
  isActive: boolean;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  chapterId?: string;
  type: ExamType;
  totalMarks: number;
  duration: number; // in minutes
  questions: Question[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  scheduledAt?: Date;
}

export enum ExamType {
  PRACTICE = 'practice',
  ASSIGNMENT = 'assignment',
  TEST = 'test',
  FINAL = 'final'
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
  marks: number;
  explanation?: string;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer',
  ESSAY = 'essay'
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  answers: StudentAnswer[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  submittedAt: Date;
  evaluatedAt?: Date;
  feedback?: string;
}

export interface StudentAnswer {
  questionId: string;
  answer: string;
  isCorrect?: boolean;
  marksObtained?: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
  location?: string;
  isVirtual: boolean;
  virtualLink?: string;
  createdBy: string;
  attendees: string[];
  maxAttendees?: number;
  isActive: boolean;
  likes?: number;
  comments?: number;
}

export enum EventType {
  WEBINAR = 'webinar',
  WORKSHOP = 'workshop',
  SEMINAR = 'seminar',
  CONFERENCE = 'conference',
  EXAM = 'exam',
  ASSIGNMENT = 'assignment'
}

export interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: { [key: string]: number };
  totalVotes: number;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  expiresAt?: Date;
  likes?: number;
  comments?: number;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  summary: string;
  authorId: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  collegeId: string;
  plan: SubscriptionPlan;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  features: string[];
  maxStudents: number;
  maxLecturers: number;
}

export enum SubscriptionPlan {
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise'
}

export interface AIModel {
  id: string;
  name: string;
  type: string;
  version: string;
  accuracy: number;
  isActive: boolean;
  trainingData: string;
  lastTrainedAt: Date;
}