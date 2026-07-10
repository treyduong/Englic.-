export type OptionMap = Record<'A' | 'B' | 'C' | 'D' | string, string>;

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  questionText?: string;
  context?: string;
  options: OptionMap;
  correctAnswer?: string;
  explanation?: string;
}

export interface ExamSection {
  sectionType: string;
  instruction?: string;
  passage?: string;
  questions: ExamQuestion[];
}

export interface Exam {
  examId: string;
  title: string;
  category: string;
  source?: string;
  description?: string;
  timeLimit: number;
  sections: ExamSection[];
  createdAt: string;
  updatedAt: string;
}

export interface ExamSummary {
  id: string;
  title: string;
  category: string;
  time: string;
  questions: number;
  attempts: number;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}
