export type OptionMap = Record<string, string>;

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
  passageTitle?: string;
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
  tags?: string[];
  sections: ExamSection[];
  createdAt?: string;
  updatedAt?: string;
  originalFileName?: string;
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
  source?: string;
  tags?: string[];
  file?: string;
  createdAt?: string;
  updatedAt?: string;
  storage?: 'static' | 'admin-local';
}

export interface ExamResultDetail {
  questionId: string;
  questionNumber: number;
  sectionType: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

export interface ExamAttemptResult {
  id: string;
  examId: string;
  examTitle: string;
  category: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  totalQuestions: number;
  durationSeconds: number;
  startedAt: string;
  submittedAt: string;
  answers: Record<string, string>;
  details: ExamResultDetail[];
}

export const normalizeOptions = (options: unknown): OptionMap => {
  if (!options) return {};

  if (Array.isArray(options)) {
    return options.reduce<OptionMap>((acc, item, index) => {
      const key = String.fromCharCode(65 + index);
      acc[key] = String(item ?? '').replace(/^[A-D][.)]\s*/i, '').trim();
      return acc;
    }, {});
  }

  if (typeof options === 'object') {
    return Object.entries(options as Record<string, unknown>).reduce<OptionMap>((acc, [key, value]) => {
      acc[String(key).trim().toUpperCase()] = String(value ?? '').trim();
      return acc;
    }, {});
  }

  return {};
};

const parseTimeLimit = (raw: unknown): number => {
  if (typeof raw === 'number') return raw > 100 ? Math.round(raw) : Math.round(raw * 60);
  const match = String(raw ?? '').match(/\d+/);
  return match ? Number(match[0]) * 60 : 3600;
};

export const getTotalQuestions = (exam: Pick<Exam, 'sections'>): number =>
  exam.sections.reduce((sum, section) => sum + (section.questions?.length || 0), 0);

const questionTypeLabelMap: Record<string, string> = {
  reading_fill_in_the_blanks: 'Reading fill in blanks',
  sentence_arrangement: 'Sentence arrangement',
  reading_comprehension: 'Reading comprehension',
  multiple_choice: 'Multiple choice',
};

export const getQuestionTypeLabel = (type: string): string => {
  const normalized = String(type || 'multiple_choice').trim();
  return questionTypeLabelMap[normalized] || normalized.replace(/_/g, ' ');
};

export const normalizeExam = (raw: any): Exam => {
  const now = new Date().toISOString();
  const answerKey: Record<string, string> = Object.entries(raw?.answerKey || {}).reduce<Record<string, string>>(
    (acc, [number, answer]) => {
      acc[String(number)] = String(answer ?? '').trim().toUpperCase();
      return acc;
    },
    {},
  );

  const rawSections = Array.isArray(raw?.sections)
    ? raw.sections
    : Array.isArray(raw?.parts)
      ? raw.parts
      : Array.isArray(raw?.questions)
        ? [{ sectionType: 'multiple_choice', instruction: 'Chọn đáp án đúng nhất.', questions: raw.questions }]
        : [];

  let runningQuestionNumber = 0;
  const sections: ExamSection[] = rawSections.map((section: any, sectionIndex: number) => {
    const questions = Array.isArray(section?.questions) ? section.questions : [];

    return {
      sectionType: String(section?.sectionType || section?.type || section?.title || `part_${sectionIndex + 1}`),
      instruction: section?.instruction || '',
      passageTitle: section?.passageTitle || '',
      passage: section?.passage || '',
      questions: questions.map((question: any, questionIndex: number) => {
        runningQuestionNumber += 1;
        const questionNumber = Number(question?.questionNumber || question?.number || runningQuestionNumber || questionIndex + 1);
        const correctAnswer = String(
          question?.correctAnswer || question?.answer || answerKey[String(questionNumber)] || '',
        )
          .trim()
          .toUpperCase();

        return {
          id: String(question?.id || `q${questionNumber}`),
          questionNumber,
          questionText: question?.questionText || question?.text || question?.question || '',
          context: question?.context || '',
          options: normalizeOptions(question?.options),
          correctAnswer,
          explanation: question?.explanation || question?.explain || '',
        };
      }),
    };
  });

  return {
    examId: String(raw?.examId || raw?.id || `exam-${Date.now()}`),
    title: String(raw?.title || raw?.name || 'Đề thi'),
    category: String(raw?.category || 'Tiếng Anh'),
    source: raw?.source || 'Englic.',
    description: raw?.description || '',
    timeLimit: parseTimeLimit(raw?.timeLimit || raw?.time || raw?.duration),
    tags: Array.isArray(raw?.tags) ? raw.tags.map(String) : [],
    sections,
    createdAt: raw?.createdAt || now,
    updatedAt: raw?.updatedAt || now,
    originalFileName: raw?.originalFileName,
  };
};

export const toExamSummary = (exam: Exam, storage: ExamSummary['storage'] = 'static'): ExamSummary => ({
  id: exam.examId,
  title: exam.title,
  category: exam.category || 'Tiếng Anh',
  time: `${Math.round((exam.timeLimit || 3600) / 60)} Phút`,
  questions: getTotalQuestions(exam),
  attempts: 0,
  rating: 5,
  reviews: 0,
  source: exam.source,
  tags: exam.tags || [],
  createdAt: exam.createdAt,
  updatedAt: exam.updatedAt,
  storage,
});

export const calculateExamResult = (
  exam: Exam,
  answers: Record<string, string>,
  startedAt: string,
  submittedAt = new Date().toISOString(),
): ExamAttemptResult => {
  const details: ExamResultDetail[] = [];

  exam.sections.forEach((section) => {
    section.questions.forEach((question) => {
      const userAnswer = answers[question.id] || '';
      const correctAnswer = String(question.correctAnswer || '').trim().toUpperCase();
      const isCorrect = Boolean(userAnswer && correctAnswer && userAnswer === correctAnswer);

      details.push({
        questionId: question.id,
        questionNumber: question.questionNumber,
        sectionType: section.sectionType,
        userAnswer,
        correctAnswer,
        isCorrect,
        explanation: question.explanation || (correctAnswer ? `Đáp án đúng là ${correctAnswer}.` : 'Đề này chưa có đáp án trong JSON.'),
      });
    });
  });

  const totalQuestions = details.length;
  const correctCount = details.filter((item) => item.isCorrect).length;
  const unansweredCount = details.filter((item) => !item.userAnswer).length;
  const wrongCount = totalQuestions - correctCount - unansweredCount;
  const score = totalQuestions ? Number(((correctCount / totalQuestions) * 10).toFixed(2)) : 0;
  const durationSeconds = Math.max(
    0,
    Math.round((new Date(submittedAt).getTime() - new Date(startedAt).getTime()) / 1000),
  );

  return {
    id: `${exam.examId}-${Date.now()}`,
    examId: exam.examId,
    examTitle: exam.title,
    category: exam.category,
    score,
    correctCount,
    wrongCount,
    unansweredCount,
    totalQuestions,
    durationSeconds,
    startedAt,
    submittedAt,
    answers,
    details,
  };
};

export const formatDateTimeVi = (iso?: string): string => {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDuration = (seconds: number): string => {
  const minute = Math.floor(seconds / 60);
  const second = seconds % 60;
  if (minute <= 0) return `${second}s`;
  return `${minute} phút ${second.toString().padStart(2, '0')}s`;
};

export const buildDashboardStats = (results: ExamAttemptResult[]) => {
  const sorted = [...results].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  const totalExams = sorted.length;
  const averageScore = totalExams
    ? Number((sorted.reduce((sum, item) => sum + item.score, 0) / totalExams).toFixed(2))
    : 0;
  const bestScore = totalExams ? Math.max(...sorted.map((item) => item.score)) : 0;
  const totalQuestions = sorted.reduce((sum, item) => sum + item.totalQuestions, 0);
  const totalCorrect = sorted.reduce((sum, item) => sum + item.correctCount, 0);
  const totalWrong = sorted.reduce((sum, item) => sum + item.wrongCount + item.unansweredCount, 0);

  const mistakesByTypeMap = new Map<string, { type: string; mistakes: number; total: number; errorRate: number }>();
  sorted.forEach((result) => {
    result.details.forEach((detail) => {
      const type = getQuestionTypeLabel(detail.sectionType);
      const current = mistakesByTypeMap.get(type) || { type, mistakes: 0, total: 0, errorRate: 0 };
      current.total += 1;
      if (!detail.isCorrect) current.mistakes += 1;
      current.errorRate = current.total ? Number(((current.mistakes / current.total) * 100).toFixed(1)) : 0;
      mistakesByTypeMap.set(type, current);
    });
  });

  const mistakesByType = Array.from(mistakesByTypeMap.values()).sort((a, b) => b.errorRate - a.errorRate);

  return {
    totalExams,
    averageScore,
    bestScore,
    totalQuestions,
    totalCorrect,
    totalWrong,
    recentExams: sorted.slice(0, 7),
    mistakesByType,
  };
};
