/**
 * Legacy data exports kept only to avoid breaking old imports.
 * The production UI must not render fabricated user, course, path, or history data.
 */
export const userData = null;
export const dashboardData = null;
export const coursesData: unknown[] = [];
export const learningPathsData: unknown[] = [];
export const examHistoryData: unknown[] = [];
export const settingsData = null;
export const statisticsSummary = null;
export const questionTypesFrequency: Record<string, never> = {};
export const dailyPractice: unknown[] = [];
export const recommendedLessons: unknown[] = [];

const dataBundle = {
  user: userData,
  dashboard: dashboardData,
  courses: coursesData,
  learningPaths: learningPathsData,
  examHistory: examHistoryData,
  settings: settingsData,
  statistics: statisticsSummary,
  questionTypes: questionTypesFrequency,
  dailyPractice,
  recommendations: recommendedLessons,
};

export default dataBundle;
